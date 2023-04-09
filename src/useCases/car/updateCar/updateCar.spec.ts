import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { UpdateCarUseCase } from './updateCarUseCase'
import { UpdateCarController } from './updateCarController'
import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { createCarDTO } from '../createCar/createCarDTO'
describe('UpdateCarFeature', () => {
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
  const propsToUpdate = { model: 'Updated model', color: 'black', year: 1999 }
  let carRepository: InMemoryCarRepository
  let updateCarUseCase: UpdateCarUseCase
  let updateCarController: UpdateCarController

  beforeAll(() => {
    carRepository = new InMemoryCarRepository()
    updateCarUseCase = new UpdateCarUseCase(carRepository)
    updateCarController = new UpdateCarController(updateCarUseCase)

    for (let i = 0; i < 3; i++) {
      carRepository.cars.push({ ...validProps, _id: validIds[i] })
    }
  })

  it('should get car by id send response with status 200', async () => {
    const req: any = { params: { id: validIds[0] }, body: propsToUpdate }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await updateCarController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return a list of cars after updateCarUseCase execution', async () => {
    await updateCarUseCase.execute({ _id: validIds[1], ...propsToUpdate })
    expect(carRepository.cars.length).toBe(3)
  })
})
