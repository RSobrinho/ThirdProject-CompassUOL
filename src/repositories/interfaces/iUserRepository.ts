import { IUserEntityProps } from '../../entities/interfaces/iUserEntityProps'

export interface IUserRepository {
  save(user: IUserEntityProps): Promise<void>
  findByData(data: IUserEntityProps): Promise<IUserEntityProps>
  deleteById(id: string): Promise<boolean>
  updateById({ _id, ...props }: IUserEntityProps): Promise<object>
  findByFilter(props: { page?: number; limit?: number } & IUserEntityProps): Promise<object>
}
