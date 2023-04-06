import { NotFoundError } from '../../../errors/notFoundError'
import { CarEntity } from '../../../entities/implementations/car'
import { ICarRepository } from '../../../repositories/interfaces/iCarRepository'
export class DeleteCarUseCase {
  constructor (private carRepository: ICarRepository) {}

  async execute (id: string): Promise<void> {
    const _ = new CarEntity({ _id: id })
    const deleted = await this.carRepository.deleteById(id)

    if (!deleted) {
      throw new NotFoundError('car with this id')
    }
  }
}
