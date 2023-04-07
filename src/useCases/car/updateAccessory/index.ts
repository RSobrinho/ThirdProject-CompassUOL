import { MongoDBCarRepository } from '../../../repositories/implementations/MongoDB/mongoDBCarRepository'
import { UpdateAccessoryUseCase } from './updateAccessoryUseCase'
import { UpdateAccessoryController } from './updateAccessoryController'

const mongoDBCarRepository = new MongoDBCarRepository()
const updateAccessoryUseCase = new UpdateAccessoryUseCase(mongoDBCarRepository)
const updateAccessoryController = new UpdateAccessoryController(updateAccessoryUseCase)

export { updateAccessoryUseCase, updateAccessoryController }
