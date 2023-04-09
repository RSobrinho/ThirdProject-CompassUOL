import { faker } from '@faker-js/faker'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ReserveEntity } from '../../../entities/implementations/reserve'
import { InMemoryReserveRepository } from '../../../repositories/implementations/InMemory/inMemoryReserveRepository'
import { CreateReserveUseCase } from './createReserveUseCase'
import { CreateReserveController } from './createReserveController'
import { format } from 'date-fns'
import { v4 } from 'uuid'
import { IReserveEntityProps } from '../../../entities/interfaces/iReserveEntityProps'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
import { extraFeatures } from '../../../utils/ExtraFeatures'
import { IUserEntityProps } from 'entities/interfaces/iUserEntityProps'
import { ICarEntityProps } from 'entities/interfaces/iCarEntityProps'

describe('CreateReserveFeature', () => {
  const randomDate = faker.date.between(((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 100)), ((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 3)))

  const formattedRandomDate = format(randomDate, 'yyyy-MM-dd')

  const validUserProps: IUserEntityProps = {
    name: faker.name.fullName(),
    cpf: extraFeatures.generateCPF() || '077.998.461-78',
    birth: formattedRandomDate || '03/07/2004',
    email: faker.internet.email(),
    password: faker.internet.password(6),
    cep: faker.random.numeric(8),
    qualified: 'yes', // faker.helpers.arrayElement(['yes', 'no']),
    patio: faker.address.street(),
    complement: faker.address.secondaryAddress(),
    neighborhood: faker.address.street(),
    locality: faker.address.city(),
    uf: extraFeatures.generateBrasilianState() || 'MS'
  }

  const validCarProps: ICarEntityProps = {
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

  const validIds = {
    _id: v4(),
    _id_car: v4(),
    _id_user: v4()
  }

  const formattedStartDate = format(new Date(), 'dd/MM/yyyy')
  const millisecondsToday = new Date().getTime()
  const milliseconds3Years = millisecondsToday + (1000 * 60 * 60 * 24 * 365)
  const endDateBetween = faker.date.between(millisecondsToday, milliseconds3Years)
  const formattedEndDate = format(endDateBetween, 'dd/MM/yyyy')

  const validProps: IReserveEntityProps = {
    _id_car: validIds._id_car,
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    final_value: faker.datatype.number({ min: 20, max: 1000000 })
  }

  let reserveRepository: InMemoryReserveRepository
  let carRepository: InMemoryCarRepository
  let userRepository: InMemoryUserRepository
  let createReserveUseCase: CreateReserveUseCase
  let createReserveController: CreateReserveController

  beforeEach(() => {
    reserveRepository = new InMemoryReserveRepository()
    carRepository = new InMemoryCarRepository()
    userRepository = new InMemoryUserRepository()
    createReserveUseCase = new CreateReserveUseCase(reserveRepository, carRepository, userRepository)
    createReserveController = new CreateReserveController(createReserveUseCase)

    carRepository.cars.push({ ...validCarProps, _id: validIds._id_car })
    userRepository.users.push({ ...validUserProps, _id: validIds._id_user })
  })

  it('should create a reserve successfully and send response with status 201', async () => {
    const req: any = { body: validProps, user: { ...validUserProps, _id: validIds._id_user } }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await createReserveController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)

    const createdReserve = res.json.mock.calls[0][0].newReserve
    const savedReserve = await reserveRepository.reserves[0]
    expect(savedReserve).toEqual(createdReserve)
  })

  it('should return a valid reserve after createReserveUseCase execution', async () => {
    const reserve = await createReserveUseCase.execute({ start_date: validProps.start_date, end_date: validProps.end_date, _id_user: validIds._id_user, _id_car: validIds._id_car })

    expect(reserve).toBeInstanceOf(ReserveEntity)
    expect(reserveRepository.reserves).toContain(reserve)
  })
})
