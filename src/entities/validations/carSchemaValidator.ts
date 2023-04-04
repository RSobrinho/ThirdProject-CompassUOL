import { z } from 'zod'

export const CarSchemaValidator = z.object({
  id: z.string().uuid(),
  model: z.string().min(3).max(20),
  color: z.string().min(3).max(15),
  year: z.number().gt(1950).lt(new Date().getFullYear()),
  value_per_day: z.number().gt(20).lt(10000),
  accessories: z.object({
    description: z.string()
  }).array(),
  number_of_passengers: z.number().min(2).max(10)
})

export type ICarEntityProps = z.infer<typeof CarSchemaValidator>
