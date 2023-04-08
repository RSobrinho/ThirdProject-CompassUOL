/* eslint-disable camelcase */
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

  async execute ({ start_date, end_date, _id_user, _id_car }: createReserveDTO): Promise<ReserveEntity> {
    const newReserve = new ReserveEntity({ start_date, end_date, _id_user, _id_car })
    const user = await this.userRepository.findByData({ _id: _id_user })
    const car = await this.carRepository.findByData({ _id: _id_car })

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

    // start_date and end_date validations
    if (newReserve.start_date >= newReserve.end_date) {
      throw new ValidationError('ValidationError -> start_date cannot be after or equal end_date')
    }

    // final_value of newReserve validations
    const diff = Math.abs((newReserve.start_date as Date).getTime() - (newReserve.end_date as Date).getTime())
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    newReserve.final_value = car.value_per_day * days
    if (days > 365) {
      throw new ValidationError('ValidationError -> Days of reserve cannot surpass 1 year')
    }

    // reserve validations
    const reserves = await this.reserveRepository.findByRange(newReserve.start_date as Date, newReserve.end_date as Date)

    if (reserves) {
      for (let i = 0; i < reserves.length; i++) {
        if (reserves[i]._id_car === _id_car) {
          throw new AlreadyOnBaseError('reserve with the same car inside this range data')
        } else if (reserves[i]._id_user === _id_user) {
          throw new AlreadyOnBaseError('reserve with the same user inside this range data')
        }
      }
    }

    await this.reserveRepository.save(newReserve)

    return newReserve
  }
}
