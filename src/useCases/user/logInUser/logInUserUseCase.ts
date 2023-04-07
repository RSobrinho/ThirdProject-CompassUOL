import { UserEntity } from '../../../entities/implementations/user'
import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { logInUserDTO } from './logInUserDTO'
import { ValidationError } from '../../../errors/validationError'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'
export class LogInUserUseCase {
  constructor (private userRepository: IUserRepository) {}
  async execute ({ email, password }: logInUserDTO): Promise<{token: string, user: IUserEntityProps}> {
    const _ = new UserEntity({ email, password })

    const existingUser = await this.userRepository.findByData({ email, password })

    if (!existingUser || await compare(password, existingUser.password)) {
      throw new ValidationError('Incorrect email or/and password')
    }
    return {
      token: sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      }),
      user: existingUser
    }
  }
}
