import { IAccessoryEntityProps } from './iAccessoryProps'

export interface ICarEntityProps{
  _id?: string,
  model?: string,
  color?: string,
  year?: number,
  valuePerDay?: number,
  accessories?: IAccessoryEntityProps[],
  numberOfPassengers?: number
}
