import { ValidationError } from '../../errors/validationError'
import { validator } from '../validations/Validator'
import { v4 } from 'uuid'
import { CarSchemaValidator } from '../validations/carSchemaValidator'
import { ICarEntityProps } from '../interfaces/iCarEntityProps'
import { IAccessoryEntityProps } from '../interfaces/iAccessoryProps'

export class CarEntity {
  private _id: string
  private model: string
  private color: string
  private year: number
  private valuePerDay: number
  private accessories: IAccessoryEntityProps[]
  private numberOfPassengers: number

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
