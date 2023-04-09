import { faker } from '@faker-js/faker'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
import { LogInUserUseCase } from './logInUserUseCase'
import { LogInUserController } from './logInUserController'
import { extraFeatures } from '../../../utils/ExtraFeatures'
import { format } from 'date-fns'
import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'
import { v4 } from 'uuid'
import dotenv from 'dotenv'
import { verify } from 'jsonwebtoken'
dotenv.config()

describe('LogInUserFeature', () => {
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
  const propsToLogIn = { _id: validIds[0], email: 'rafarrsobrinho@gmail.com', password: 'Rafael12345!@#$%' }
  let userRepository: InMemoryUserRepository
  let logInUserUseCase: LogInUserUseCase
  let logInUserController: LogInUserController

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    logInUserUseCase = new LogInUserUseCase(userRepository)
    logInUserController = new LogInUserController(logInUserUseCase)

    userRepository.users.push(validPropsCreator(propsToLogIn._id, propsToLogIn.email, propsToLogIn.password))
    for (let i = 1; i < 3; i++) {
      userRepository.users.push(validPropsCreator(validIds[i]))
    }
  })

  it('should logIn a user successfully and send response with status 200', async () => {
    const req: any = { body: { email: propsToLogIn.email, password: propsToLogIn.password } }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await logInUserController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)

    const token = res.json.mock.calls[0][0].token
    const { _id }: any = (await verify(token, process.env.JWT_SECRET))
    expect(_id).toBe(userRepository.users[0]._id)
  })

  it('should return a valid user after logInUserUseCase execution', async () => {
    const token = await logInUserUseCase.execute({ email: propsToLogIn.email, password: propsToLogIn.password })
    expect(userRepository.users.length).toBe(3)
  })
})
