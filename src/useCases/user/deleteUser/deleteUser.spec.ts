// import { describe, it, expect, vi, beforeAll } from 'vitest'
// import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
// import { DeleteUserUseCase } from './deleteUserUseCase'
// import { DeleteUserController } from './deleteUserController'
// import { v4 } from 'uuid'
// import { users } from '../../../utils/fakeData/users'
// describe('DeleteUserFeature', () => {
//   const validId = v4()

//   let userRepository: InMemoryUserRepository
//   let deleteUserUseCase: DeleteUserUseCase
//   let deleteUserController: DeleteUserController

//   beforeAll(() => {
//     userRepository = new InMemoryUserRepository()
//     deleteUserUseCase = new DeleteUserUseCase(userRepository)
//     deleteUserController = new DeleteUserController(deleteUserUseCase)

//     for (const user of users) {
//       userRepository.users.push(user)
//     }
//     userRepository.users.push({ ...users[0], _id: validId })
//   })

//   it('should delete a user successfully and send status 204', async () => {
//     const req: any = { params: { id: userRepository.users[userRepository.users.length - 1]._id } }
//     const res: any = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn().mockReturnThis()
//     }

//     await deleteUserUseCase.execute(validId)
//     await deleteUserController.handle(req, res)

//     expect(async () => {
//       return await deleteUserUseCase.execute(validId)
//     }).not.toThrowError()

//     expect(res.status).toHaveBeenCalledWith(204)
//   })
// })
