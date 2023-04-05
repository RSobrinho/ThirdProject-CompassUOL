import { Response, Request } from 'express'
import { CreateCarUseCase } from './createCarUseCase'

export class CreateCarController {
  constructor (private createCarUseCase: CreateCarUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const newCar = await this.createCarUseCase.execute(req.body)

    return res.status(200).json({ status: 'Success', message: 'Car created successfully', newCar })
  }
}
