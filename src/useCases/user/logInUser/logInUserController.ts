import { Response, Request } from 'express'
import { LogInUserUseCase } from './logInUserUseCase'

export class LogInUserController {
  constructor (private logInUserUseCase: LogInUserUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const { token, user } = await this.logInUserUseCase.execute(req.body)

    req.user = user
    return res.status(200).json({ status: 'Success', message: 'User logged successfully', token })
  }
}
