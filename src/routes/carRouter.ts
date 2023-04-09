import { Router, Request, Response, NextFunction } from 'express'
import { asyncHandler } from '../errors/handler'
import { deleteCarController } from '../useCases/car/deleteCar'
import { createCarController } from '../useCases/car/createCar/'
import { getAllCarsController } from '../useCases/car/getAllCars'
import { getCarController } from '../useCases/car/getCar'
import { updateCarController } from '../useCases/car/updateCar'
import { updateAccessoryController } from '../useCases/car/updateAccessory'
import { authenticationUserController } from '../useCases/user/authenticationUser'

const router = Router()

const simpleAuth = asyncHandler((request: Request, response: Response, next: NextFunction) => {
  return authenticationUserController.handle(request, response, next)
})

router.route('/')
  .get(asyncHandler((request: Request, response: Response) => {
    return getAllCarsController.handle(request, response)
  }))
  .post(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return createCarController.handle(request, response)
  }))

router.route('/:id')
  .get(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return getCarController.handle(request, response)
  }))
  .patch(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return updateCarController.handle(request, response)
  }))
  .delete(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return deleteCarController.handle(request, response)
  }))

router.route('/:id/accessories/:id')
  .patch(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return updateAccessoryController.handle(request, response)
  }))
export default router
