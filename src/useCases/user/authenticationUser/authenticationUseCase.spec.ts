import { faker } from '@faker-js/faker'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
import { AuthenticationUserUseCase } from './authenticationUserUseCase'
import { AuthenticationUserController } from './authenticationUserController'
import { extraFeatures } from '../../../utils/ExtraFeatures'
import { format } from 'date-fns'
import { AuthenticationUserDTO } from './authenticationUserDTO'
import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'
import { v4 } from 'uuid'
import dotenv from 'dotenv'
import { sign, verify } from 'jsonwebtoken'
dotenv.config()

describe('AuthenticationUserFeature', () => {
  const randomDate = faker.date.between(((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 100)), ((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 3)))

  const formattedRandomDate = format(randomDate, 'yyyy-MM-dd')

  const validPropsCreator = (_id?: string, email?: string, password?: string): IUserEntityProps => {
    return {
      _id: _id || v4(),
      name: faker.name.fullName(),
      cpf: extraFeatures.generateCPF() || '077.998.461-78',
      birth: formattedRandomDate || '03/07/2004',
      email: email || faker.internet.email(),
      password: password || faker.internet.password(6),
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
  // const propsToAuthentication = { _id: validIds[0], email: 'rafarrsobrinho@gmail.com', password: 'Rafael12345!@#$%' }

  const fakeToken = sign({ _id: validIds[0] }, process.env.JWT_SECRET, {
    expiresIn: '1m'
  })

  let userRepository: InMemoryUserRepository
  let authenticationUserUseCase: AuthenticationUserUseCase
  let authenticationUserController: AuthenticationUserController

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    authenticationUserUseCase = new AuthenticationUserUseCase(userRepository)
    authenticationUserController = new AuthenticationUserController(authenticationUserUseCase)

    for (let i = 0; i < 3; i++) {
      userRepository.users.push(validPropsCreator(validIds[i]))
    }
  })

  it('should authenticate a user successfully and do not throw an authorization error', async () => {
    const req: any = { headers: { authorization: `Bearer ${fakeToken}` } }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }
    const next: any = vi.fn()

    const fn = async () => {
      return await authenticationUserController.handle(req, res, next)
    }
    expect(fn).not.toThrow()
  })
})
