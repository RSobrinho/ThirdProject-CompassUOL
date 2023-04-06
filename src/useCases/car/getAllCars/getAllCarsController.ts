import { Response, Request } from 'express'
import { GetAllCarsUseCase } from './getAllCarsUseCase'

export class GetAllCarsController {
  constructor (private getAllCarsUseCase: GetAllCarsUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const cars = await this.getAllCarsUseCase.execute(req.query)

    return res.status(200).json({ status: 'Success', message: 'Cars listed successfully', cars })
  }
}
