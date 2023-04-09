import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryReserveRepository } from '../../../repositories/implementations/InMemory/inMemoryReserveRepository'
import { GetAllReservesUseCase } from './getAllReservesUseCase'
import { GetAllReservesController } from './getAllReservesController'
import { v4 } from 'uuid'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
import { FakeEntities } from '../../../utils/FakeEntities'
describe('GetAllReservesFeature', () => {
  const validIds = [
    { _id: v4(), _id_car: v4(), _id_user: v4() },
    { _id: v4(), _id_car: v4(), _id_user: v4() },
    { _id: v4(), _id_car: v4(), _id_user: v4() }
  ]

  let getAllReservesController: GetAllReservesController
  let getAllReservesUseCase: GetAllReservesUseCase
  let reserveRepository: InMemoryReserveRepository
  let carRepository: InMemoryCarRepository
  let userRepository: InMemoryUserRepository
  let fakeEntities: FakeEntities

  beforeAll(() => {
    fakeEntities = new FakeEntities()
    userRepository = new InMemoryUserRepository()
    carRepository = new InMemoryCarRepository()
    reserveRepository = new InMemoryReserveRepository()
    getAllReservesUseCase = new GetAllReservesUseCase(reserveRepository)
    getAllReservesController = new GetAllReservesController(getAllReservesUseCase)

    for (let i = 0; i < 3; i++) {
      userRepository.users.push(fakeEntities.user(validIds[i]._id_user))
      carRepository.cars.push(fakeEntities.car(validIds[i]._id_car))
      reserveRepository.reserves.push(fakeEntities.reserve(validIds[i]._id))
    }
  })

  it('should get all reserves without any query filter, based on any query filter a reserve successfully and send response with status 200', async () => {
    const req: any = {}
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await getAllReservesController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return a list of reserves after getAllReservesUseCase execution', async () => {
    await getAllReservesUseCase.execute({})
    expect(reserveRepository.reserves.length).toBe(3)
  })
})
