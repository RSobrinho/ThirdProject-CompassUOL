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
  valuePerDay: number
  accessories: IAccessoryEntityProps[]
  numberOfPassengers: number

  constructor (props: ICarEntityProps) {
    Object.assign(this, props)

    if (!this._id) {
      this._id = v4()
    }

    if (this.accessories) {
      this.accessories = this.accessoriesWithId()
    }

    const errors = validator.validate(CarSchemaValidator, { ...this })

    if (errors) {
      console.log(errors)

      throw new ValidationError('Zod validation errors', errors)
    }
  }

  get id () {
    return this._id
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
