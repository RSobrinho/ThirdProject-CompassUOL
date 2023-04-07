// import { describe, it, expect, vi, beforeAll } from 'vitest'
// import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
// import { UpdateCarUseCase } from './updateCarUseCase'
// import { UpdateCarController } from './updateCarController'
// import { v4 } from 'uuid'
// import { faker } from '@faker-js/faker'
// import { UpdateCarDTO } from './updateCarDTO'
// describe('UpdateCarFeature', () => {
//   const validProps: UpdateCarDTO = {
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

//   let carRepository: InMemoryCarRepository
//   let updateCarUseCase: UpdateCarUseCase
//   let updateCarController: UpdateCarController

//   beforeAll(() => {
//     carRepository = new InMemoryCarRepository()
//     updateCarUseCase = new UpdateCarUseCase(carRepository)
//     updateCarController = new UpdateCarController(updateCarUseCase)

//     carRepository.cars.push(validProps)
//   })

//   it('should update a car successfully and send status 200', async () => {
//     const req: any = { params: { id: carRepository.cars[carRepository.cars.length - 1]._id }, body: { ...validProps, _id: undefined } }
//     const res: any = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn().mockReturnThis()
//     }

//     const updatedProps = { ...validProps, color: 'black', year: 1955, valuePerDay: 1000 }

//     const car: any = await updateCarUseCase.execute(updatedProps)
//     await updateCarController.handle(req, res)

//     expect(car.color).toEqual(updatedProps.color)
//     expect(car.year).toEqual(updatedProps.year)
//     expect(car.valuePerDay).toEqual(updatedProps.valuePerDay)

//     expect(async () => {
//       return await updateCarUseCase.execute(validProps)
//     }).not.toThrowError()

//     expect(res.status).toHaveBeenCalledWith(200)
//   })
// })
