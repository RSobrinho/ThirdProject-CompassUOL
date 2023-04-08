import { Response, Request } from 'express'
import { DeleteReserveUseCase } from './deleteReserveUseCase'

export class DeleteReserveController {
  constructor (private deleteReserveUseCase: DeleteReserveUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    await this.deleteReserveUseCase.execute(req.params.id)

    return res.status(204).json({ status: 'Success', message: 'Reserve deleted successfully' })
  }
}
