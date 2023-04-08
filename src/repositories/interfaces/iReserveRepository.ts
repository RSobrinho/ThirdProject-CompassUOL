import { IReserveEntityProps } from '../../entities/interfaces/iReserveEntityProps'
import { ReserveEntity } from '../../entities/implementations/reserve'

export interface IReserveRepository {
  save(user: ReserveEntity): Promise<void>
  findByData(data: IReserveEntityProps): Promise<IReserveEntityProps>
  findByRange(startDate: Date, endDate: Date): Promise<IReserveEntityProps[]>
  deleteById(id: string): Promise<boolean>
  getById(id: string): Promise<object>
  updateById({ _id, ...props }: IReserveEntityProps): Promise<object>
  findByFilter(props: { page?: number; limit?: number } & IReserveEntityProps): Promise<object>
}
