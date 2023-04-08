import { IAccessoryEntityProps } from 'entities/interfaces/iAccessoryProps'

export interface GetAllCarsDTO {
  page?: string,
  limit?: string,
  _id?: string,
  model?: string,
  color?: string,
  year?: string,
  value_per_day?: string,
  accessories?: IAccessoryEntityProps[],
  number_of_passengers?: string
}
