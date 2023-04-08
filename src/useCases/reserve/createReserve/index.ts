import { MongoDBReserveRepository } from '../../../repositories/implementations/MongoDB/mongoDBReserveRepository'
import { CreateReserveUseCase } from './createReserveUseCase'
import { CreateReserveController } from './createReserveController'
import { MongoDBCarRepository } from '../../../repositories/implementations/MongoDB/mongoDBCarRepository'
import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'

const mongoDBReserveRepository = new MongoDBReserveRepository()
const mongoDBCarRepository = new MongoDBCarRepository()
const mongoDBUserRepository = new MongoDBUserRepository()
const createReserveUseCase = new CreateReserveUseCase(mongoDBReserveRepository, mongoDBCarRepository, mongoDBUserRepository)
const createReserveController = new CreateReserveController(createReserveUseCase)

export { createReserveUseCase, createReserveController }
