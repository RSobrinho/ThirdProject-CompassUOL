import { IUserRepository } from '../../interfaces/iUserRepository'
import UserSchema from '../../../databases/MongoDB/userSchema'
import { UserEntity } from '../../../entities/implementations/user'

export class MongoDBUserRepository implements IUserRepository {
  async save (user: UserEntity) {
    await UserSchema.create(user)
  }
}
