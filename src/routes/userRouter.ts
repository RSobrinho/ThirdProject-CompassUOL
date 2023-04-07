import { Router, Request, Response } from 'express'
import { asyncHandler } from '../errors/handler'
import { createUserController } from '../useCases/user/createUser'
import { deleteUserController } from '../useCases/user/deleteUser'
import { getUserController } from '../useCases/user/getUser'
import { updateUserController } from '../useCases/user/updateUser'
import { getAllUsersController } from '../useCases/user/getAllUsers'

const router = Router()

router.route('/')
  .post(asyncHandler((request: Request, response: Response) => {
    return createUserController.handle(request, response)
  }))
  .get(asyncHandler((request: Request, response: Response) => {
    return getAllUsersController.handle(request, response)
  }))

router.route('/:id')
  .get(asyncHandler((request: Request, response: Response) => {
    return getUserController.handle(request, response)
  }))
  .patch(asyncHandler((request: Request, response: Response) => {
    return updateUserController.handle(request, response)
  }))
  .delete(asyncHandler((request: Request, response: Response) => {
    return deleteUserController.handle(request, response)
  }))

export default router
