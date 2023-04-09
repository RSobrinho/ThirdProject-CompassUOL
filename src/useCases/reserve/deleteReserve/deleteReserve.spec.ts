import { describe, it, expect, vi, beforeAll } from 'vitest'
import { InMemoryReserveRepository } from '../../../repositories/implementations/InMemory/inMemoryReserveRepository'
import { DeleteReserveUseCase } from './deleteReserveUseCase'
import { DeleteReserveController } from './deleteReserveController'
import { v4 } from 'uuid'
import { FakeEntities } from '../../../utils/FakeEntities'
import { InMemoryUserRepository } from '../../../repositories/implementations/InMemory/inMemoryUserRepository'
import { InMemoryCarRepository } from '../../../repositories/implementations/InMemory/inMemoryCarRepository'
describe('DeleteReserveFeature', () => {
  const validIds = [
    { _id: v4(), _id_car: v4(), _id_user: v4() },
    { _id: v4(), _id_car: v4(), _id_user: v4() },
    { _id: v4(), _id_car: v4(), _id_user: v4() }
  ]

  let deleteReserveController: DeleteReserveController
  let deleteReserveUseCase: DeleteReserveUseCase
  let reserveRepository: InMemoryReserveRepository
  let carRepository: InMemoryCarRepository
  let userRepository: InMemoryUserRepository
  let fakeEntities: FakeEntities

  beforeAll(() => {
    fakeEntities = new FakeEntities()
    userRepository = new InMemoryUserRepository()
    carRepository = new InMemoryCarRepository()
    reserveRepository = new InMemoryReserveRepository()
    deleteReserveUseCase = new DeleteReserveUseCase(reserveRepository)
    deleteReserveController = new DeleteReserveController(deleteReserveUseCase)

    for (let i = 0; i < 3; i++) {
      userRepository.users.push(fakeEntities.user(validIds[i]._id_user))
      carRepository.cars.push(fakeEntities.car(validIds[i]._id_car))
      reserveRepository.reserves.push(fakeEntities.reserve(validIds[i]._id))
    }
  })

  it('should delete a reserve successfully and send response with status 204', async () => {
    const req: any = { params: { id: validIds[0]._id } }
    const res: any = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis()
    }

    await deleteReserveController.handle(req, res)

    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(204)
  })
})
