import { ValidationError } from '../../errors/validationError'
import { validator } from '../validations/Validator'
import { ReserveSchemaValidator } from '../validations/reserveSchemaValidator'
import { IReserveEntityProps } from '../interfaces/iReserveEntityProps'
import { v4 } from 'uuid'

export class ReserveEntity {
  _id: string
  idUser: string
  startDate: string | Date
  endDate: string | Date
  idCar: string
  finalValue: number

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
