// import { describe, it, expect, vi, beforeAll } from 'vitest'
// import { InMemoryReserveRepository } from '../../../repositories/implementations/InMemory/inMemoryReserveRepository'
// import { DeleteReserveUseCase } from './deleteReserveUseCase'
// import { DeleteReserveController } from './deleteReserveController'
// import { v4 } from 'uuid'
// import { reserves } from '../../../utils/fakeData/reserves'
// describe('DeleteReserveFeature', () => {
//   const validId = v4()

//   let reserveRepository: InMemoryReserveRepository
//   let deleteReserveUseCase: DeleteReserveUseCase
//   let deleteReserveController: DeleteReserveController

//   beforeAll(() => {
//     reserveRepository = new InMemoryReserveRepository()
//     deleteReserveUseCase = new DeleteReserveUseCase(reserveRepository)
//     deleteReserveController = new DeleteReserveController(deleteReserveUseCase)

//     for (const reserve of reserves) {
//       reserveRepository.reserves.push(reserve)
//     }
//     reserveRepository.reserves.push({ ...reserves[0], _id: validId })
//   })

//   it('should delete a reserve successfully and send status 204', async () => {
//     const req: any = { params: { id: reserveRepository.reserves[reserveRepository.reserves.length - 1]._id } }
//     const res: any = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn().mockReturnThis()
//     }

//     await deleteReserveUseCase.execute(validId)
//     await deleteReserveController.handle(req, res)

//     expect(async () => {
//       return await deleteReserveUseCase.execute(validId)
//     }).not.toThrowError()

//     expect(res.status).toHaveBeenCalledWith(204)
//   })
// })
