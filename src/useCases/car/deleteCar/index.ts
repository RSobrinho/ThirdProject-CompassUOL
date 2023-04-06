import { MongoDBCarRepository } from '../../../repositories/implementations/MongoDB/mongoDBCarRepository'
import { DeleteCarUseCase } from './deleteCarUseCase'
import { DeleteCarController } from './deleteCarController'

const mongoDBCarRepository = new MongoDBCarRepository()
const deleteCarUseCase = new DeleteCarUseCase(mongoDBCarRepository)
const deleteCarController = new DeleteCarController(deleteCarUseCase)

export { deleteCarUseCase, deleteCarController }
