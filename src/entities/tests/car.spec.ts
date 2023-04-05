import { faker } from '@faker-js/faker'
import { CarEntity } from '../implementations/car'
import { describe, it, expect } from 'vitest'
import { ICarEntityProps } from '../interfaces/iCarEntityProps'

describe('CarEntity', () => {
  const validProps: ICarEntityProps = {
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
    expect(new CarEntity(validProps)).toBeInstanceOf(CarEntity)
  })

  it('should throw an error if at least 1 property is invalid', () => {
    const invalidCar = () => {
      return new CarEntity({
        ...validProps,
        numberOfPassengers: 0
      })
    }

    expect(invalidCar).toThrowError()
  })
})
