import { ICarEntityProps } from 'entities/interfaces/iCarEntityProps'
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

  async findByFilter ({ limit = 10, page = 1, ...data }: {limit?: number, page?: number, data?: ICarEntityProps}): Promise<object> {
    const props = { ...data }

    const filteredCars = this.cars.filter((car) => {
      for (const [key, value] of Object.entries(props)) {
        if (car[key] !== value) {
          return false
        }
      }
      return true
    })

    const total = filteredCars.length
    const offsets = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const cars = filteredCars.slice(offset, offset + limit)

    return {
      cars,
      total,
      limit,
      offset,
      offsets
    }
  }
}
