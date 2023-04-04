import { UserEntity } from '../../../entities/implementations/user'

export interface IUserRepository {
  save(user: UserEntity): Promise<void>
}
