import { z } from 'zod'

export const CarSchemaValidator = z.object({
  _id: z.string().uuid(),
  model: z.string().min(3).max(30),
  color: z.string().min(3).max(15),
  year: z.number().gt(1950).lt(new Date().getFullYear()),
  value_per_day: z.number().gt(20).lt(10000),
  accessories: z.object({
    _id: z.string().uuid(),
    description: z.string().min(5).max(40)
  }).array(),
  number_of_passengers: z.number().min(2).max(10)
})
