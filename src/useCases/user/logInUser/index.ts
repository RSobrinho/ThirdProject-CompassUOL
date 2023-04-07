import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { LogInUserUseCase } from './logInUserUseCase'
import { LogInUserController } from './logInUserController'

const mongoDBUserRepository = new MongoDBUserRepository()
const logInUserUseCase = new LogInUserUseCase(mongoDBUserRepository)
const logInUserController = new LogInUserController(logInUserUseCase)

export { logInUserUseCase, logInUserController }
