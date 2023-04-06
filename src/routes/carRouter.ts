import { Router, Request, Response } from 'express'
import { asyncHandler } from '../errors/handler'
import { createCarController } from '../useCases/car/createCar'
import { getAllCarsController } from '../useCases/car/getAllCars'

const router = Router()

router.route('/')
  .get(asyncHandler((request: Request, response: Response) => {
    return getAllCarsController.handle(request, response)
  }))
  .post(asyncHandler((request: Request, response: Response) => {
    return createCarController.handle(request, response)
  }))

export default router
