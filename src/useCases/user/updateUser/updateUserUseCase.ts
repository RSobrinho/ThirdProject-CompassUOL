import { NotFoundError } from '../../../errors/notFoundError'
import { UserEntity } from '../../../entities/implementations/user'
import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { UpdateUserDTO } from './updateUserDTO'
export class UpdateUserUseCase {
  constructor (private userRepository: IUserRepository) {}

  async execute (props: UpdateUserDTO): Promise<object> {
    const userToUpdate = new UserEntity(props)

    const userUpdated = await this.userRepository.updateById(userToUpdate)

    if (!userUpdated) {
      throw new NotFoundError('user with this id')
    }

    return userUpdated
  }
}
