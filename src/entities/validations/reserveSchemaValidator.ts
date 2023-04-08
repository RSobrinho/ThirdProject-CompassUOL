import { isAfter, isValid } from 'date-fns'
import { z } from 'zod'
import { ValidationError } from '../../errors/validationError'

export const ReserveSchemaValidator = z.object({
  _id: z.string().uuid(),
  idUser: z.string().uuid(),
  startDate: z.string().transform((stringDate) => {
    const arrayDate = stringDate.split('/')
    const date = new Date(parseInt(arrayDate[2]), parseInt(arrayDate[1]) - 1, parseInt(arrayDate[0]))
    return date
  }).refine((startDate) => {
    const minDate = new Date()
    minDate.setHours(0, 0, 0, 0)

    if (!isValid(startDate)) {
      throw new ValidationError('startDate validation error')
    }

    if (startDate < minDate) {
      throw new ValidationError('startDate validation error')
    }

    return true
  }),
  endDate: z.string().transform((stringDate) => {
    const arrayDate = stringDate.split('/')
    const date = new Date(parseInt(arrayDate[2]), parseInt(arrayDate[1]) - 1, parseInt(arrayDate[0]))
    return date
  }).refine((endDate) => {
    if (!isValid(endDate)) {
      throw new ValidationError('endDate validation error')
    }

    return true
  }),
  idCar: z.string().uuid(),
  finalValue: z.number().gt(20).lt(1000000)
})
