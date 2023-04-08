/* eslint-disable camelcase */
import { isValid } from 'date-fns'
import { z } from 'zod'
import { ValidationError } from '../../errors/validationError'

export const ReserveSchemaValidator = z.object({
  _id: z.string().uuid(),
  _id_user: z.string().uuid(),
  start_date: z.string().transform((stringDate) => {
    const arrayDate = stringDate.split('/')
    const date = new Date(parseInt(arrayDate[2]), parseInt(arrayDate[1]) - 1, parseInt(arrayDate[0]))
    return date
  }).refine((start_date) => {
    const minDate = new Date()
    minDate.setHours(0, 0, 0, 0)

    if (!isValid(start_date)) {
      throw new ValidationError('ValidationError -> start_date not valid')
    }

    if (start_date < minDate) {
      throw new ValidationError('ValidationError -> start_date cannot start in the past')
    }

    return true
  }),
  end_date: z.string().transform((stringDate) => {
    const arrayDate = stringDate.split('/')
    const date = new Date(parseInt(arrayDate[2]), parseInt(arrayDate[1]) - 1, parseInt(arrayDate[0]))
    return date
  }).refine((end_date) => {
    if (!isValid(end_date)) {
      throw new ValidationError('ValidationError -> end_date not valid')
    }

    return true
  }),
  _id_car: z.string().uuid(),
  final_value: z.number().gt(20).lt(1000000)
})
