import { Response, Request } from 'express'
import { UpdateAccessoryUseCase } from './updateAccessoryUseCase'

export class UpdateAccessoryController {
  constructor (private updateAccessoryUseCase: UpdateAccessoryUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const params = req.path.split('/')
    const carWithUpdatedAccessory = await this.updateAccessoryUseCase.execute({ _idCar: params[1], _idAccessory: params[3], description: req.body.description })

    return res.status(200).json({ status: 'Success', message: 'Car updated successfully', carWithUpdatedAccessory })
  }
}
