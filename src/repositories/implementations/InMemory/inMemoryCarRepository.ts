import { CarEntity } from '../../../entities/implementations/car'
import { ICarRepository } from '../../interfaces/MongoDB/iCarRepository'

export class InMemoryCarRepository implements ICarRepository {
  private cars: CarEntity[]

  async save (user: CarEntity): Promise<void> {
    this.cars.push(user)
  }
}
