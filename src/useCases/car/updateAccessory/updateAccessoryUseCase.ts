/* eslint-disable camelcase */
import { NotFoundError } from '../../../errors/notFoundError'
import { CarEntity } from '../../../entities/implementations/car'
import { ICarRepository } from '../../../repositories/interfaces/iCarRepository'
import { UpdateAccessoryDTO } from './updateAccessoryDTO'
import { ValidationError } from '../../../errors/validationError'
export class UpdateAccessoryUseCase {
  constructor (private carRepository: ICarRepository) {}

  async execute ({ _id_car, _id_accessory, description }: UpdateAccessoryDTO): Promise<object> {
    const accessoryToUpdate = [{ _id: _id_accessory, description }]
    const _ = new CarEntity({ _id: _id_car, accessories: accessoryToUpdate })

    const carToUpdate: any = await this.carRepository.findByData({ _id: _id_car })

    if (!carToUpdate) {
      throw new NotFoundError('car with this id')
    }

    let existenceAccessoryId = false
    let deleted = false

    for (let i = 0; i < carToUpdate.accessories.length; i++) {
      if (carToUpdate.accessories[i]._id === _id_accessory) {
        existenceAccessoryId = true

        carToUpdate.accessories[i].description = description

        if (carToUpdate.accessories[i].description === description) {
          carToUpdate.accessories.splice(i, 1)
          deleted = true
        }
        break
      }
    }

    if (!deleted) {
      if (!existenceAccessoryId) {
        throw new NotFoundError('accesory_id related to this car')
      }

      for (let i = 0; i < carToUpdate.accessories.length; i++) {
        for (let j = 0; j < carToUpdate.accessories.length; j++) {
          if (carToUpdate.accessories[i].description === carToUpdate.accessories[j].description && i !== j) {
            throw new ValidationError('ValidationError -> Accessories cannot be equal')
          }
        }
      }
    }

    const carWithUpdatedAccessory = await this.carRepository.updateById({ _id: carToUpdate._id, accessories: carToUpdate.accessories })

    return carWithUpdatedAccessory
  }
}
