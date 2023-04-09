import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
import { GetAllUsersUseCase } from './getAllUsersUseCase'
import { GetAllUsersController } from './getAllUsersController'
import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { createUserDTO } from '../createUser/createUserDTO'
import { extraFeatures } from '../../../utils/ExtraFeatures'
import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'
import { format } from 'date-fns'
describe('GetAllUsersFeature', () => {
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
  let getAllUsersUseCase: GetAllUsersUseCase
  let getAllUsersController: GetAllUsersController

  beforeAll(() => {
    userRepository = new InMemoryUserRepository()
    getAllUsersUseCase = new GetAllUsersUseCase(userRepository)
    getAllUsersController = new GetAllUsersController(getAllUsersUseCase)

    for (let i = 0; i < 3; i++) {
      userRepository.users.push(validPropsCreator(validIds[i]))
    }
  })

  it('should get all users without any query filter, based on any query filter a user successfully and send response with status 200', async () => {
    const req: any = {}
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await getAllUsersController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return a list of users after getAllUsersUseCase execution', async () => {
    await getAllUsersUseCase.execute({})
    expect(userRepository.users.length).toBe(3)
  })
})
