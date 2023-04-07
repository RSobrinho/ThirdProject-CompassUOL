import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { DeleteUserUseCase } from './deleteUserUseCase'
import { DeleteUserController } from './deleteUserController'

const mongoDBUserRepository = new MongoDBUserRepository()
const deleteUserUseCase = new DeleteUserUseCase(mongoDBUserRepository)
const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserUseCase, deleteUserController }
