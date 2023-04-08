import { Response, Request } from 'express'
import { CreateReserveUseCase } from './createReserveUseCase'

export class CreateReserveController {
  constructor (private createReserveUseCase: CreateReserveUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const newReserve = await this.createReserveUseCase.execute({ ...req.body, idUser: req.user._id })
    return res.status(201).json({ status: 'Success', message: 'Reserve created successfully', newReserve })
  }
}
