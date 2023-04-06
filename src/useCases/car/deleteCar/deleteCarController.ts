import { Response, Request } from 'express'
import { DeleteCarUseCase } from './deleteCarUseCase'

export class DeleteCarController {
  constructor (private deleteCarUseCase: DeleteCarUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    await this.deleteCarUseCase.execute(req.params.id)

    return res.status(204).json({ status: 'Success', message: 'Car deleted successfully' })
  }
}
