import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { CreateUserUseCase } from './createUserUseCase'
import { CreateUserController } from './createUserController'
import { ViaCepAddressInfoProvider } from '../../../providers/implementations/viaCepAddressInfoProvider'

const viaCepAddressInfoProvider = new ViaCepAddressInfoProvider()
const mongoDBUserRepository = new MongoDBUserRepository()
const createUserUseCase = new CreateUserUseCase(mongoDBUserRepository, viaCepAddressInfoProvider)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }
