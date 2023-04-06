import { faker } from '@faker-js/faker'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { CarEntity } from '../../../entities/implementations/car'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { GetAllCarsUseCase } from './getAllCarsUseCase'
import { ValidationError } from '../../../errors/validationError'
import { GetAllCarsController } from './getAllCarsController'
import { GetAllCarsDTO } from './getAllCarsDTO'
import { cars } from '../../../utils/fakeData/cars'

describe('CreateCarFeature', () => {
  const validProps: GetAllCarsDTO = {
    page: `${faker.datatype.number({ min: 0, max: 5 })}`,
    limit: `${faker.datatype.number({ min: 0, max: 20 })}`,
    model: faker.vehicle.vehicle(),
    color: faker.color.human(),
    year: `${faker.datatype.number({ min: 1950, max: (new Date()).getFullYear() })}`,
    valuePerDay: `${faker.datatype.number({ min: 20, max: 10000 })}`,
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
    numberOfPassengers: `${faker.datatype.number({ min: 2, max: 10 })}`
  }

  let carRepository: InMemoryCarRepository
  let getAllCarsUseCase: GetAllCarsUseCase
  let getAllCarsController: GetAllCarsController

  beforeAll(() => {
    carRepository = new InMemoryCarRepository()
    getAllCarsUseCase = new GetAllCarsUseCase(carRepository)
    getAllCarsController = new GetAllCarsController(getAllCarsUseCase)
  })

  it('should get cars successfully based on filter and response status 200', async () => {
    const req: any = { query: {} }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    cars.forEach(async (car) => await carRepository.save(car))

    const dataReturn: any = await getAllCarsUseCase.execute({ page: validProps.page, limit: validProps.limit, model: 'Porsche Spyder' })

    await getAllCarsController.handle(req, res)

    expect(carRepository.cars).toHaveLength(16)
    expect(dataReturn.total).toBe(8)
    expect(dataReturn.offset).toBe((parseInt(validProps.page) - 1) * parseInt(validProps.limit))
    expect(dataReturn.offsets).toBe(Math.ceil(dataReturn.total / parseInt(validProps.limit)))
    expect(dataReturn.limit).toBe(parseInt(validProps.limit))
    expect(res.status).toHaveBeenCalledWith(200)
  })
})
