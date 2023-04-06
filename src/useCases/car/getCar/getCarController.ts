import { Response, Request } from 'express'
import { GetCarUseCase } from './getCarUseCase'

export class GetCarController {
  constructor (private getCarUseCase: GetCarUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const car = await this.getCarUseCase.execute(req.params.id)

    return res.status(200).json({ status: 'Success', message: 'Car got successfully', car })
  }
}
