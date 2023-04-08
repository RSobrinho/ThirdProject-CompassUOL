import { ValidationError } from '../../errors/validationError'
import { validator } from '../validations/Validator'
import { v4 } from 'uuid'
import { CarSchemaValidator } from '../validations/carSchemaValidator'
import { ICarEntityProps } from '../interfaces/iCarEntityProps'
import { IAccessoryEntityProps } from '../interfaces/iAccessoryProps'

export class CarEntity {
  _id: string
  model: string
  color: string
  year: number
  value_per_day: number
  accessories: IAccessoryEntityProps[]
  number_of_passengers: number

  constructor (props: ICarEntityProps) {
    Object.assign(this, props)

    if (!this._id) {
      this._id = v4()
    }

    if (this.accessories) {
      this.accessories = this.accessoriesWithId()
    }

    const data = validator.validate(CarSchemaValidator, { ...this })

    if (data.success === false) {
      throw new ValidationError('Zod validation errors', data)
    } else {
      Object.assign(this, data)
    }
  }

  private accessoriesWithId (): IAccessoryEntityProps[] {
    return this.accessories?.map((accessory) => {
      if (!accessory._id) {
        return {
          ...accessory,
          _id: v4()
        }
      }
      return accessory
    }) || []
  }
}
