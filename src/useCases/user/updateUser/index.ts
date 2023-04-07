import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { UpdateUserUseCase } from './updateUserUseCase'
import { UpdateUserController } from './updateUserController'

const mongoDBUserRepository = new MongoDBUserRepository()
const updateUserUseCase = new UpdateUserUseCase(mongoDBUserRepository)
const updateUserController = new UpdateUserController(updateUserUseCase)

export { updateUserUseCase, updateUserController }
