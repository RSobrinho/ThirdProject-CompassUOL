// import { faker } from '@faker-js/faker'
// import { describe, it, expect, vi, beforeAll } from 'vitest'
// import { createReserveDTO } from './createReserveDTO'
// import { ReserveEntity } from '../../../entities/implementations/reserve'
// import { InMemoryReserveRepository } from '../../../repositories/implementations/InMemory/inMemoryReserveRepository'
// import { CreateReserveUseCase } from './createReserveUseCase'
// import { ValidationError } from '../../../errors/validationError'
// import { CreateReserveController } from './createReserveController'

// describe('CreateReserveFeature', () => {
//   const validProps: createReserveDTO = {
//     model: faker.vehicle.vehicle(),
//     color: faker.color.human(),
//     year: faker.datatype.number({ min: 1950, max: (new Date()).getFullYear() }),
//     value_per_day: faker.datatype.number({ min: 20, max: 10000 }),
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
//     number_of_passengers: faker.datatype.number({ min: 2, max: 10 })
//   }

//   let reserveRepository: InMemoryReserveRepository
//   let createReserveUseCase: CreateReserveUseCase
//   let createReserveController: CreateReserveController

//   beforeAll(() => {
//     reserveRepository = new InMemoryReserveRepository()
//     createReserveUseCase = new CreateReserveUseCase(reserveRepository)
//     createReserveController = new CreateReserveController(createReserveUseCase)
//   })

//   it('should create a reserve successfully and send status 201', async () => {
//     const reserve = await createReserveUseCase.execute(validProps)

//     const req: any = { body: validProps }
//     const res: any = {
//       json: vi.fn().mockReturnThis(),
//       status: vi.fn().mockReturnThis()
//     }

//     await createReserveController.handle(req, res)

//     expect(reserve).toBeInstanceOf(ReserveEntity)
//     expect(reserveRepository.reserves).toContain(reserve)
//     expect(res.status).toHaveBeenCalledWith(201)
//     expect(res.json).toHaveBeenCalled()
//   })

//   it('should throw ValidationError when trying to create a new reserve with 2 equals descriptions', async () => {
//     const invalidProps = { ...validProps }
//     invalidProps.accessories.push({ description: 'DescRepeated' })
//     invalidProps.accessories.push({ description: 'DescRepeated' })

//     await expect(createReserveUseCase.execute(invalidProps)).rejects.toThrowError(ValidationError)
//   })
// })
