import { ValidationError } from '../../errors/validationError'
import { validator } from '../validations/Validator'
import { v4 } from 'uuid'
import { CarSchemaValidator } from '../validations/carSchemaValidator'
import { ICarEntityProps } from '../interfaces/iCarEntityProps'

export class CarEntity {
  private props: ICarEntityProps

  constructor (props: ICarEntityProps) {
    this.props = props

    if (!this.props.id) {
      this.props.id = v4()
    }

    const errors = validator.validate(CarSchemaValidator, this.props)

    if (errors) {
      throw new ValidationError('Zod validation errors', errors)
    }
  }

  get id () {
    return this.props.id
  }
}
