import { ICarRepository } from '../../interfaces/iCarRepository'
import CarSchema from '../../../databases/MongoDB/carSchema'
import { CarEntity } from '../../../entities/implementations/car'

export class MongoDBCarRepository implements ICarRepository {
  async save (car: CarEntity): Promise<void> {
    await CarSchema.create(car)
  }

  async findById (id: string): Promise<object | null> {
    return await CarSchema.findById(id)
  }
}
