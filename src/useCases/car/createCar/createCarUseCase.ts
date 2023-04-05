import { CarEntity } from '../../../entities/implementations/car'
import { ValidationError } from '../../../errors/validationError'
import { ICarRepository } from '../../../repositories/interfaces/iCarRepository'
import { createCarDTO } from './createCarDTO'
export class CreateCarUseCase {
  constructor (private carRepository: ICarRepository) {}

  async execute ({ model, color, year, valuePerDay, accessories, numberOfPassengers }: createCarDTO): Promise<CarEntity> {
    const newCar = new CarEntity({ model, color, year, valuePerDay, accessories, numberOfPassengers })

    for (let i = 0; i < accessories.length; i++) {
      for (let j = 0; j < accessories.length; j++) {
        if (accessories[i].description === accessories[j].description && i !== j) {
          throw new ValidationError('ValidationError -> Accessories cannot be equal')
        }
      }
    }

    await this.carRepository.save(newCar)
    return newCar
  }
}
