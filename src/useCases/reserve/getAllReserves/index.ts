import { MongoDBReserveRepository } from '../../../repositories/implementations/MongoDB/mongoDBReserveRepository'
import { GetAllReservesUseCase } from './getAllReservesUseCase'
import { GetAllReservesController } from './getAllReservesController'

const mongoDBReserveRepository = new MongoDBReserveRepository()
const getAllReservesUseCase = new GetAllReservesUseCase(mongoDBReserveRepository)
const getAllReservesController = new GetAllReservesController(getAllReservesUseCase)

export { getAllReservesUseCase, getAllReservesController }
