import { NotFoundError } from '../../../errors/notFoundError'
import { ReserveEntity } from '../../../entities/implementations/reserve'
import { IReserveRepository } from '../../../repositories/interfaces/iReserveRepository'
import { GetReserveDTO } from './getReserveDTO'
export class GetReserveUseCase {
  constructor (private reserveRepository: IReserveRepository) {}

  async execute ({ _id }: GetReserveDTO): Promise<object> {
    const _ = new ReserveEntity({ _id })
    const reserve = await this.reserveRepository.findByData({ _id })

    if (!reserve) {
      throw new NotFoundError('reserve with this id')
    }

    return reserve
  }
}
