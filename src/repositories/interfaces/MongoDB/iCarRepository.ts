import { CarEntity } from '../../../entities/implementations/car'

export interface ICarRepository {
  save(user: CarEntity): Promise<void>
}
