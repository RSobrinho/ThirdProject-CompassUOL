import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryReserveRepository } from '../../../repositories/implementations/InMemory/inMemoryReserveRepository'
import { GetReserveUseCase } from './getReserveUseCase'
import { GetReserveController } from './getReserveController'
import { v4 } from 'uuid'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
import { FakeEntities } from '../../../utils/FakeEntities'
describe('GetReserveFeature', () => {
  const validIds = [
    { _id: v4(), _id_car: v4(), _id_user: v4() },
    { _id: v4(), _id_car: v4(), _id_user: v4() },
    { _id: v4(), _id_car: v4(), _id_user: v4() }
  ]

  let getReserveController: GetReserveController
  let getReserveUseCase: GetReserveUseCase
  let reserveRepository: InMemoryReserveRepository
  let carRepository: InMemoryCarRepository
  let userRepository: InMemoryUserRepository
  let fakeEntities: FakeEntities

  beforeAll(() => {
    fakeEntities = new FakeEntities()
    userRepository = new InMemoryUserRepository()
    carRepository = new InMemoryCarRepository()
    reserveRepository = new InMemoryReserveRepository()
    getReserveUseCase = new GetReserveUseCase(reserveRepository)
    getReserveController = new GetReserveController(getReserveUseCase)

    for (let i = 0; i < 3; i++) {
      userRepository.users.push(fakeEntities.user(validIds[i]._id_user))
      carRepository.cars.push(fakeEntities.car(validIds[i]._id_car))
      reserveRepository.reserves.push(fakeEntities.reserve(validIds[i]._id))
    }
  })
  it('should get reserve by id send response with status 200', async () => {
    const req: any = { params: { id: validIds[0]._id } }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await getReserveController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return a list of reserves after getReserveUseCase execution', async () => {
    const car = await getReserveUseCase.execute(validIds[0])
    expect(reserveRepository.reserves).toContain(car)
    expect(reserveRepository.reserves.length).toBe(3)
  })
})
