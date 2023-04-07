import { Response, Request } from 'express'
import { UpdateUserUseCase } from './updateUserUseCase'

export class UpdateUserController {
  constructor (private updateUserUseCase: UpdateUserUseCase) {}

  async handle ({ body, params }: Request, res: Response): Promise<Response> {
    const user = await this.updateUserUseCase.execute({ _id: params.id, ...body })

    return res.status(200).json({ status: 'Success', message: 'User updated successfully', user })
  }
}
