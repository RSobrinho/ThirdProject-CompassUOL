import { ICarRepository } from '../../interfaces/MongoDB/iCarRepository'
import CarSchema from '../../../databases/MongoDB/carSchema'
import { CarEntity } from '../../../entities/implementations/car'

export class MongoDBCarRepository implements ICarRepository {
  async save (car: CarEntity) {
    await CarSchema.create(car)
  }
}
