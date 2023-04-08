import { IReserveEntityProps } from '../../entities/interfaces/iReserveEntityProps'

export interface IReserveRepository {
  save(user: IReserveEntityProps): Promise<void>
  findByData(data: IReserveEntityProps): Promise<IReserveEntityProps>
  deleteById(id: string): Promise<boolean>
  updateById({ _id, ...props }: IReserveEntityProps): Promise<object>
  findByFilter(props: { page?: number; limit?: number } & IReserveEntityProps): Promise<object>
  findByRange(start_date: Date, end_date: Date): Promise<IReserveEntityProps[]>
}
