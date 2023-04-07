import { IAddressInfoProvider } from '../../../providers/interfaces/iAddressInfoProvider'
import { UserEntity } from '../../../entities/implementations/user'
import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { createUserDTO } from './createUserDTO'
import { AlreadyOnBaseError } from '../../../errors/alreadyOnBaseError'
export class CreateUserUseCase {
  constructor (private userRepository: IUserRepository, private addressProvider: IAddressInfoProvider) {}

  async execute ({ name, cpf, birth, email, password, cep, qualified }: createUserDTO): Promise<UserEntity> {
    const addressProps = await this.addressProvider.consume(cep)
    const newUser = new UserEntity({ name, cpf, birth, email, password, cep, qualified, ...addressProps })

    if (await this.userRepository.findByData({ email })) {
      throw new AlreadyOnBaseError('email')
    } else if (await this.userRepository.findByData({ cpf })) {
      throw new AlreadyOnBaseError('cpf')
    } else {
      await this.userRepository.save(newUser)
    }

    return newUser
  }
}
