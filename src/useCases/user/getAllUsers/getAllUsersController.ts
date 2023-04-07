import { Response, Request } from 'express'
import { GetAllUsersUseCase } from './getAllUsersUseCase'

export class GetAllUsersController {
  constructor (private getAllUsersUseCase: GetAllUsersUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const users = await this.getAllUsersUseCase.execute(req.query)

    return res.status(200).json({ status: 'Success', message: 'Users listed successfully', users })
  }
}
