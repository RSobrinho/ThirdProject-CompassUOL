import { Router, Request, Response } from 'express'
import { asyncHandler } from '../errors/handler'
import { deleteCarController } from '../useCases/car/deleteCar'
import { createCarController } from '../useCases/car/createCar/'
import { getAllCarsController } from '../useCases/car/getAllCars'
import { getCarController } from '../useCases/car/getCar'
import { updateCarController } from '../useCases/car/updateCar'

const router = Router()

router.route('/')
  .get(asyncHandler((request: Request, response: Response) => {
    return getAllCarsController.handle(request, response)
  }))
  .post(asyncHandler((request: Request, response: Response) => {
    return createCarController.handle(request, response)
  }))

router.route('/:id')
  .get(asyncHandler((request: Request, response: Response) => {
    return getCarController.handle(request, response)
  }))
  .patch(asyncHandler((request: Request, response: Response) => {
    return updateCarController.handle(request, response)
  }))
  .delete(asyncHandler((request: Request, response: Response) => {
    return deleteCarController.handle(request, response)
  }))

export default router
