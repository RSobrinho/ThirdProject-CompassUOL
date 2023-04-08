import { NotFoundError } from '../../../errors/notFoundError'
import { CarEntity } from '../../../entities/implementations/car'
import { ICarRepository } from '../../../repositories/interfaces/iCarRepository'
export class GetCarUseCase {
  constructor (private carRepository: ICarRepository) {}

  async execute (id: string): Promise<object> {
    const _ = new CarEntity({ _id: id })
    const car = await this.carRepository.findByData({ _id: id })

    if (!car) {
      throw new NotFoundError('car with this id')
    }

    return car
  }
}
