import { Response, Request } from 'express'
import { GetAllReservesUseCase } from './getAllReservesUseCase'

export class GetAllReservesController {
  constructor (private getAllReservesUseCase: GetAllReservesUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const reserves = await this.getAllReservesUseCase.execute(req.query)

    return res.status(200).json({ status: 'Success', message: 'Reserves listed successfully', reserves })
  }
}
