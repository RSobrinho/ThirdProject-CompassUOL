export interface ICarEntityProps {
  id?: string,
  model?: string,
  color?: string,
  year?: number,
  valuePerDay?: number,
  accessories?: {
    description?: string
  }[],
  numberOfPassengers?: number
}
