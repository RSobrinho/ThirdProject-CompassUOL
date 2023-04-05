import { CarEntity } from '../../entities/implementations/car'

export interface ICarRepository {
  save(user: CarEntity): Promise<void>
  findById(id: string): Promise<object | null>
}
