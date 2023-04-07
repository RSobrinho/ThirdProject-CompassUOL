import { NotFoundError } from '../../../errors/notFoundError'
import { UserEntity } from '../../../entities/implementations/user'
import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
export class GetUserUseCase {
  constructor (private userRepository: IUserRepository) {}

  async execute (id: string): Promise<object> {
    const _ = new UserEntity({ _id: id })
    const user = await this.userRepository.getById(id)

    if (!user) {
      throw new NotFoundError('user with this id')
    }

    return user
  }
}
