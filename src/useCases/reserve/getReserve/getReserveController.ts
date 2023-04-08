import { Response, Request } from 'express'
import { GetReserveUseCase } from './getReserveUseCase'

export class GetReserveController {
  constructor (private getReserveUseCase: GetReserveUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const reserve = await this.getReserveUseCase.execute({ _id: req.params.id })

    return res.status(200).json({ status: 'Success', message: 'Reserve got successfully', reserve })
  }
}
