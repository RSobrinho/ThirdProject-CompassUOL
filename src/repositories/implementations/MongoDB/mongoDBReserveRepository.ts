import { IReserveRepository } from '../../interfaces/iReserveRepository'
import ReserveSchema from '../../../databases/MongoDB/reserveSchema'
import { ReserveEntity } from '../../../entities/implementations/reserve'

export class MongoDBReserveRepository implements IReserveRepository {
  async save (reserve: ReserveEntity) {
    await ReserveSchema.create(reserve)
  }
}
