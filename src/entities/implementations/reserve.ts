import { ValidationError } from '../../errors/validationError'
import { validator } from '../validations/Validator'
import { ReserveSchemaValidator } from '../validations/reserveSchemaValidator'
import { IReserveEntityProps } from '../interfaces/iReserveEntityProps'
import { v4 } from 'uuid'

export class ReserveEntity {
  private props: IReserveEntityProps

  constructor (props: IReserveEntityProps) {
    this.props = props

    if (!this.props.id) {
      this.props.id = v4()
    }

    const errors = validator.validate(ReserveSchemaValidator, this.props)

    if (errors) {
      throw new ValidationError('Zod validation errors', errors)
    }
  }
}
