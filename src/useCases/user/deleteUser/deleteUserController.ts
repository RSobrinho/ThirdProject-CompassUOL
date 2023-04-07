import { Response, Request } from 'express'
import { DeleteUserUseCase } from './deleteUserUseCase'

export class DeleteUserController {
  constructor (private deleteUserUseCase: DeleteUserUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    await this.deleteUserUseCase.execute(req.params.id)

    return res.status(204).json({ status: 'Success', message: 'User deleted successfully' })
  }
}
