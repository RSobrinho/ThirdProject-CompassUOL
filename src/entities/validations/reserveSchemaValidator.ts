import { isAfter, isValid } from 'date-fns'
import { z } from 'zod'
import { ValidationError } from '../../errors/validationError'

export const ReserveSchemaValidator = z.object({
  id: z.string().uuid(),
  id_user: z.string().uuid(),
  start_date: z.string().refine((d) => {
    const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    const startDate = new Date(parseInt(d.slice(6, 10)), parseInt(d.slice(3, 5)), parseInt(d.slice(0, 3)))

    if (!isValid(startDate)) {
      throw new ValidationError('start_date validation error')
    }

    if (isAfter(minDate, startDate)) {
      throw new ValidationError('start_date validation error')
    }

    return true
  }),
  end_date: z.string().refine((d) => {
    const endDate = new Date(parseInt(d.slice(6, 10)), parseInt(d.slice(3, 5)), parseInt(d.slice(0, 3)))

    const maxDate = new Date(new Date().getFullYear() + 3, new Date().getMonth(), new Date().getDate())

    if (!isValid(endDate)) {
      throw new ValidationError('end_date validation error')
    }

    if (isAfter(endDate, maxDate)) {
      throw new ValidationError('end_date validation error')
    }

    return true
  }),
  final_value: z.number().gt(20).lt(1000000)
})

export type IReserveEntityProps = z.infer<typeof ReserveSchemaValidator>
