import { NotFoundError } from '../../../errors/notFoundError'
import { ReserveEntity } from '../../../entities/implementations/reserve'
import { IReserveRepository } from '../../../repositories/interfaces/iReserveRepository'
import { UpdateReserveDTO } from './updateReserveDTO'
import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'
import { ICarEntityProps } from '../../../entities/interfaces/iCarEntityProps'
import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { ICarRepository } from '../../../repositories/interfaces/iCarRepository'
import { ValidationError } from '../../../errors/validationError'
import { IReserveEntityProps } from '../../../entities/interfaces/iReserveEntityProps'
import { AlreadyOnBaseError } from '../../../errors/alreadyOnBaseError'
export class UpdateReserveUseCase {
  constructor (private reserveRepository: IReserveRepository, private userRepository: IUserRepository, private carRepository: ICarRepository) {}

  async execute (props: UpdateReserveDTO): Promise<object> {
    let user: IUserEntityProps
    let car: ICarEntityProps
    const definedProps: UpdateReserveDTO = {}

    for (const key in props) {
      if (['_id', '_id_user', 'start_date', 'end_date', '_id_car'].includes(key)) {
        definedProps[key] = props[key]
      }
    }

    const validatedDefinedProps = new ReserveEntity(definedProps)

    // user validations
    if (validatedDefinedProps._id_user) {
      user = await this.userRepository.findByData({ _id: validatedDefinedProps._id_user })
      if (!user) {
        throw new NotFoundError('user')
      } else if (user.qualified === 'no') {
        throw new ValidationError('ValidationError -> User not qualified to reserve a car')
      }
    }

    // car validations
    if (validatedDefinedProps._id_car) {
      car = await this.carRepository.findByData({ _id: validatedDefinedProps._id_car })
      if (!car) {
        throw new NotFoundError('car')
      }
    }

    const reserveToUpdate = await this.reserveRepository.findByData({ _id: definedProps._id })

    if (!reserveToUpdate) {
      throw new NotFoundError('reserve')
    }

    car = await this.carRepository.findByData({ _id: reserveToUpdate._id_car })
    user = await this.carRepository.findByData({ _id: reserveToUpdate._id_user })

    const reserveWithUpdatedProps = { ...reserveToUpdate._doc, ...validatedDefinedProps }

    // start_date and end_date validations
    if (reserveWithUpdatedProps.start_date >= reserveWithUpdatedProps.end_date) {
      throw new ValidationError('ValidationError -> start_date cannot be after or equal end_date')
    }

    // final_value of updatedReserve validations
    const diff = Math.abs((reserveWithUpdatedProps.start_date as Date).getTime() - (reserveWithUpdatedProps.end_date as Date).getTime())
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    reserveWithUpdatedProps.final_value = car.value_per_day * days
    if (days > 365) {
      throw new ValidationError('ValidationError -> Days of reserve cannot surpass 1 year')
    }

    // reserve validations
    const reserves = await this.reserveRepository.findByRange(reserveWithUpdatedProps.start_date as Date, reserveWithUpdatedProps.end_date as Date)

    if (reserves) {
      for (let i = 0; i < reserves.length; i++) {
        if (reserves[i]._id !== reserveWithUpdatedProps._id) {
          if (reserves[i]._id_car === reserveWithUpdatedProps._id_car) {
            throw new AlreadyOnBaseError('reserve with the same car inside this range data')
          } else if (reserves[i]._id_user === reserveWithUpdatedProps._id_user) {
            throw new AlreadyOnBaseError('reserve with the same user inside this range data')
          }
        }
      }
    }

    const updatedReserve: IReserveEntityProps = await this.reserveRepository.updateById(reserveWithUpdatedProps)

    return updatedReserve
  }
}
