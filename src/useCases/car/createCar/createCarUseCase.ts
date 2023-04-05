import { CarEntity } from '../../../entities/implementations/car'
import { ICarEntityProps } from '../../../entities/interfaces/iCarEntityProps'
import { ValidationError } from '../../../errors/validationError'
import { ICarRepository } from '../../../repositories/interfaces/MongoDB/iCarRepository'
import { createCarDTO } from './createCarDTO'
export class CreateCarUseCase {
  constructor (private carRepository: ICarRepository) {}

  async execute ({ model, color, year, valuePerDay, accessories, numberOfPassengers }: createCarDTO): Promise<CarEntity> {
    const newCar = new CarEntity({ model, color, year, valuePerDay, accessories, numberOfPassengers })

    for (let i = 0; i < accessories.length; i++) {
      for (let j = 0; j < accessories.length; j++) {
        if (accessories[i].description === accessories[j].description) {
          throw new ValidationError('ValidationError')
        }
      }
    }

    await this.carRepository.save(newCar)

    return newCar
  }
}
