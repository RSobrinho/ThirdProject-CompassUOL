import { UserEntity } from '../../../entities/implementations/user'
import { IUserRepository } from '../../interfaces/iUserRepository'

export class InMemoryUserRepository implements IUserRepository {
  private users: UserEntity[]

  async save (user: UserEntity) {
    this.users.push(user)
  }
}
