import { Response, Request } from 'express'
import { CreateUserUseCase } from './createUserUseCase'

export class CreateUserController {
  constructor (private createUserUseCase: CreateUserUseCase) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const newUser = await this.createUserUseCase.execute(req.body)

    return res.status(201).json({ status: 'Success', message: 'User created successfully', newUser })
  }
}
