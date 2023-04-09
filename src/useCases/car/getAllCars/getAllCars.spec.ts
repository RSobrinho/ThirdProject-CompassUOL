import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { GetAllCarsUseCase } from './getAllCarsUseCase'
import { GetAllCarsController } from './getAllCarsController'
import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { createCarDTO } from '../createCar/createCarDTO'
describe('GetAllCarsFeature', () => {
  const validProps: createCarDTO = {
    model: faker.vehicle.vehicle(),
    color: faker.color.human(),
    year: faker.datatype.number({ min: 1950, max: (new Date()).getFullYear() }),
    value_per_day: faker.datatype.number({ min: 20, max: 10000 }),
    accessories: [
      {
        description: faker.lorem.words(2)
      },
      {
        description: faker.lorem.words(2)
      },
      {
        description: faker.lorem.words(2)
      }
    ],
    number_of_passengers: faker.datatype.number({ min: 2, max: 10 })
  }

  const validIds = [v4(), v4(), v4()]

  let carRepository: InMemoryCarRepository
  let getAllCarsUseCase: GetAllCarsUseCase
  let getAllCarsController: GetAllCarsController

  beforeAll(() => {
    carRepository = new InMemoryCarRepository()
    getAllCarsUseCase = new GetAllCarsUseCase(carRepository)
    getAllCarsController = new GetAllCarsController(getAllCarsUseCase)

    for (let i = 0; i < 3; i++) {
      carRepository.cars.push({ ...validProps, _id: validIds[i] })
    }
  })

  it('should get all cars without any query filter, based on any query filter a car successfully and send response with status 200', async () => {
    const req: any = {}
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await getAllCarsController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return a list of cars after getAllCarsUseCase execution', async () => {
    await getAllCarsUseCase.execute({})
    expect(carRepository.cars).not.toContain({ ...validProps, id: validIds[0] })
    expect(carRepository.cars.length).toBe(3)
  })
})
