import { BaseError } from './baseError'

export class AuthError extends BaseError {
  constructor (propertyString: string) {
    super(401, `Unauthorized! ${propertyString}.`)
  }
}
