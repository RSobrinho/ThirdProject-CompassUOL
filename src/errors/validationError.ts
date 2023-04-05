import { BaseError } from './baseError'

export class ValidationError extends BaseError {
  cause: object
  constructor (message: string, cause?: object) {
    super(400, message)

    if (cause) {
      this.cause = cause
    }
  }
}
