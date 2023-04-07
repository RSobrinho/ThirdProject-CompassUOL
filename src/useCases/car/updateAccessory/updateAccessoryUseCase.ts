import { NotFoundError } from '../../../errors/notFoundError'
import { CarEntity } from '../../../entities/implementations/car'
import { ICarRepository } from '../../../repositories/interfaces/iCarRepository'
import { UpdateAccessoryDTO } from './updateAccessoryDTO'
import { ValidationError } from '../../../errors/validationError'
export class UpdateAccessoryUseCase {
  constructor (private carRepository: ICarRepository) {}

  async execute ({ _idCar, _idAccessory, description }: UpdateAccessoryDTO): Promise<object> {
    const accessoryToUpdate = [{ _id: _idAccessory, description }]
    const _ = new CarEntity({ _id: _idCar, accessories: accessoryToUpdate })

    const carToUpdate: any = await this.carRepository.getById(_idCar)

    if (!carToUpdate) {
      throw new NotFoundError('car with this id')
    }

    let existenceAccessoryId = false

    for (let i = 0; i < carToUpdate.accessories.length; i++) {
      if (carToUpdate.accessories[i]._id === _idAccessory) {
        if (carToUpdate.accessories[i].description === description) {
          // deletar o tal acessorio ao inves de jogar esse erro
          throw new ValidationError('ValidationError -> Cannot update description because they are already the same')
        }
        carToUpdate.accessories[i].description = description
        existenceAccessoryId = true
      }
    }

    if (!existenceAccessoryId) {
      throw new NotFoundError('accesoryId related to this car')
    }

    for (let i = 0; i < carToUpdate.accessories.length; i++) {
      for (let j = 0; j < carToUpdate.accessories.length; j++) {
        if (carToUpdate.accessories[i].description === carToUpdate.accessories[j].description && i !== j) {
          throw new ValidationError('ValidationError -> Accessories cannot be equal')
        }
      }
    }

    const carWithUpdatedAccessory = await this.carRepository.updateById({ _id: carToUpdate._id, accessories: carToUpdate.accessories })

    return carWithUpdatedAccessory
  }
}
