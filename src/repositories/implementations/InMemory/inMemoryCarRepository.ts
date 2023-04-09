import { ICarRepository } from '../../interfaces/iCarRepository'
import { ICarEntityProps } from '../../../entities/interfaces/iCarEntityProps'

export class InMemoryCarRepository implements ICarRepository {
  cars: ICarEntityProps[] = []

  async save (car: ICarEntityProps): Promise<void> {
    this.cars.push(car)
  }

  async findByData (props: ICarEntityProps): Promise<ICarEntityProps> {
    const car = this.cars.find((c) => {
      return Object.keys(props).every((key) => {
        return c[key] === props[key]
      })
    })
    if (car) {
      return car
    } else {
      return null
    }
  }

  async updateById ({ _id, ...props }): Promise<ICarEntityProps> {
    const carIndex = this.cars.findIndex((c) => c._id === _id)

    if (carIndex >= 0) {
      this.cars[carIndex] = { _id, ...props }
      return this.cars[carIndex]
    } else {
      return null
    }
  }

  async deleteById (id: string): Promise<boolean> {
    const carIndex = this.cars.findIndex((c) => c._id === id)

    if (carIndex >= 0) {
      this.cars.splice(carIndex, 1)
      return true
    } else {
      return false
    }
  }

  async findByFilter (data: { page?: number; limit?: number } & ICarEntityProps): Promise<object> {
    let { limit, page, ...props } = data

    if (!limit) {
      limit = 10
    }
    if (!page) {
      page = 1
    }

    const offset = (page - 1) * limit

    const filteredCars = this.cars.filter((c) => {
      return Object.keys(props).every((key) => {
        return c[key] === props[key]
      })
    })

    const total = filteredCars.length
    const offsets = Math.ceil(total / limit)

    const cars = filteredCars.slice(offset, offset + limit).map((c) => {
      return c
    })

    return {
      cars,
      total,
      limit,
      offset,
      offsets
    }
  }
}
