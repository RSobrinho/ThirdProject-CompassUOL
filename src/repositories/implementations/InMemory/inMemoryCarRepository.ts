import { ICarEntityProps } from 'entities/interfaces/iCarEntityProps'
import { CarEntity } from '../../../entities/implementations/car'
import { ICarRepository } from '../../interfaces/iCarRepository'

export class InMemoryCarRepository implements ICarRepository {
  public cars: ICarEntityProps[] = []

  async save (car: CarEntity): Promise<void> {
    this.cars.push(car)
  }

  async deleteById (id: string): Promise<boolean> {
    const car = this.getById(id)

    // if(Object.keys(car).length === 0) {
    //   return false
    // } else {
    //   return true
    // }
    for (let index = 0; index < this.cars.length; index++) {
      const car = this.cars[index]

      // eslint-disable-next-line eqeqeq
      if (car._id == id) {
        this.cars = this.cars.splice(index, 1)
        return true
      }
    }
    return false
  }

  async getById (id: string): Promise<object> {
    for (let index = 0; index < this.cars.length; index++) {
      const car = this.cars[index]

      // eslint-disable-next-line eqeqeq
      if (car._id == id) {
        return car
      }
    }
    return {}
  }

  async updateById ({ _id, ...props }): Promise<object> {
    if (Object.keys(props).length === 0) {
      return {}
    } else {
      const index = this.cars.findIndex(car => car._id === _id)

      this.cars[index] = props
      return this.cars[index]
    }
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
