import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { DeleteCarUseCase } from './deleteCarUseCase'
import { DeleteCarController } from './deleteCarController'
import { v4 } from 'uuid'
import { cars } from '../../../utils/fakeData/cars'
describe('DeleteCarFeature', () => {
  const validId = v4()

  let carRepository: InMemoryCarRepository
  let deleteCarUseCase: DeleteCarUseCase
  let deleteCarController: DeleteCarController

  beforeAll(() => {
    carRepository = new InMemoryCarRepository()
    deleteCarUseCase = new DeleteCarUseCase(carRepository)
    deleteCarController = new DeleteCarController(deleteCarUseCase)

    for (const car of cars) {
      carRepository.cars.push(car)
    }
    carRepository.cars.push({ ...cars[0], _id: validId })
  })

  it('should delete a car successfully and send status 204', async () => {
    const req: any = { params: { id: carRepository.cars[carRepository.cars.length - 1]._id } }
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }

    await deleteCarUseCase.execute(validId)
    await deleteCarController.handle(req, res)

    expect(async () => {
      return await deleteCarUseCase.execute(validId)
    }).not.toThrowError()

    expect(res.status).toHaveBeenCalledWith(204)
  })
})
