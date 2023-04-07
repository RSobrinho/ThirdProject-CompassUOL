import { BaseError } from './baseError'

export class NotFoundError extends BaseError {
  constructor (propertyString: string) {
    super(404, `${propertyString} not found.`)
  }
}
