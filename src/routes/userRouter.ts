import { Router, Request, Response, NextFunction } from 'express'
import { asyncHandler } from '../errors/handler'
import { createUserController } from '../useCases/user/createUser'
import { deleteUserController } from '../useCases/user/deleteUser'
import { getUserController } from '../useCases/user/getUser'
import { updateUserController } from '../useCases/user/updateUser'
import { getAllUsersController } from '../useCases/user/getAllUsers'
import { logInUserController } from '../useCases/user/logInUser'
import { authenticationController } from '../useCases/user/authenticationUser'

const router = Router()

const simpleAuth = asyncHandler((request: Request, response: Response, next: NextFunction) => {
  return authenticationController.handle(request, response, next)
})

router.route('/')
  .post(asyncHandler((request: Request, response: Response) => {
    return createUserController.handle(request, response)
  }))
  .get(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return getAllUsersController.handle(request, response)
  }))

router.route('/:id')
  .get(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return getUserController.handle(request, response)
  }))
  .patch(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return updateUserController.handle(request, response)
  }))
  .delete(simpleAuth, asyncHandler((request: Request, response: Response) => {
    return deleteUserController.handle(request, response)
  }))

router.route('/authenticate')
  .post(asyncHandler((request: Request, response: Response) => {
    return logInUserController.handle(request, response)
  }))

export default router
