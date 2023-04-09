import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { AuthenticationUserDTO } from './authenticationUserDTO'
import { AuthError } from '../../../errors/authError'
import { verify } from 'jsonwebtoken'
import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'

interface jwtDecoded {
  _id: string,
  iat: number,
  exp: number
}

export class AuthenticationUserUseCase {
  constructor (private usersRepository: IUserRepository) {
  }

  public async execute ({ headerAuth }: AuthenticationUserDTO): Promise<IUserEntityProps> {
    let token: string
    if (
      headerAuth &&
      headerAuth.startsWith('Bearer')
    ) {
      token = headerAuth.split(' ')[1]
    }
    if (!token) {
      throw new AuthError('Please log in to get access.')
    }

    const decoded = (await verify(token, process.env.JWT_SECRET)) as jwtDecoded
    const currentUser = await this.usersRepository.findByData({ _id: decoded._id })

    if (!currentUser) {
      throw new AuthError('The user belonging to this token does no longer exist.')
    }

    return currentUser
  }
}
