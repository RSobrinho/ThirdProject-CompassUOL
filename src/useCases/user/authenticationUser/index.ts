import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { AuthenticationUserUseCase } from './authenticationUserUseCase'
import { AuthenticationUserController } from './authenticationUserController'

const mongoDBUsersRepository = new MongoDBUserRepository()
const authenticationUserUseCase = new AuthenticationUserUseCase(mongoDBUsersRepository)
const authenticationUserController = new AuthenticationUserController(authenticationUserUseCase)

export { authenticationUserUseCase, authenticationUserController }
