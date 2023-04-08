import { MongoDBReserveRepository } from '../../../repositories/implementations/MongoDB/mongoDBReserveRepository'
import { UpdateReserveUseCase } from './updateReserveUseCase'
import { UpdateReserveController } from './updateReserveController'
import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { MongoDBCarRepository } from '../../../repositories/implementations/MongoDB/mongoDBCarRepository'

const mongoDBCarRepository = new MongoDBCarRepository()
const mongoDBUserRepository = new MongoDBUserRepository()
const mongoDBReserveRepository = new MongoDBReserveRepository()
const updateReserveUseCase = new UpdateReserveUseCase(mongoDBReserveRepository, mongoDBUserRepository, mongoDBCarRepository)
const updateReserveController = new UpdateReserveController(updateReserveUseCase)

export { updateReserveUseCase, updateReserveController }
