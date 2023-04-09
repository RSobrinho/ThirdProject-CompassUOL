import { faker } from '@faker-js/faker'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { createCarDTO } from './createCarDTO'
import { CarEntity } from '../../../entities/implementations/car'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { CreateCarUseCase } from './createCarUseCase'
import { CreateCarController } from './createCarController'

describe('CreateCarFeature', () => {
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

  let carRepository: InMemoryCarRepository
  let createCarUseCase: CreateCarUseCase
  let createCarController: CreateCarController

  beforeAll(() => {
    carRepository = new InMemoryCarRepository()
    createCarUseCase = new CreateCarUseCase(carRepository)
    createCarController = new CreateCarController(createCarUseCase)
  })

  it('should create a car successfully and send response with status 201', async () => {
    const req: any = { body: validProps }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await createCarController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)

    const createdCar = res.json.mock.calls[0][0].newCar
    const savedCar = await carRepository.cars[0]
    expect(savedCar).toEqual(createdCar)
  })

  it('should return a valid car after createCarUseCase execution', async () => {
    const car = await createCarUseCase.execute(validProps)

    expect(car).toBeInstanceOf(CarEntity)
    expect(carRepository.cars).toContain(car)
  })

  it('should throw an error when trying to create a new car with 2 equals descriptions', async () => {
    const invalidProps = { ...validProps }
    invalidProps.accessories.push({ description: 'DescRepeated' })
    invalidProps.accessories.push({ description: 'DescRepeated' })

    try {
      await createCarUseCase.execute(invalidProps)
    } catch (error) {
      expect(error.statusCode).toBe(400)
      expect(error.name).toBe('Error')
    }
  })
})
