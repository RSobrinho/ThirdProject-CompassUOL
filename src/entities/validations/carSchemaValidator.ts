import { z } from 'zod'

export const CarSchemaValidator = z.object({
  id: z.string().uuid(),
  model: z.string().min(3).max(20),
  color: z.string().min(3).max(15),
  year: z.number().gt(1950).lt(new Date().getFullYear()),
  valuePerDay: z.number().gt(20).lt(10000),
  accessories: z.object({
    description: z.string().min(5).max(30)
  }).array().min(1).max(20),
  numberOfPassengers: z.number().min(2).max(10)
})
