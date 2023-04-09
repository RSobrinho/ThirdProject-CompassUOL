import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
import { GetUserUseCase } from './getUserUseCase'
import { GetUserController } from './getUserController'
import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { createUserDTO } from '../createUser/createUserDTO'
import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'
import { format } from 'date-fns'
import { extraFeatures } from '../../../utils/ExtraFeatures'
describe('GetUserFeature', () => {
  const randomDate = faker.date.between(((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 100)), ((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 3)))

  const formattedRandomDate = format(randomDate, 'yyyy-MM-dd')

  const validPropsCreator = (_id = v4()): IUserEntityProps => {
    return {
      _id,
      name: faker.name.fullName(),
      cpf: extraFeatures.generateCPF() || '077.998.461-78',
      birth: formattedRandomDate || '03/07/2004',
      email: faker.internet.email(),
      password: faker.internet.password(6),
      cep: faker.random.numeric(8),
      qualified: faker.helpers.arrayElement(['yes', 'no']),
      patio: faker.address.street(),
      complement: faker.address.secondaryAddress(),
      neighborhood: faker.address.street(),
      locality: faker.address.city(),
      uf: extraFeatures.generateBrasilianState() || 'MS'
    }
  }

  const validIds: string[] = [v4(), v4(), v4()]

  let userRepository: InMemoryUserRepository
  let getUserUseCase: GetUserUseCase
  let getUserController: GetUserController

  beforeAll(() => {
    userRepository = new InMemoryUserRepository()
    getUserUseCase = new GetUserUseCase(userRepository)
    getUserController = new GetUserController(getUserUseCase)

    for (let i = 0; i < 3; i++) {
      userRepository.users.push(validPropsCreator(validIds[i]))
    }
  })

  it('should get user by id send response with status 200', async () => {
    const req: any = { params: { id: validIds[0] } }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await getUserController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return a list of users after getUserUseCase execution', async () => {
    const car = await getUserUseCase.execute(validIds[0])
    expect(userRepository.users).toContain(car)
    expect(userRepository.users.length).toBe(3)
  })
})
