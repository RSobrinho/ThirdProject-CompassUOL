import { IAccessoryEntityProps } from './iAccessoryProps'

export interface ICarEntityProps{
  id?: string,
  model?: string,
  color?: string,
  year?: number,
  valuePerDay?: number,
  accessories?: IAccessoryEntityProps[],
  numberOfPassengers?: number
}
