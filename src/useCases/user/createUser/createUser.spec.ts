import { faker } from '@faker-js/faker'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserEntity } from '../../../entities/implementations/user'
import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
import { CreateUserUseCase } from './createUserUseCase'
import { CreateUserController } from './createUserController'
import { extraFeatures } from '../../../utils/ExtraFeatures'
import { format } from 'date-fns'
import { createUserDTO } from './createUserDTO'
import { IAddressInfoProvider } from '../../../providers/interfaces/iAddressInfoProvider'
import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'

class InMemoryAddressProvider implements IAddressInfoProvider {
  async consume (cep: string): Promise<IUserEntityProps> {
    return {
      patio: faker.address.street(),
      complement: faker.address.secondaryAddress(),
      neighborhood: faker.address.street(),
      locality: faker.address.city(),
      uf: extraFeatures.generateBrasilianState() || 'MS'
    }
  }
}

describe('CreateUserFeature', () => {
  const randomDate = faker.date.between(((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 100)), ((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 3)))

  const formattedRandomDate = format(randomDate, 'yyyy-MM-dd')

  const validProps: createUserDTO = {
    name: faker.name.fullName(),
    cpf: extraFeatures.generateCPF() || '077.998.461-78',
    birth: formattedRandomDate || '03/07/2004',
    email: faker.internet.email(),
    password: faker.internet.password(6),
    cep: faker.random.numeric(8),
    qualified: faker.helpers.arrayElement(['yes', 'no'])
  }

  let userRepository: InMemoryUserRepository
  let createUserUseCase: CreateUserUseCase
  let createUserController: CreateUserController
  let fakeAddressProvider: InMemoryAddressProvider

  beforeEach(() => {
    fakeAddressProvider = new InMemoryAddressProvider()
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository, fakeAddressProvider)
    createUserController = new CreateUserController(createUserUseCase)
  })

  it('should create a user successfully and send response with status 201', async () => {
    const req: any = { body: validProps }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await createUserController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)

    const createdUser = res.json.mock.calls[0][0].newUser
    const savedUser = await userRepository.users[0]
    expect(savedUser).toEqual(createdUser)
  })

  it('should return a valid user after createUserUseCase execution', async () => {
    const user = await createUserUseCase.execute(validProps)

    expect(user).toBeInstanceOf(UserEntity)
    expect(userRepository.users).toContain(user)
  })
})
