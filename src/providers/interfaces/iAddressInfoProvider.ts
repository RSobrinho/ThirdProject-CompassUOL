import { IUserEntityProps } from '../../entities/interfaces/iUserEntityProps'

export interface IAddressInfoProvider {
  consume(cep: string): Promise<IUserEntityProps>,
}
