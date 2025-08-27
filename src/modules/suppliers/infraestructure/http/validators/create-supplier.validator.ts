import { Request } from 'express'
import { z } from 'zod'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

const bodySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  active: z.boolean().optional().default(true),
})

export function validateCreateSupplierRequest(req: Request) {
  const validatedBody = bodySchema.safeParse(req.body)

  if (!validatedBody.success) {
    throw new BadRequestError(
      validatedBody.error.errors
        .map(error => `${error.path} -> ${error.message}`)
        .join(', '),
    )
  }

  return validatedBody.data
}
