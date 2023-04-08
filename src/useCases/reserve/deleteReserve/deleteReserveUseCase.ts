import { NotFoundError } from '../../../errors/notFoundError'
import { ReserveEntity } from '../../../entities/implementations/reserve'
import { IReserveRepository } from '../../../repositories/interfaces/iReserveRepository'
export class DeleteReserveUseCase {
  constructor (private reserveRepository: IReserveRepository) {}

  async execute (id: string): Promise<void> {
    const _ = new ReserveEntity({ _id: id })
    const deleted = await this.reserveRepository.deleteById(id)

    if (!deleted) {
      throw new NotFoundError('reserve with this id')
    }
  }
}
