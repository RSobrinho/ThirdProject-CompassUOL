import { NotFoundError } from '../../../errors/notFoundError'
import { CarEntity } from '../../../entities/implementations/car'
import { ICarRepository } from '../../../repositories/interfaces/iCarRepository'
import { UpdateCarDTO } from './updateCarDTO'
import { ValidationError } from '../../../errors/validationError'
export class UpdateCarUseCase {
  constructor (private carRepository: ICarRepository) {}

  async execute (props: UpdateCarDTO): Promise<object> {
    const updatedCar = new CarEntity(props)

    if (props.accessories) {
      for (let i = 0; i < props.accessories.length; i++) {
        for (let j = 0; j < props.accessories.length; j++) {
          if (props.accessories[i].description === props.accessories[j].description && i !== j) {
            throw new ValidationError('ValidationError -> Accessories cannot be equal')
          }
        }
      }
    }

    const car = await this.carRepository.updateById(updatedCar)

    if (!car) {
      throw new NotFoundError('car with this id')
    }

    return car
  }
}
