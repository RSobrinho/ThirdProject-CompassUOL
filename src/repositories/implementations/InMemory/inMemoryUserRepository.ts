import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'
import { IUserRepository } from '../../interfaces/iUserRepository'

export class InMemoryUserRepository implements IUserRepository {
  users: IUserEntityProps[] = []

  async save (user: IUserEntityProps): Promise<void> {
    this.users.push(user)
  }

  async findByData (props: IUserEntityProps): Promise<IUserEntityProps> {
    const user = this.users.find((c) => {
      return Object.keys(props).every((key) => {
        return c[key] === props[key]
      })
    })
    if (user) {
      return user
    } else {
      return null
    }
  }

  async updateById ({ _id, ...props }): Promise<IUserEntityProps> {
    const userIndex = this.users.findIndex((c) => c._id === _id)

    if (userIndex >= 0) {
      this.users[userIndex] = { _id, ...props }
      return this.users[userIndex]
    } else {
      return null
    }
  }

  async deleteById (id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((c) => c._id === id)

    if (userIndex >= 0) {
      this.users.splice(userIndex, 1)
      return true
    } else {
      return false
    }
  }

  async findByFilter (data: { page?: number; limit?: number } & IUserEntityProps): Promise<object> {
    let { limit, page, ...props } = data

    if (!limit) {
      limit = 10
    }
    if (!page) {
      page = 1
    }

    const offset = (page - 1) * limit

    const filteredUsers = this.users.filter((c) => {
      return Object.keys(props).every((key) => {
        return c[key] === props[key]
      })
    })

    const total = filteredUsers.length
    const offsets = Math.ceil(total / limit)

    const users = filteredUsers.slice(offset, offset + limit).map((c) => {
      return c
    })

    return {
      users,
      total,
      limit,
      offset,
      offsets
    }
  }
}
