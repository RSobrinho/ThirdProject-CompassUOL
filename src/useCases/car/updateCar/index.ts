import { MongoDBCarRepository } from '../../../repositories/implementations/MongoDB/mongoDBCarRepository'
import { UpdateCarUseCase } from './updateCarUseCase'
import { UpdateCarController } from './updateCarController'
import { MongoDBReserveRepository } from '../../../repositories/implementations/MongoDB/mongoDBReserveRepository'

const mongoDBCarRepository = new MongoDBCarRepository()
const updateCarUseCase = new UpdateCarUseCase(mongoDBCarRepository)
const updateCarController = new UpdateCarController(updateCarUseCase)

export { updateCarUseCase, updateCarController }
