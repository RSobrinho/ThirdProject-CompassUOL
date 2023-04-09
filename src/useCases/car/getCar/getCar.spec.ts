import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { GetCarUseCase } from './getCarUseCase'
import { GetCarController } from './getCarController'
import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { createCarDTO } from '../createCar/createCarDTO'
describe('GetCarFeature', () => {
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
  let getCarUseCase: GetCarUseCase
  let getCarController: GetCarController

  beforeAll(() => {
    carRepository = new InMemoryCarRepository()
    getCarUseCase = new GetCarUseCase(carRepository)
    getCarController = new GetCarController(getCarUseCase)

    for (let i = 0; i < 3; i++) {
      carRepository.cars.push({ ...validProps, _id: validIds[i] })
    }
  })

  it('should get car by id send response with status 200', async () => {
    const req: any = { params: { id: validIds[0] } }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await getCarController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return a list of cars after getCarUseCase execution', async () => {
    await getCarUseCase.execute(validIds[0])
    expect(carRepository.cars).not.toContain({ ...validProps, id: validIds[0] })
    expect(carRepository.cars.length).toBe(3)
  })
})
