import { MongoDBCarRepository } from '../../../repositories/implementations/MongoDB/mongoDBCarRepository'
import { UpdateCarUseCase } from './updateCarUseCase'
import { UpdateCarController } from './updateCarController'

const mongoDBCarRepository = new MongoDBCarRepository()
const updateCarUseCase = new UpdateCarUseCase(mongoDBCarRepository)
const updateCarController = new UpdateCarController(updateCarUseCase)

export { updateCarUseCase, updateCarController }
