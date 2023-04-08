import { ValidationError } from '../../errors/validationError'
import { validator } from '../validations/Validator'
import { v4 } from 'uuid'
import { UserSchemaValidator } from '../validations/userSchemaValidator'
import { IUserEntityProps } from '../interfaces/iUserEntityProps'
export class UserEntity {
  _id: string
  name: string
  cpf: string
  birth: string
  email: string
  password: string
  cep: string
  qualified: string
  patio: string
  neighborhood: string
  locality: string
  uf: string

  constructor (props: IUserEntityProps) {
    Object.assign(this, props)

    if (!this._id) {
      this._id = v4()
    }

    const data = validator.validate(UserSchemaValidator, { ...this })

    if (data.success === false) {
      throw new ValidationError('Zod validation errors', data)
    } else {
      Object.assign(this, data)
    }
  }
}
