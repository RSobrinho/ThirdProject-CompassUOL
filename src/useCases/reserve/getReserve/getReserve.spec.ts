// import { describe, it, expect, vi, beforeAll } from 'vitest'
// import { InMemoryReserveRepository } from '../../../repositories/implementations/InMemory/inMemoryReserveRepository'
// import { GetReserveUseCase } from './getReserveUseCase'
// import { GetReserveController } from './getReserveController'
// import { v4 } from 'uuid'
// import { reserves } from '../../../utils/fakeData/reserves'
// describe('GetReserveFeature', () => {
//   const validId = v4()

//   let reserveRepository: InMemoryReserveRepository
//   let getReserveUseCase: GetReserveUseCase
//   let getReserveController: GetReserveController

//   beforeAll(() => {
//     reserveRepository = new InMemoryReserveRepository()
//     getReserveUseCase = new GetReserveUseCase(reserveRepository)
//     getReserveController = new GetReserveController(getReserveUseCase)

//     for (const reserve of reserves) {
//       reserveRepository.reserves.push(reserve)
//     }
//     reserveRepository.reserves.push({ ...reserves[0], _id: validId })
//   })

//   it('should get a reserve successfully and send status 200', async () => {
//     const req: any = { params: { id: reserveRepository.reserves[reserveRepository.reserves.length - 1]._id } }
//     const res: any = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn().mockReturnThis()
//     }

//     const reserve: any = await getReserveUseCase.execute(validId)
//     await getReserveController.handle(req, res)

//     expect(reserve._id).toEqual(validId)
//     expect(async () => {
//       return await getReserveUseCase.execute(validId)
//     }).not.toThrowError()

//     expect(res.status).toHaveBeenCalledWith(200)
//   })
// })
