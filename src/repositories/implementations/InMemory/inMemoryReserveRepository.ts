import { ReserveEntity } from '../../../entities/implementations/reserve'
import { IReserveRepository } from '../../interfaces/MongoDB/iReserveRepository'

export class InMemoryUserRepository implements IReserveRepository {
  private reserves: ReserveEntity[]

  async save (reserves: ReserveEntity) {
    this.reserves.push(reserves)
  }
}
