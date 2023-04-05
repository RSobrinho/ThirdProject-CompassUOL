import { CarEntity } from '../../../entities/implementations/car'
import { ICarRepository } from '../../interfaces/iCarRepository'

export class InMemoryCarRepository implements ICarRepository {
  public cars: CarEntity[] = []

  async save (car: CarEntity): Promise<void> {
    this.cars.push(car)
  }

  async findById (_id: string): Promise<object> {
    this.cars.forEach(car => {
      if (car.id === _id) {
        return car
      }
    })
    return {}
  }
}
