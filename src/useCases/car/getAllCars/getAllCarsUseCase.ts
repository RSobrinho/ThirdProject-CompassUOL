import { ICarRepository } from '../../../repositories/interfaces/iCarRepository'
import { GetAllCarsDTO } from './getAllCarsDTO'

export class GetAllCarsUseCase {
  constructor (private carRepository: ICarRepository) {}

  async execute (props: GetAllCarsDTO): Promise<object> {
    const definedProps = {}

    for (const key in props) {
      if (props[key] && (key === 'year' || key === 'valuePerDay' || key === 'numberOfPassengers' || key === 'limit' || key === 'page')) {
        definedProps[key] = parseInt(props[key])
      } else if (props[key]) {
        definedProps[key] = props[key]
      }
    }
    return await this.carRepository.findByFilter(definedProps)
  }
}
