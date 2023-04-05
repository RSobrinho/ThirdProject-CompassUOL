import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { v4 } from 'uuid'
import { createCarDTO } from './createCarDTO'
import { CarEntity } from '../../../entities/implementations/car'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { CreateCarUseCase } from './createCarUseCase'

describe('createCarUseCase', () => {
  const validProps: createCarDTO = {
    model: faker.vehicle.vehicle(),
    color: faker.color.human(),
    year: faker.datatype.number({ min: 1950, max: (new Date()).getFullYear() }),
    valuePerDay: faker.datatype.number({ min: 20, max: 10000 }),
    accessories: [
      {
        description: faker.lorem.words(3)
      },
      {
        description: faker.lorem.words(3)
      },
      {
        description: faker.lorem.words(3)
      }
    ],
    numberOfPassengers: faker.datatype.number({ min: 2, max: 10 })
  }

  it('should create a car and return the created car', async () => {
    const carRepository = new InMemoryCarRepository()
    const createCarUseCase = new CreateCarUseCase(carRepository)

    const car = await createCarUseCase.execute(validProps)

    // expect(car).toHaveProperty()

    // criar um mock que pegue esse execute, e faça a execução que retorne uma entidade CarEntity

    console.log(validCar)

    expect(validCar).toBeInstanceOf(CarEntity)
  })

  it('should throw ValidationError when trying to create a new car with 2 equals descriptions', () => {
    const invalidProps = validProps
    invalidProps.accessories.push({ description: 'DescRepeated' })
    invalidProps.accessories.push({ description: 'DescRepeated' })

    const invalidCar = () => {
      return new CarEntity(invalidProps)
    }

    expect(invalidCar).toThrow()
  })
})
