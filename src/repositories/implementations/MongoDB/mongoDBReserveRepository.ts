import { IReserveRepository } from '../../interfaces/iReserveRepository'
import ReserveSchema from '../../../databases/MongoDB/reserveSchema'
import { ReserveEntity } from '../../../entities/implementations/reserve'
import { IReserveEntityProps } from 'entities/interfaces/iReserveEntityProps'

export class MongoDBReserveRepository implements IReserveRepository {
  async findByData (props: IReserveEntityProps): Promise<IReserveEntityProps> {
    return await ReserveSchema.findOne(props)
  }

  async getById (id: string): Promise<object> {
    return await ReserveSchema.findById(id).select('-__v')
  }

  async updateById ({ _id, ...props }: IReserveEntityProps): Promise<object> {
    await ReserveSchema.updateOne({ _id }, props)
    return await ReserveSchema.findById(_id)
  }

  async findByRange (startDate: Date, endDate: Date): Promise<IReserveEntityProps[]> {
    const reservations = await ReserveSchema.find({
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
        { startDate: { $gte: startDate, $lte: endDate }, endDate: { $gte: endDate } },
        { startDate: { $lte: startDate }, endDate: { $gte: startDate, $lte: endDate } },
        { startDate: { $gte: startDate }, endDate: { $lte: endDate } },
        { startDate: { $lte: startDate }, endDate: { $gte: endDate } }
      ]
    }).exec() as unknown as IReserveEntityProps[]

    return reservations
  }

  async findByFilter (data: { page?: number; limit?: number } & IReserveEntityProps): Promise<object> {
    let { limit, page, ...props } = data

    if (!limit) {
      limit = 10
    }
    if (!page) {
      page = 1
    }

    const total = await ReserveSchema.countDocuments(props)
    const offsets = Math.ceil(total / limit)
    const offset = (page - 1) * limit

    const reserves = await ReserveSchema.find(props)
      .select('_id idUser startDate endDate idCar finalValue')
      .skip(offset)
      .limit(limit)

    return {
      reserves,
      total,
      limit,
      offset,
      offsets
    }
  }

  async save (reserve: ReserveEntity) {
    await ReserveSchema.create(reserve)
  }

  async deleteById (id: string): Promise<boolean> {
    let deleted = false
    const reserveDeleted = await ReserveSchema.findByIdAndDelete(id)

    if (reserveDeleted !== null) {
      deleted = true
    }

    return deleted
  }
}
