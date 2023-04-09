/* eslint-disable camelcase */
import { faker } from '@faker-js/faker'
import { v4 } from 'uuid'
import { extraFeatures } from './ExtraFeatures'
import { IUserEntityProps } from '../entities/interfaces/iUserEntityProps'
import { format } from 'date-fns'
import { IReserveEntityProps } from '../entities/interfaces/iReserveEntityProps'
import { ICarEntityProps } from '../entities/interfaces/iCarEntityProps'

export class FakeEntities {
  user (_id?: string, email?: string, password?: string, cpf?: string) {
    const fakeBirth = faker.date.between('1970-01-01', `${new Date().getFullYear() - 18}-01-01`)
    // const fakeFormattedBirth = format(fakeBirth, 'dd/MM/yyyy')

    const fakeUser: IUserEntityProps = {
      _id: _id || v4(),
      name: faker.name.fullName(),
      cpf: cpf || extraFeatures.generateCPF() || '077.998.461-78',
      birth: fakeBirth,
      email: email || faker.internet.email(),
      password: password || faker.internet.password(6),
      cep: faker.random.numeric(8),
      qualified: 'yes', // faker.helpers.arrayElement(['yes', 'no']),
      patio: faker.address.street(),
      complement: faker.address.secondaryAddress(),
      neighborhood: faker.address.street(),
      locality: faker.address.city(),
      uf: extraFeatures.generateBrasilianState() || 'MS'
    }

    return fakeUser
  }

  car (_id?: string) {
    const fakeCar: ICarEntityProps = {
      _id: _id || v4(),
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
    return fakeCar
  }

  reserve (_id?: string, _id_user?: string, _id_car?: string) {
    const fakeStartDate = new Date()
    fakeStartDate.setHours(0, 0, 0, 0)
    const fakeEndDate = new Date(fakeStartDate.getTime() + 1000 * 60 * 60 * 24 * 365).setHours(0, 0, 0, 0)

    const fakeEndDateBetween = faker.date.between(fakeStartDate, fakeEndDate)
    const fakeStartDateBetween = faker.date.between(fakeStartDate, fakeEndDateBetween)

    const fakeFormattedStartDate = format(fakeStartDateBetween, 'dd/MM/yyyy')
    const fakeFormattedEndDate = format(fakeEndDateBetween, 'dd/MM/yyyy')

    const fakeReserve: IReserveEntityProps = {
      _id: _id || v4(),
      _id_user: _id_user || v4(),
      _id_car: _id_car || v4(),
      start_date: fakeStartDateBetween,
      end_date: fakeEndDateBetween,
      final_value: faker.datatype.number()
    }
    return fakeReserve
  }
}
