import { ReserveEntity } from '../../entities/implementations/reserve'

export interface IReserveRepository {
  save(user: ReserveEntity): Promise<void>
  find(data: object): Promise<ReserveEntity>
}
