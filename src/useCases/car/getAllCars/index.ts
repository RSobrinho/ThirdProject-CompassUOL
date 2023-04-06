import { MongoDBCarRepository } from '../../../repositories/implementations/MongoDB/mongoDBCarRepository'
import { GetAllCarsUseCase } from './getAllCarsUseCase'
import { GetAllCarsController } from './getAllCarsController'

const mongoDBCarRepository = new MongoDBCarRepository()
const getAllCarsUseCase = new GetAllCarsUseCase(mongoDBCarRepository)
const getAllCarsController = new GetAllCarsController(getAllCarsUseCase)

export { getAllCarsUseCase, getAllCarsController }
