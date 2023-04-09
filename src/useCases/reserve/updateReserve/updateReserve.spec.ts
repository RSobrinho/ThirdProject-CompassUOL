import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryReserveRepository } from '../../../repositories/implementations/InMemory/inMemoryReserveRepository'
import { UpdateReserveUseCase } from './updateReserveUseCase'
import { UpdateReserveController } from './updateReserveController'
import { v4 } from 'uuid'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
import { FakeEntities } from '../../../utils/FakeEntities'
describe('UpdateReserveFeature', () => {
  const validIds = [
    { _id: v4(), _id_car: v4(), _id_user: v4() },
    { _id: v4(), _id_car: v4(), _id_user: v4() },
    { _id: v4(), _id_car: v4(), _id_user: v4() }
  ]

  const propsToUpdate = {
    _id_car: validIds[0]._id_car
  }

  let updateReserveController: UpdateReserveController
  let updateReserveUseCase: UpdateReserveUseCase
  let reserveRepository: InMemoryReserveRepository
  let carRepository: InMemoryCarRepository
  let userRepository: InMemoryUserRepository
  let fakeEntities: FakeEntities

  beforeAll(() => {
    fakeEntities = new FakeEntities()
    userRepository = new InMemoryUserRepository()
    carRepository = new InMemoryCarRepository()
    reserveRepository = new InMemoryReserveRepository()
    updateReserveUseCase = new UpdateReserveUseCase(reserveRepository, userRepository, carRepository)
    updateReserveController = new UpdateReserveController(updateReserveUseCase)

    for (let i = 0; i < 3; i++) {
      userRepository.users.push(fakeEntities.user(validIds[i]._id_user))
      carRepository.cars.push(fakeEntities.car(validIds[i]._id_car))
      reserveRepository.reserves.push(fakeEntities.reserve(validIds[i]._id, validIds[i]._id_user, validIds[i]._id_car))
    }
  })

  it('should get reserve by id send response with status 200', async () => {
    const req: any = { params: { id: validIds[0]._id }, body: { _id_car: validIds[0]._id_car }, user: userRepository.users[0] }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await updateReserveController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
  })
})
