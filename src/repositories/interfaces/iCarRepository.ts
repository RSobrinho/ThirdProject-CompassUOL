import { ICarEntityProps } from 'entities/interfaces/iCarEntityProps'
import { CarEntity } from '../../entities/implementations/car'

export interface ICarRepository {
  save(user: CarEntity): Promise<void>
  deleteById(id: string): Promise<boolean>
  getById(id: string): Promise<object>
  updateById({ _id, ...props }: ICarEntityProps): Promise<object>
  findByFilter(props: { page?: number; limit?: number } & ICarEntityProps): Promise<object>
}
