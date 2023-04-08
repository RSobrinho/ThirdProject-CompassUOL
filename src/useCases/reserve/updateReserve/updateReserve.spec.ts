// import { describe, it, expect, vi, beforeAll } from 'vitest'
// import { InMemoryReserveRepository } from '../../../repositories/implementations/InMemory/inMemoryReserveRepository'
// import { UpdateReserveUseCase } from './updateReserveUseCase'
// import { UpdateReserveController } from './updateReserveController'
// import { v4 } from 'uuid'
// import { faker } from '@faker-js/faker'
// import { UpdateReserveDTO } from './updateReserveDTO'
// describe('UpdateReserveFeature', () => {
//   const validProps: UpdateReserveDTO = {
//     _id: v4(),
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

//   let reserveRepository: InMemoryReserveRepository
//   let updateReserveUseCase: UpdateReserveUseCase
//   let updateReserveController: UpdateReserveController

//   beforeAll(() => {
//     reserveRepository = new InMemoryReserveRepository()
//     updateReserveUseCase = new UpdateReserveUseCase(reserveRepository)
//     updateReserveController = new UpdateReserveController(updateReserveUseCase)

//     reserveRepository.reserves.push(validProps)
//   })

//   it('should update a reserve successfully and send status 200', async () => {
//     const req: any = { params: { id: reserveRepository.reserves[reserveRepository.reserves.length - 1]._id }, body: { ...validProps, _id: undefined } }
//     const res: any = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn().mockReturnThis()
//     }

//     const updatedProps = { ...validProps, color: 'black', year: 1955, valuePerDay: 1000 }

//     const reserve: any = await updateReserveUseCase.execute(updatedProps)
//     await updateReserveController.handle(req, res)

//     expect(reserve.color).toEqual(updatedProps.color)
//     expect(reserve.year).toEqual(updatedProps.year)
//     expect(reserve.valuePerDay).toEqual(updatedProps.valuePerDay)

//     expect(async () => {
//       return await updateReserveUseCase.execute(validProps)
//     }).not.toThrowError()

//     expect(res.status).toHaveBeenCalledWith(200)
//   })
// })
