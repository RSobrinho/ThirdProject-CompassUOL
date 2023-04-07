import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { GetAllUsersDTO } from './getAllUsersDTO'

export class GetAllUsersUseCase {
  constructor (private userRepository: IUserRepository) {}

  async execute (props: GetAllUsersDTO): Promise<object> {
    const definedProps = {}

    for (const key in props) {
      if (props[key]) {
        definedProps[key] = props[key]
      }
    }

    return await this.userRepository.findByFilter(definedProps)
  }
}
