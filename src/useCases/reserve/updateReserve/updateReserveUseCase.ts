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
      if (['_id', 'idUser', 'startDate', 'endDate', 'idCar'].includes(key)) {
        definedProps[key] = props[key]
      }
    }

    const validatedDefinedProps = new ReserveEntity(definedProps)

    // user validations
    if (validatedDefinedProps.idUser) {
      user = await this.userRepository.findByData({ _id: validatedDefinedProps.idUser })
      if (!user) {
        throw new NotFoundError('user')
      } else if (user.qualified === 'no') {
        throw new ValidationError('ValidationError -> User not qualified to reserve a car')
      }
    }

    // car validations
    if (validatedDefinedProps.idCar) {
      car = await this.carRepository.findByData({ _id: validatedDefinedProps.idCar })
      if (!car) {
        throw new NotFoundError('car')
      }
    }

    const reserveToUpdate = await this.reserveRepository.findByData({ _id: definedProps._id })

    if (!reserveToUpdate) {
      throw new NotFoundError('reserve')
    }

    car = await this.carRepository.findByData({ _id: reserveToUpdate.idCar })
    user = await this.carRepository.findByData({ _id: reserveToUpdate.idUser })

    const reserveWithUpdatedProps = { ...reserveToUpdate._doc, ...validatedDefinedProps }

    // startDate and endDate validations
    if (reserveWithUpdatedProps.startDate >= reserveWithUpdatedProps.endDate) {
      throw new ValidationError('ValidationError -> startDate cannot be after or equal endDate')
    }

    // finalValue of updatedReserve validations
    const diff = Math.abs((reserveWithUpdatedProps.startDate as Date).getTime() - (reserveWithUpdatedProps.endDate as Date).getTime())
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    reserveWithUpdatedProps.finalValue = car.valuePerDay * days
    if (days > 365) {
      throw new ValidationError('ValidationError -> Days of reserve cannot surpass 1 year')
    }

    // reserve validations
    const reserves = await this.reserveRepository.findByRange(reserveWithUpdatedProps.startDate as Date, reserveWithUpdatedProps.endDate as Date)

    if (reserves) {
      for (let i = 0; i < reserves.length; i++) {
        if (reserves[i]._id !== reserveWithUpdatedProps._id) {
          if (reserves[i].idCar === reserveWithUpdatedProps.idCar) {
            throw new AlreadyOnBaseError('reserve with the same car inside this range data')
          } else if (reserves[i].idUser === reserveWithUpdatedProps.idUser) {
            throw new AlreadyOnBaseError('reserve with the same user inside this range data')
          }
        }
      }
    }

    const updatedReserve: IReserveEntityProps = await this.reserveRepository.updateById(reserveWithUpdatedProps)

    return updatedReserve
  }
}
