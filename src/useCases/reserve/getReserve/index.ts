import { MongoDBReserveRepository } from '../../../repositories/implementations/MongoDB/mongoDBReserveRepository'
import { GetReserveUseCase } from './getReserveUseCase'
import { GetReserveController } from './getReserveController'

const mongoDBReserveRepository = new MongoDBReserveRepository()
const getReserveUseCase = new GetReserveUseCase(mongoDBReserveRepository)
const getReserveController = new GetReserveController(getReserveUseCase)

export { getReserveUseCase, getReserveController }
