import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { UpdateAccessoryUseCase } from './updateAccessoryUseCase'
import { UpdateAccessoryController } from './updateAccessoryController'
import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { createCarDTO } from '../createCar/createCarDTO'
describe('UpdateAccessoryFeature', () => {
  const validProps: createCarDTO = {
    model: faker.vehicle.vehicle(),
    color: faker.color.human(),
    year: faker.datatype.number({ min: 1950, max: (new Date()).getFullYear() }),
    value_per_day: faker.datatype.number({ min: 20, max: 10000 }),
    accessories: [],
    number_of_passengers: faker.datatype.number({ min: 2, max: 10 })
  }

  const validAccessoryIds = [v4(), v4(), v4()]
  const validId = v4()
  const updatedDescription = 'A new description'
  let carRepository: InMemoryCarRepository
  let updateAccessoryUseCase: UpdateAccessoryUseCase
  let updateAccessoryController: UpdateAccessoryController

  beforeAll(() => {
    carRepository = new InMemoryCarRepository()
    updateAccessoryUseCase = new UpdateAccessoryUseCase(carRepository)
    updateAccessoryController = new UpdateAccessoryController(updateAccessoryUseCase)

    carRepository.cars.push({ ...validProps, _id: validId })

    for (let i = 0; i < 3; i++) {
      carRepository.cars[0].accessories.push({ _id: validAccessoryIds[i], description: faker.lorem.words(2) })
    }
  })

  it('should update and accessory an send response with status 200', async () => {
    const req: any = { path: `/${validId}/accessories/${validAccessoryIds[0]}`, body: { description: updatedDescription } }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await updateAccessoryController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return a list of cars after updateAccessoryUseCase execution', async () => {
    await updateAccessoryUseCase.execute({ _id_car: validId, _id_accessory: validAccessoryIds[1], description: updatedDescription })
    expect(carRepository.cars.length).toBe(1)
  })
})
