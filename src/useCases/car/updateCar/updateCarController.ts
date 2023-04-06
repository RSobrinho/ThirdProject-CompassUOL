import { Response, Request } from 'express'
import { UpdateCarUseCase } from './updateCarUseCase'

export class UpdateCarController {
  constructor (private updateCarUseCase: UpdateCarUseCase) {}

  async handle ({ body, params }: Request, res: Response): Promise<Response> {
    const car = await this.updateCarUseCase.execute({ _id: params.id, ...body })

    return res.status(200).json({ status: 'Success', message: 'Car updated successfully', car })
  }
}
