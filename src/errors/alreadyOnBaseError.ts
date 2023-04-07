import { BaseError } from './baseError'

export class AlreadyOnBaseError extends BaseError {
  constructor (propertyString: string) {
    super(409, `${propertyString} already presented on database.`)
  }
}
