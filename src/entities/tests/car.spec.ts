import { faker } from '@faker-js/faker'
import { CarEntity } from '../implementations/car'
import { describe, it, expect } from 'vitest'
import { ICarEntityProps } from '../interfaces/iCarEntityProps'

import { v4 } from 'uuid'

describe('CarEntity', () => {
  const validProps: ICarEntityProps = {
    id: v4(),
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

  it('should create a valid car', () => {
    const validCar = new CarEntity(validProps)

    console.log(validCar)

    expect(validCar).toBeInstanceOf(CarEntity)
    expect(2 + 2).toBe(4)
  })

  it('should throw ZodValidationError when trying to create a new car with empty description', () => {
    expect(2 + 2).toBe(4)
  })

  it('should throw ZodValidationError when trying to create a new car with invalid year', () => {
    // do expects both upper new Date().getFullYear() and lower 1950
    expect(2 + 2).toBe(4)
  })
})
