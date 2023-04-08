import { faker } from '@faker-js/faker'
import { ReserveEntity } from '../implementations/reserve'
import { describe, it, expect } from 'vitest'
import { v4 } from 'uuid'
import { format } from 'date-fns'
import { IReserveEntityProps } from '../interfaces/iReserveEntityProps'

const formattedStartDate = format(new Date(), 'dd/MM/yyyy')

const millisecondsToday = new Date().getTime()
const milliseconds3Years = millisecondsToday + (1000 * 60 * 60 * 24 * 365)
const endDateBetween = faker.date.between(millisecondsToday, milliseconds3Years)
const formattedEndDate = format(endDateBetween, 'dd/MM/yyyy')

describe('ReserveEntity', () => {
  const validProps: IReserveEntityProps = {
    _id_user: v4(),
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    _id_car: v4(),
    final_value: faker.datatype.number({ min: 20, max: 1000000 })
  }

  it('should create a valid reserve', () => {
    const validReserve = new ReserveEntity(validProps)

    expect(validReserve).toBeInstanceOf(ReserveEntity)
  })

  it('should throw an error if at least 1 property is invalid', () => {
    const invalidReserve = () => {
      return new ReserveEntity({
        ...validProps,
        final_value: 10000000
      })
    }

    expect(invalidReserve).toThrowError()
  })
})
