import { Response, Request } from 'express'
import { GetUserUseCase } from './getUserUseCase'

export class GetUserController {
  constructor (private getUserUseCase: GetUserUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const user = await this.getUserUseCase.execute(req.params.id)

    return res.status(200).json({ status: 'Success', message: 'User got successfully', user })
  }
}
