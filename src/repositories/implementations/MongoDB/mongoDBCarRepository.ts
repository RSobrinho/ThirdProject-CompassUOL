import { ICarRepository } from '../../interfaces/iCarRepository'
import CarSchema from '../../../databases/MongoDB/carSchema'
import { CarEntity } from '../../../entities/implementations/car'
import { ICarEntityProps } from 'entities/interfaces/iCarEntityProps'

export class MongoDBCarRepository implements ICarRepository {
  async save (car: CarEntity): Promise<void> {
    await CarSchema.create(car)
  }

  async findByData (props: ICarEntityProps): Promise<ICarEntityProps> {
    return await CarSchema.findOne(props)
  }

  async getById (id: string): Promise<object> {
    return await CarSchema.findById(id).select('-__v')
  }

  async updateById ({ _id, ...props }): Promise<object> {
    await CarSchema.updateOne({ _id }, props)
    return await CarSchema.findByIdAndUpdate(_id, props)
  }

  async deleteById (id: string): Promise<boolean> {
    let deleted = false
    const carDeleted = await CarSchema.findByIdAndDelete(id)

    if (carDeleted !== null) {
      deleted = true
    }

    return deleted
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
