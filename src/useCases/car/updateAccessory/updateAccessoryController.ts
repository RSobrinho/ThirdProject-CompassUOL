import { Response, Request } from 'express'
import { UpdateAccessoryUseCase } from './updateAccessoryUseCase'

export class UpdateAccessoryController {
  constructor (private updateAccessoryUseCase: UpdateAccessoryUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const params = req.path.split('/')
    const carWithUpdatedAccessory = await this.updateAccessoryUseCase.execute({ _id_car: params[1], _id_accessory: params[3], description: req.body.description })
    return res.status(200).json({ status: 'Success', message: 'Car accessories updated successfully', carWithUpdatedAccessory })
  }
}
