import { z } from 'zod'
import { isValid } from 'date-fns'
import { ValidationError } from '../../errors/validationError'
import { extraFeatures } from '../../utils/ExtraFeatures'

export const UserSchemaValidator = z.object({
  id: z.string().uuid(),
  name: z.string().min(4).max(60),
  cpf: z.string().refine((cpf) => {
    if (extraFeatures.validateCPF(cpf)) {
      return true
    } else {
      throw new ValidationError('CPF invalid')
    }
  }),
  birth: z.string().refine((d) => {
    const date = new Date(d)
    const minDate = new Date('1900-01-01')
    const maxDate = new Date(((new Date() as unknown as number) - (1000 * 60 * 60 * 24 * 365 * 3)))

    if (!isValid(date)) {
      throw new ValidationError('Birth date validation error')
    }
    if (date < minDate || date > maxDate) {
      throw new ValidationError('Birth date validation error')
    }

    return true
  }),
  email: z.string().email(),
  password: z.string().min(6).max(40),
  cep: z.string().min(8).max(10),
  qualified: z.enum(['yes', 'no']),
  patio: z.string().max(60),
  complement: z.string().max(60),
  neighborhood: z.string().max(60),
  locality: z.string().max(60),
  uf: z.string().length(2).refine((uf) => {
    if (extraFeatures.validateBrasilianState(uf.toUpperCase())) {
      return true
    } else {
      throw new ValidationError('Brasilian state invalid')
    }
  })
})
