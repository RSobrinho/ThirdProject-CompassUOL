import { faker } from '@faker-js/faker'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { createCarDTO } from './createCarDTO'
import { CarEntity } from '../../../entities/implementations/car'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { CreateCarUseCase } from './createCarUseCase'
import { ValidationError } from '../../../errors/validationError'
import { CreateCarController } from './createCarController'

describe('CreateCarFeature', () => {
  const validProps: createCarDTO = {
    model: faker.vehicle.vehicle(),
    color: faker.color.human(),
    year: faker.datatype.number({ min: 1950, max: (new Date()).getFullYear() }),
    valuePerDay: faker.datatype.number({ min: 20, max: 10000 }),
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
    numberOfPassengers: faker.datatype.number({ min: 2, max: 10 })
  }

  let carRepository: InMemoryCarRepository
  let createCarUseCase: CreateCarUseCase
  let createCarController: CreateCarController

  beforeAll(() => {
    carRepository = new InMemoryCarRepository()
    createCarUseCase = new CreateCarUseCase(carRepository)
    createCarController = new CreateCarController(createCarUseCase)
  })

  it('should create a car successfully and send status 201', async () => {
    const car = await createCarUseCase.execute(validProps)

    const req: any = { body: validProps }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await createCarController.handle(req, res)

    expect(car).toBeInstanceOf(CarEntity)
    expect(carRepository.cars).toContain(car)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalled()
  })

  it('should throw ValidationError when trying to create a new car with 2 equals descriptions', async () => {
    const invalidProps = { ...validProps }
    invalidProps.accessories.push({ description: 'DescRepeated' })
    invalidProps.accessories.push({ description: 'DescRepeated' })

    await expect(createCarUseCase.execute(invalidProps)).rejects.toThrowError(ValidationError)
  })
})
