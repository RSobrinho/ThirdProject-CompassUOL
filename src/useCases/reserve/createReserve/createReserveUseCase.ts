import { ReserveEntity } from '../../../entities/implementations/reserve'
import { IReserveRepository } from '../../../repositories/interfaces/iReserveRepository'
import { createReserveDTO } from './createReserveDTO'
import { ICarRepository } from '../../../repositories/interfaces/iCarRepository'
import { NotFoundError } from '../../../errors/notFoundError'
import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { ValidationError } from '../../../errors/validationError'
import { AlreadyOnBaseError } from '../../../errors/alreadyOnBaseError'

export class CreateReserveUseCase {
  constructor (private reserveRepository: IReserveRepository, private carRepository: ICarRepository, private userRepository: IUserRepository) {}

  async execute ({ startDate, endDate, idUser, idCar }: createReserveDTO): Promise<ReserveEntity> {
    const newReserve = new ReserveEntity({ startDate, endDate, idUser, idCar })
    const user = await this.userRepository.findByData({ _id: idUser })
    const car = await this.carRepository.findByData({ _id: idCar })

    // user validations
    if (!user) {
      throw new NotFoundError('user')
    } else if (user.qualified === 'no') {
      throw new ValidationError('ValidationError -> User not qualified to reserve a car')
    }

    // car validations
    if (!car) {
      throw new NotFoundError('car')
    }

    // startDate and endDate validations
    if (newReserve.startDate >= newReserve.endDate) {
      throw new ValidationError('ValidationError -> startDate cannot be after or equal endDate')
    }

    // finalValue of newReserve validations
    const diff = Math.abs((newReserve.startDate as Date).getTime() - (newReserve.endDate as Date).getTime())
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    newReserve.finalValue = car.valuePerDay * days
    if (days > 365) {
      throw new ValidationError('ValidationError -> Days of reserve cannot surpass 1 year')
    }

    // reserve validations
    const reserves = await this.reserveRepository.findByRange(newReserve.startDate as Date, newReserve.endDate as Date)

    if (reserves) {
      for (let i = 0; i < reserves.length; i++) {
        if (reserves[i].idCar === idCar) {
          throw new AlreadyOnBaseError('reserve with the same car inside this range data')
        } else if (reserves[i].idUser === idUser) {
          throw new AlreadyOnBaseError('reserve with the same user inside this range data')
        }
      }
    }

    await this.reserveRepository.save(newReserve)

    return newReserve
  }
}
