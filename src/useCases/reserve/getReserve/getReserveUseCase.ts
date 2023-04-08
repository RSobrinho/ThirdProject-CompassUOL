import { NotFoundError } from '../../../errors/notFoundError'
import { ReserveEntity } from '../../../entities/implementations/reserve'
import { IReserveRepository } from '../../../repositories/interfaces/iReserveRepository'
export class GetReserveUseCase {
  constructor (private reserveRepository: IReserveRepository) {}

  async execute (id: string): Promise<object> {
    const _ = new ReserveEntity({ _id: id })
    const reserve = await this.reserveRepository.getById(id)

    if (!reserve) {
      throw new NotFoundError('reserve with this id')
    }

    return reserve
  }
}
