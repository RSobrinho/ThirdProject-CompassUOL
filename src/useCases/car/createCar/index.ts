import { MongoDBCarRepository } from '../../../repositories/implementations/MongoDB/mongoDBCarRepository'
import { CreateCarUseCase } from './createCarUseCase'
import { CreateCarController } from './createCarController'

const mongoDBCarRepository = new MongoDBCarRepository()
const createCarUseCase = new CreateCarUseCase(mongoDBCarRepository)
const createCarController = new CreateCarController(createCarUseCase)

export { createCarUseCase, createCarController }
