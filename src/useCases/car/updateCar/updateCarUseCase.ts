import { NotFoundError } from '../../../errors/notFoundError'
import { CarEntity } from '../../../entities/implementations/car'
import { ICarRepository } from '../../../repositories/interfaces/iCarRepository'
import { UpdateCarDTO } from './updateCarDTO'
import { ValidationError } from '../../../errors/validationError'
import { IReserveRepository } from '../../../repositories/interfaces/iReserveRepository'
import { IUserEntityProps } from 'entities/interfaces/iUserEntityProps'
export class UpdateCarUseCase {
  constructor (private carRepository: ICarRepository, private reserveRepository: IReserveRepository) {}

  async execute (props: UpdateCarDTO): Promise<object> {
    const carToUpdate = new CarEntity(props)

    if (props.accessories) {
      for (let i = 0; i < props.accessories.length; i++) {
        for (let j = 0; j < props.accessories.length; j++) {
          if (props.accessories[i].description === props.accessories[j].description && i !== j) {
            throw new ValidationError('ValidationError -> Accessories cannot be equal')
          }
        }
      }
    }

    const car = await this.carRepository.findByData({ _id: carToUpdate._id })

    if (!car) {
      throw new NotFoundError('car with this id')
    }
    const updatedCar = await this.carRepository.updateById(carToUpdate)
    return updatedCar
  }
}
