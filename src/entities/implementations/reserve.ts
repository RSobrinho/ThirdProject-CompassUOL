import { ValidationError } from '../../errors/validationError'
import { validator } from '../validations/Validator'
import { ReserveSchemaValidator } from '../validations/reserveSchemaValidator'
import { IReserveEntityProps } from '../interfaces/iReserveEntityProps'
import { v4 } from 'uuid'

export class ReserveEntity {
  _id: string
  _id_user: string
  start_date: string | Date
  end_date: string | Date
  _id_car: string
  final_value: number

  constructor (props: IReserveEntityProps) {
    Object.assign(this, props)

    if (!this._id) {
      this._id = v4()
    }

    const data = validator.validate(ReserveSchemaValidator, { ...this })

    if (data.success === false) {
      throw new ValidationError('Zod validation errors', data)
    } else {
      Object.assign(this, data)
    }
  }
}
