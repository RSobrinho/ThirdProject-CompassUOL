import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { DeleteCarUseCase } from './deleteCarUseCase'
import { DeleteCarController } from './deleteCarController'
import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { createCarDTO } from '../createCar/createCarDTO'
describe('DeleteCarFeature', () => {
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
  let deleteCarUseCase: DeleteCarUseCase
  let deleteCarController: DeleteCarController

  beforeAll(() => {
    carRepository = new InMemoryCarRepository()
    deleteCarUseCase = new DeleteCarUseCase(carRepository)
    deleteCarController = new DeleteCarController(deleteCarUseCase)

    for (let i = 0; i < 3; i++) {
      carRepository.cars.push({ ...validProps, _id: validIds[i] })
    }
  })

  it('should delete a car successfully and send response with status 204', async () => {
    const req: any = { params: { id: validIds[0] } }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await deleteCarController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(204)
  })

  it('should return a valid car after createCarUseCase execution', async () => {
    await deleteCarUseCase.execute(validIds[1])
    expect(carRepository.cars).not.toContain({ ...validProps, id: validIds[1] })
    expect(carRepository.cars.length).toBe(1)
  })
})
