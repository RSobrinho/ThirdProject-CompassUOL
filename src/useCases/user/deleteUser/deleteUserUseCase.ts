import { NotFoundError } from '../../../errors/notFoundError'
import { UserEntity } from '../../../entities/implementations/user'
import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
export class DeleteUserUseCase {
  constructor (private userRepository: IUserRepository) {}

  async execute (id: string): Promise<void> {
    const _ = new UserEntity({ _id: id })
    const deleted = await this.userRepository.deleteById(id)

    if (!deleted) {
      throw new NotFoundError('user with this id')
    }
  }
}
