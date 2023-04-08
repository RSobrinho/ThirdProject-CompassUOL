/* eslint-disable camelcase */
import { IReserveRepository } from '../../interfaces/iReserveRepository'
import ReserveSchema from '../../../databases/MongoDB/reserveSchema'
import { ReserveEntity } from '../../../entities/implementations/reserve'
import { IReserveEntityProps } from 'entities/interfaces/iReserveEntityProps'

export class MongoDBReserveRepository implements IReserveRepository {
  async findByData (props: IReserveEntityProps): Promise<IReserveEntityProps> {
    return await ReserveSchema.findOne(props).select('-__v').lean()
  }

  async updateById ({ _id, ...props }: IReserveEntityProps): Promise<object> {
    await ReserveSchema.updateOne({ _id }, props)
    return await ReserveSchema.findById(_id)
  }

  async findByRange (start_date: Date, end_date: Date): Promise<IReserveEntityProps[]> {
    const reservations = await ReserveSchema.find({
      $or: [
        { start_date: { $lte: end_date }, end_date: { $gte: start_date } },
        { start_date: { $gte: start_date, $lte: end_date }, end_date: { $gte: end_date } },
        { start_date: { $lte: start_date }, end_date: { $gte: start_date, $lte: end_date } },
        { start_date: { $gte: start_date }, end_date: { $lte: end_date } },
        { start_date: { $lte: start_date }, end_date: { $gte: end_date } }
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
      .select('_id _id_user start_date end_date _id_car final_value')
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
