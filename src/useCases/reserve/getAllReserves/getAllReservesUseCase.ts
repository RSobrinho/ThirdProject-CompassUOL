import { IReserveRepository } from '../../../repositories/interfaces/iReserveRepository'
import { GetAllReservesDTO } from './getAllReservesDTO'

export class GetAllReservesUseCase {
  constructor (private reserveRepository: IReserveRepository) {}

  async execute (props: GetAllReservesDTO): Promise<object> {
    const definedProps = {}

    for (const key in props) {
      if (props[key]) {
        definedProps[key] = props[key]
      }
    }

    return await this.reserveRepository.findByFilter(definedProps)
  }
}
