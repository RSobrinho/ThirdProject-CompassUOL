import { MongoDBCarRepository } from '../../../repositories/implementations/MongoDB/mongoDBCarRepository'
import { GetCarUseCase } from './getCarUseCase'
import { GetCarController } from './getCarController'

const mongoDBCarRepository = new MongoDBCarRepository()
const getCarUseCase = new GetCarUseCase(mongoDBCarRepository)
const getCarController = new GetCarController(getCarUseCase)

export { getCarUseCase, getCarController }
