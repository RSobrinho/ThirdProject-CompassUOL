import { ICarRepository } from '../../interfaces/iCarRepository'
import CarSchema from '../../../databases/MongoDB/carSchema'
import { CarEntity } from '../../../entities/implementations/car'
import { ICarEntityProps } from 'entities/interfaces/iCarEntityProps'

export class MongoDBCarRepository implements ICarRepository {
  async save (car: CarEntity): Promise<void> {
    await CarSchema.create(car)
  }

  async findById (id: string): Promise<object | null> {
    return await CarSchema.findById(id)
  }

  async findByFilter (data: { page?: number; limit?: number } & ICarEntityProps): Promise<object> {
    let { limit, page, ...props } = data

    if (!limit) {
      limit = 10
    }
    if (!page) {
      page = 1
    }

    const total = await CarSchema.countDocuments(props)
    const offsets = Math.ceil(total / limit)
    const offset = (page - 1) * limit

    const cars = await CarSchema.find(props)
      .select('_id model color year valuePerDay accessories numberOfPassengers')
      .skip(offset)
      .limit(limit)

    return {
      cars,
      total,
      limit,
      offset,
      offsets
    }
  }
}
