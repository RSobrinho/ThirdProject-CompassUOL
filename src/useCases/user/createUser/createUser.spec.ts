// import { faker } from '@faker-js/faker'
// import { describe, it, expect, vi, beforeAll } from 'vitest'
// import { createUserDTO } from './createUserDTO'
// import { UserEntity } from '../../../entities/implementations/user'
// import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
// import { CreateUserUseCase } from './createUserUseCase'
// import { ValidationError } from '../../../errors/validationError'
// import { CreateUserController } from './createUserController'

// describe('CreateUserFeature', () => {
//   const validProps: createUserDTO = {
//     model: faker.vehicle.vehicle(),
//     color: faker.color.human(),
//     year: faker.datatype.number({ min: 1950, max: (new Date()).getFullYear() }),
//     valuePerDay: faker.datatype.number({ min: 20, max: 10000 }),
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
//     numberOfPassengers: faker.datatype.number({ min: 2, max: 10 })
//   }

//   let userRepository: InMemoryUserRepository
//   let createUserUseCase: CreateUserUseCase
//   let createUserController: CreateUserController

//   beforeAll(() => {
//     userRepository = new InMemoryUserRepository()
//     createUserUseCase = new CreateUserUseCase(userRepository)
//     createUserController = new CreateUserController(createUserUseCase)
//   })

//   it('should create a user successfully and send status 201', async () => {
//     const user = await createUserUseCase.execute(validProps)

//     const req: any = { body: validProps }
//     const res: any = {
//       json: vi.fn().mockReturnThis(),
//       status: vi.fn().mockReturnThis()
//     }

//     await createUserController.handle(req, res)

//     expect(user).toBeInstanceOf(UserEntity)
//     expect(userRepository.users).toContain(user)
//     expect(res.status).toHaveBeenCalledWith(201)
//     expect(res.json).toHaveBeenCalled()
//   })

//   it('should throw ValidationError when trying to create a new user with 2 equals descriptions', async () => {
//     const invalidProps = { ...validProps }
//     invalidProps.accessories.push({ description: 'DescRepeated' })
//     invalidProps.accessories.push({ description: 'DescRepeated' })

//     await expect(createUserUseCase.execute(invalidProps)).rejects.toThrowError(ValidationError)
//   })
// })
