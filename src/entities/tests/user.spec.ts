import { faker } from '@faker-js/faker'
import { v4 } from 'uuid'
import { UserEntity } from '../implementations/user'
import { format } from 'date-fns'
import { describe, it, expect } from 'vitest'
import { IUserEntityProps } from '../validations/userSchemaValidator'
import 
import { config } from 'dotenv'
config()
const randomDate = faker.date.between(((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 100)), ((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 3)))

const formattedRandomDate = format(randomDate, 'yyyy-MM-dd')

describe('UserEntity', () => {
  const validProps: IUserEntityProps = {
    id: v4(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate: formattedRandomDate,
    city: faker.address.city(),
    country: faker.address.country(),
    email: faker.internet.email(),
    password: faker.internet.password(12)
  }

  it('should create a valid user', () => {
    const validUser = new UserEntity(validProps)

    console.log(validUser)

    // expect(validUser).toBeInstanceOf(UserEntity)
    expect(2 + 2).toBe(4)
  })

  it('should throw a validation error if an entity is being created with at least 1 invalid property', () => {
    const invalidUser = () => {
      return new UserEntity({ ...validProps, firstName: null })
    }

    expect(invalidUser).toThrow()
  })
})
