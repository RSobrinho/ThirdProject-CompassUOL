import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { GetAllUsersUseCase } from './getAllUsersUseCase'
import { GetAllUsersController } from './getAllUsersController'

const mongoDBUserRepository = new MongoDBUserRepository()
const getAllUsersUseCase = new GetAllUsersUseCase(mongoDBUserRepository)
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase)

export { getAllUsersUseCase, getAllUsersController }
