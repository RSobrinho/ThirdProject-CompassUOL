import { z } from 'zod'
import { isValid } from 'date-fns'
import { ValidationError } from '../../errors/validationError'
export const UserSchemaValidator = z.object({
  id: z.string().uuid(),
  name: z.string().min(4),
  cpf: z.string(),
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
  password: z.string().min(12),
  cep: z.string(),
  qualified: z.string(),
  patio: z.string(),
  complement: z.string(),
  neighborhood: z.string(),
  locality: z.string(),
  uf: z.string(),
  city: z.string().min(4),
  country: z.string().min(4),
  role: z.string()
})

export type IUserEntityProps = z.infer<typeof UserSchemaValidator>
