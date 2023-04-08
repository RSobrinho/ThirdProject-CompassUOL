import { Router, Request, Response, NextFunction } from 'express'
import { asyncHandler } from '../errors/handler'
import { deleteReserveController } from '../useCases/reserve/deleteReserve'
import { createReserveController } from '../useCases/reserve/createReserve/'
import { getAllReservesController } from '../useCases/reserve/getAllReserves'
import { getReserveController } from '../useCases/reserve/getReserve'
import { updateReserveController } from '../useCases/reserve/updateReserve'
import { authenticationController } from '../useCases/user/authenticationUser'
const router = Router()

const simpleAuth = asyncHandler((request: Request, response: Response, next: NextFunction) => {
  return authenticationController.handle(request, response, next)
})

router.route('/')
  .get(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return getAllReservesController.handle(request, response)
  }))
  .post(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return createReserveController.handle(request, response)
  }))

router.route('/:id')
  .get(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return getReserveController.handle(request, response)
  }))
  .patch(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return updateReserveController.handle(request, response)
  }))
  .delete(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return deleteReserveController.handle(request, response)
  }))

export default router
