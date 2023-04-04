import { faker } from '@faker-js/faker'
import { CarEntity } from '../implementations/car'
import { describe, it, expect } from 'vitest'
import { ICarEntityProps } from '../validations/carSchemaValidator'
import { v4 } from 'uuid'

describe('CarEntity', () => {
  const validProps: ICarEntityProps = {
    id: v4(),
    model: faker.vehicle.vehicle(),
    color: faker.color.human(),
    year: faker.datatype.number({ min: 1950, max: (new Date()).getFullYear() }),
    value_per_day: faker.datatype.number({ min: 20, max: 10000 }),
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
    number_of_passengers: faker.datatype.number({ min: 2, max: 10 })
  }

  it('should create a valid car', () => {
    const validCar = new CarEntity(validProps)

    console.log(validCar)

    expect(validCar).toBeInstanceOf(CarEntity)
    expect(2 + 2).toBe(4)
  })
})
