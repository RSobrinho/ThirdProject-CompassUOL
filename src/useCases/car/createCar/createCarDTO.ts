export interface createCarDTO {
 model: string,
 color: string,
 year: number,
 valuePerDay: number,
 accessories: {
  description: string
}[],
 numberOfPassengers: number
}
