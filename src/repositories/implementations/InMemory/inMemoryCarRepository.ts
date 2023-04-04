import { CarEntity } from '../../../entities/implementations/car'
import { ICarRepository } from '../../interfaces/MongoDB/iCarRepository'

export class InMemoryUserRepository implements ICarRepository {
  private cars: CarEntity[]

  async save (user: CarEntity) {
    this.cars.push(user)
  }
}
