import { IUserRepository } from '../../interfaces/iUserRepository'
import UserSchema from '../../../databases/MongoDB/userSchema'
import { UserEntity } from '../../../entities/implementations/user'
import { IUserEntityProps } from 'entities/interfaces/iUserEntityProps'

export class MongoDBUserRepository implements IUserRepository {
  async save (user: UserEntity): Promise<void> {
    await UserSchema.create(user)
  }

  async findByData (props: IUserEntityProps): Promise<IUserEntityProps> {
    return await UserSchema.findOne(props)
  }

  async getById (id: string): Promise<object> {
    return await UserSchema.findById(id).select('-__v')
  }

  async deleteById (id: string): Promise<boolean> {
    let deleted = false
    const userDeleted = await UserSchema.findByIdAndDelete(id)

    if (userDeleted !== null) {
      deleted = true
    }

    return deleted
  }

  async updateById ({ _id, ...props }: IUserEntityProps): Promise<object> {
    await UserSchema.updateOne({ _id }, props)
    return await UserSchema.findById(_id)
  }

  async findByFilter (data: { page?: number; limit?: number } & IUserEntityProps): Promise<object> {
    let { limit, page, ...props } = data

    if (!limit) {
      limit = 10
    }
    if (!page) {
      page = 1
    }

    const total = await UserSchema.countDocuments(props)
    const offsets = Math.ceil(total / limit)
    const offset = (page - 1) * limit

    const users = await UserSchema.find(props)
      .select('_id name cpf birth email password cep qualified patio complement neighborhood uf')
      .skip(offset)
      .limit(limit)

    return {
      users,
      total,
      limit,
      offset,
      offsets
    }
  }
}
