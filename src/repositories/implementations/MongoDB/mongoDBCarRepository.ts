import { ICarRepository } from '../../interfaces/iCarRepository'
import CarSchema from '../../../databases/MongoDB/carSchema'
import { ICarEntityProps } from '../../../entities/interfaces/iCarEntityProps'

export class MongoDBCarRepository implements ICarRepository {
  async save (car: ICarEntityProps): Promise<void> {
    await CarSchema.create(car)
  }

  async findByData (props: ICarEntityProps): Promise<ICarEntityProps> {
    return await CarSchema.findOne(props).select('-__v').lean()
  }

  async updateById ({ _id, ...props }): Promise<ICarEntityProps> {
    await CarSchema.updateOne({ _id }, props)
    return await CarSchema.findById(_id)
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
      .select('_id model color year value_per_day accessories number_of_passengers')
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
