// import { describe, it, expect, vi, beforeAll } from 'vitest'
// import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
// import { UpdateAccessoryUseCase } from './updateAccessoryUseCase'
// import { UpdateAccessoryController } from './updateAccessoryController'
// import { v4 } from 'uuid'
// import { faker } from '@faker-js/faker'
// import { UpdateAccessoryDTO } from './updateAccessoryDTO'
// describe('UpdateAccessoryFeature', () => {
//   const validProps: UpdateAccessoryDTO = {
//     _idCar: v4(),
//     _idAccessory: v4(),
//     description: 'Uma descrição braba

//   }

//   let carRepository: InMemoryCarRepository
//   let updateAccessoryUseCase: UpdateAccessoryUseCase
//   let updateAccessoryController: UpdateAccessoryController

//   beforeAll(() => {
//     carRepository = new InMemoryCarRepository()
//     updateAccessoryUseCase = new UpdateAccessoryUseCase(carRepository)
//     updateAccessoryController = new UpdateAccessoryController(updateAccessoryUseCase)

//     carRepository.cars.push(validProps)
//   })

//   it('should update a car successfully and send status 200', async () => {
//     const req: any = { params: { id: carRepository.cars[carRepository.cars.length - 1]._id }, body: { ...validProps, _id: undefined } }
//     const res: any = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn().mockReturnThis()
//     }

//     const updatedProps = { ...validProps, color: 'black', year: 1955, value_per_day: 1000 }

//     const car: any = await updateAccessoryUseCase.execute(updatedProps)
//     await updateAccessoryController.handle(req, res)

//     expect(car.color).toEqual(updatedProps.color)
//     expect(car.year).toEqual(updatedProps.year)
//     expect(car.value_per_day).toEqual(updatedProps.value_per_day)

//     expect(async () => {
//       return await updateAccessoryUseCase.execute(validProps)
//     }).not.toThrowError()

//     expect(res.status).toHaveBeenCalledWith(200)
//   })
// })
