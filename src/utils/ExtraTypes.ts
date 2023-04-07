import { IUserEntityProps } from '../entities/interfaces/iUserEntityProps'

declare module 'express-serve-static-core' {
  interface Request {
    user: IUserEntityProps
  }
}
