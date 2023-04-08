import { ICarEntityProps } from '../../entities/interfaces/iCarEntityProps'

export interface ICarRepository {
  save(user: ICarEntityProps): Promise<void>
  findByData(data: ICarEntityProps): Promise<ICarEntityProps>
  deleteById(id: string): Promise<boolean>
  updateById({ _id, ...props }: ICarEntityProps): Promise<object>
  findByFilter(props: { page?: number; limit?: number } & ICarEntityProps): Promise<object>
}
