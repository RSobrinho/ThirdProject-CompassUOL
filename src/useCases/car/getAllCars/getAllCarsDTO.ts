import { IAccessoryEntityProps } from 'entities/interfaces/iAccessoryProps'

export interface GetAllCarsDTO {
  page?: string,
  limit?: string,
  _id?: string,
  model?: string,
  color?: string,
  year?: string,
  valuePerDay?: string,
  accessories?: IAccessoryEntityProps[],
  numberOfPassengers?: string
}
