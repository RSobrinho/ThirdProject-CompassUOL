import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { GetCarUseCase } from './getCarUseCase'
import { GetCarController } from './getCarController'
import { v4 } from 'uuid'
import { cars } from '../../../utils/fakeData/cars'
describe('GetCarFeature', () => {
  const validId = v4()

  let carRepository: InMemoryCarRepository
  let getCarUseCase: GetCarUseCase
  let getCarController: GetCarController

  beforeAll(() => {
    carRepository = new InMemoryCarRepository()
    getCarUseCase = new GetCarUseCase(carRepository)
    getCarController = new GetCarController(getCarUseCase)

    for (const car of cars) {
      carRepository.cars.push(car)
    }
    carRepository.cars.push({ ...cars[0], _id: validId })
  })

  it('should get a car successfully and send status 200', async () => {
    const req: any = { params: { id: carRepository.cars[carRepository.cars.length - 1]._id } }
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }

    const car: any = await getCarUseCase.execute(validId)
    await getCarController.handle(req, res)

    expect(car._id).toEqual(validId)
    expect(async () => {
      return await getCarUseCase.execute(validId)
    }).not.toThrowError()

    expect(res.status).toHaveBeenCalledWith(200)
  })
})
