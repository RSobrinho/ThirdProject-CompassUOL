import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { GetUserUseCase } from './getUserUseCase'
import { GetUserController } from './getUserController'

const mongoDBUserRepository = new MongoDBUserRepository()
const getUserUseCase = new GetUserUseCase(mongoDBUserRepository)
const getUserController = new GetUserController(getUserUseCase)

export { getUserUseCase, getUserController }
