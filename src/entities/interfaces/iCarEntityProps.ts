import { IAccessoryEntityProps } from './iAccessoryProps'

export interface ICarEntityProps{
  _id?: string,
  model?: string,
  color?: string,
  year?: number,
  value_per_day?: number,
  accessories?: IAccessoryEntityProps[],
  number_of_passengers?: number
}
