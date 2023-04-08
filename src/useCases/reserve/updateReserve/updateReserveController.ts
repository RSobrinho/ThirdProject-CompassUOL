import { Response, Request } from 'express'
import { UpdateReserveUseCase } from './updateReserveUseCase'

export class UpdateReserveController {
  constructor (private updateReserveUseCase: UpdateReserveUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const reserve = await this.updateReserveUseCase.execute({ _id: req.params.id, ...req.body, idUser: req.user._id })

    return res.status(200).json({ status: 'Success', message: 'Reserve updated successfully', reserve })
  }
}
