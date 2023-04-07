// import { describe, it, expect, vi, beforeAll } from 'vitest'
// import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
// import { GetUserUseCase } from './getUserUseCase'
// import { GetUserController } from './getUserController'
// import { v4 } from 'uuid'
// import { users } from '../../../utils/fakeData/users'
// describe('GetUserFeature', () => {
//   const validId = v4()

//   let userRepository: InMemoryUserRepository
//   let getUserUseCase: GetUserUseCase
//   let getUserController: GetUserController

//   beforeAll(() => {
//     userRepository = new InMemoryUserRepository()
//     getUserUseCase = new GetUserUseCase(userRepository)
//     getUserController = new GetUserController(getUserUseCase)

//     for (const user of users) {
//       userRepository.users.push(user)
//     }
//     userRepository.users.push({ ...users[0], _id: validId })
//   })

//   it('should get a user successfully and send status 200', async () => {
//     const req: any = { params: { id: userRepository.users[userRepository.users.length - 1]._id } }
//     const res: any = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn().mockReturnThis()
//     }

//     const user: any = await getUserUseCase.execute(validId)
//     await getUserController.handle(req, res)

//     expect(user._id).toEqual(validId)
//     expect(async () => {
//       return await getUserUseCase.execute(validId)
//     }).not.toThrowError()

//     expect(res.status).toHaveBeenCalledWith(200)
//   })
// })
