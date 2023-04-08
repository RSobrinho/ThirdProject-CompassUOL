import { Request, Response, NextFunction } from 'express'
import { AuthenticationUseCase } from './authenticationUseCase'

export class AuthenticationController {
  constructor (private authenticationUseCase: AuthenticationUseCase) {
  }

  async handle (req: Request, res: Response, next: NextFunction): Promise<void> {
    req.user = await this.authenticationUseCase.execute({ headerAuth: req.headers.authorization })

    return next()
  }
}
