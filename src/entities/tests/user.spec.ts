import { faker } from '@faker-js/faker'
import { UserEntity } from '../implementations/user'
import { format } from 'date-fns'
import { describe, it, expect } from 'vitest'
import { extraFeatures } from '../../utils/ExtraFeatures'
import { IUserEntityProps } from '../interfaces/iUserEntityProps'

const randomDate = faker.date.between(((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 100)), ((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 3)))

const formattedRandomDate = format(randomDate, 'yyyy-MM-dd')

describe('UserEntity', () => {
  const validProps: IUserEntityProps = {
    name: faker.name.fullName(),
    cpf: extraFeatures.generateCPF(),
    birth: formattedRandomDate,
    email: faker.internet.email(),
    password: faker.internet.password(6),
    cep: faker.random.numeric(8),
    qualified: faker.helpers.arrayElement(['yes', 'no']),
    patio: faker.address.street(),
    complement: faker.address.secondaryAddress(),
    neighborhood: faker.address.street(),
    locality: faker.address.city(),
    uf: extraFeatures.generateBrasilianState() || 'MS'
  }

  it('should create a valid user', () => {
    const validUser = new UserEntity(validProps)

    expect(validUser).toBeInstanceOf(UserEntity)
  })

  it('should throw an error if at least 1 property is invalid', () => {
    const invalidUser = () => {
      return new UserEntity({
        ...validProps,
        cpf: '000.000.000-11'
      })
    }

    expect(invalidUser).toThrowError()
  })
})
