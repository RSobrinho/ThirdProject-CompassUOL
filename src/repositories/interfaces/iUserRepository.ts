import { IUserEntityProps } from 'entities/interfaces/iUserEntityProps'
import { UserEntity } from '../../entities/implementations/user'

export interface IUserRepository {
  save(user: UserEntity): Promise<void>
  findByData(props: object): Promise<IUserEntityProps>
  deleteById(id: string): Promise<boolean>
  getById(id: string): Promise<object>
  updateById({ _id, ...props }: IUserEntityProps): Promise<object>
  findByFilter(props: { page?: number; limit?: number } & IUserEntityProps): Promise<object>
}
