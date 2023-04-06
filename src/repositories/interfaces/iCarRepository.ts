import { ICarEntityProps } from 'entities/interfaces/iCarEntityProps'
import { CarEntity } from '../../entities/implementations/car'

export interface ICarRepository {
  save(user: CarEntity): Promise<void>
  findById(id: string): Promise<object | null>
  findByFilter(props: { page?: number; limit?: number } & ICarEntityProps): Promise<object>
}
