// import { faker } from '@faker-js/faker'
// import { describe, it, expect, vi, beforeAll } from 'vitest'
// import { UserEntity } from '../../../entities/implementations/user'
// import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
// import { GetAllUsersUseCase } from './getAllUsersUseCase'
// import { ValidationError } from '../../../errors/validationError'
// import { GetAllUsersController } from './getAllUsersController'
// import { GetAllUsersDTO } from './getAllUsersDTO'
// import { users } from '../../../utils/fakeData/users'

// describe('GetAllUsersFeature', () => {
//   const validProps: GetAllUsersDTO = {
//     page: `${faker.datatype.number({ min: 0, max: 5 })}`,
//     limit: `${faker.datatype.number({ min: 0, max: 20 })}`,
//     model: faker.vehicle.vehicle(),
//     color: faker.color.human(),
//     year: `${faker.datatype.number({ min: 1950, max: (new Date()).getFullYear() })}`,
//     value_per_day: `${faker.datatype.number({ min: 20, max: 10000 })}`,
//     accessories: [
//       {
//         description: faker.lorem.words(2)
//       },
//       {
//         description: faker.lorem.words(2)
//       },
//       {
//         description: faker.lorem.words(2)
//       }
//     ],
//     number_of_passengers: `${faker.datatype.number({ min: 2, max: 10 })}`
//   }

//   let userRepository: InMemoryUserRepository
//   let getAllUsersUseCase: GetAllUsersUseCase
//   let getAllUsersController: GetAllUsersController

//   beforeAll(() => {
//     userRepository = new InMemoryUserRepository()
//     getAllUsersUseCase = new GetAllUsersUseCase(userRepository)
//     getAllUsersController = new GetAllUsersController(getAllUsersUseCase)
//   })

//   it('should get users successfully based on filter and response status 200', async () => {
//     const req: any = { query: {} }
//     const res: any = {
//       json: vi.fn().mockReturnThis(),
//       status: vi.fn().mockReturnThis()
//     }

//     users.forEach(async (user) => await userRepository.save(user))

//     const dataReturn: any = await getAllUsersUseCase.execute({ page: validProps.page, limit: validProps.limit, model: 'Porsche Spyder' })

//     await getAllUsersController.handle(req, res)

//     expect(userRepository.users).toHaveLength(16)
//     expect(dataReturn.total).toBe(8)
//     expect(dataReturn.offset).toBe((parseInt(validProps.page) - 1) * parseInt(validProps.limit))
//     expect(dataReturn.offsets).toBe(Math.ceil(dataReturn.total / parseInt(validProps.limit)))
//     expect(dataReturn.limit).toBe(parseInt(validProps.limit))
//     expect(res.status).toHaveBeenCalledWith(200)
//   })
// })
