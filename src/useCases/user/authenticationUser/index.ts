import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { AuthenticationUseCase } from './authenticationUseCase'
import { AuthenticationController } from './authenticationController'

const mongoDBUsersRepository = new MongoDBUserRepository()
const authenticationUseCase = new AuthenticationUseCase(mongoDBUsersRepository)
const authenticationController = new AuthenticationController(authenticationUseCase)

export { authenticationUseCase, authenticationController }
