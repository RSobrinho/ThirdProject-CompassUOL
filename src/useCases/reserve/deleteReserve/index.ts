import { MongoDBReserveRepository } from '../../../repositories/implementations/MongoDB/mongoDBReserveRepository'
import { DeleteReserveUseCase } from './deleteReserveUseCase'
import { DeleteReserveController } from './deleteReserveController'

const mongoDBReserveRepository = new MongoDBReserveRepository()
const deleteReserveUseCase = new DeleteReserveUseCase(mongoDBReserveRepository)
const deleteReserveController = new DeleteReserveController(deleteReserveUseCase)

export { deleteReserveUseCase, deleteReserveController }
