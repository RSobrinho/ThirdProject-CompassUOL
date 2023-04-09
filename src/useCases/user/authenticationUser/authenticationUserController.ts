import { Request, Response, NextFunction } from 'express'
import { AuthenticationUserUseCase } from './authenticationUserUseCase'

export class AuthenticationUserController {
  constructor (private authenticationUseCase: AuthenticationUserUseCase) {
  }

  async handle (req: Request, res: Response, next: NextFunction): Promise<void> {
    req.user = await this.authenticationUseCase.execute({ headerAuth: req.headers.authorization })

    return next()
  }
}
