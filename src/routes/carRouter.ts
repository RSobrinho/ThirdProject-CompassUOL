import { Router, Request, Response } from 'express'
import { asyncHandler } from '../errors/handler'
import { createCarController } from '../useCases/car/createCar'

const router = Router()

router.route('/')
  .post(asyncHandler((request: Request, response: Response) => {
    return createCarController.handle(request, response)
  }))

export default router
