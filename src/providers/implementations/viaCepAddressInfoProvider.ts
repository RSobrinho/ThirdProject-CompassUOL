import { IUserEntityProps } from '../../entities/interfaces/iUserEntityProps'
import axios from 'axios'
import { IAddressInfoProvider } from '../../providers/interfaces/iAddressInfoProvider'
export class ViaCepAddressInfoProvider implements IAddressInfoProvider {
  async consume (cep: string): Promise<IUserEntityProps> {
    try {
      const { logradouro, complemento, bairro, localidade, uf }: any = (await axios.get(`https://viacep.com.br/ws/${cep}/json`)).data

      const addressInfo = { patio: logradouro, complement: complemento, neighborhood: bairro, locality: localidade, uf }

      return addressInfo
    } catch (error) {
      return error
    }
  }
}
