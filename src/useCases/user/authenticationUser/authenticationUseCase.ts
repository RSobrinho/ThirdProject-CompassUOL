import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { IAuthenticationDTO } from './authenticationDTO'
import { AuthError } from '../../../errors/authError'
import { verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'
config()

interface jwtDecoded {
  _id: string,
  iat: number,
  exp: number
}

export class AuthenticationUseCase {
  constructor (private usersRepository: IUserRepository) {
  }

  public async execute ({ headerAuth }: IAuthenticationDTO): Promise<void> {
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

    console.log(decoded)

    const currentUser = await this.usersRepository.findByData({ _id: decoded._id })

    if (!currentUser) {
      throw new AuthError('The user belonging to this token does no longer exist.')
    }
  }
}
