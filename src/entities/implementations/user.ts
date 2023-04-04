import { ValidationError } from '../../errors/validationError'
import { validator } from '../validations/Validator'
import { v4 } from 'uuid'
import { UserSchemaValidator, IUserEntityProps } from '../validations/userSchemaValidator'

export class UserEntity {
  private props: IUserEntityProps

  constructor (props: IUserEntityProps) {
    this.props = props

    if (!this.props.id) {
      this.props.id = v4()
    }

    const errors = validator.validate(UserSchemaValidator, this.props)

    if (errors) {
      throw new ValidationError('Zod validation errors', errors)
    }
  }
}
