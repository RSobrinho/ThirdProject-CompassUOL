import { v4 } from 'uuid'
import { ValidationError } from '../../errors/validationError'
import { validator } from '../validations/Validator'
import { ReserveSchemaValidator, IReserveEntityProps } from '../validations/reserveSchemaValidator'

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
