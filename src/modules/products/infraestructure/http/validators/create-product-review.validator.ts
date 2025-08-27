import { Request } from 'express'
import { z } from 'zod'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

const bodySchema = z.object({
  rating: z.coerce.number().min(1).max(5, 'Rating deve ser entre 1 e 5'),
  description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
})

const paramsSchema = z.object({
  id: z.string().uuid('O parâmetro id deve ser um UUID válido'),
})

export function validateCreateReviewRequest(req: Request) {
  const validatedBody = bodySchema.safeParse(req.body)
  const validatedParams = paramsSchema.safeParse(req.params)

  if (!validatedBody.success || !validatedParams.success) {
    const errors = [
      ...(validatedBody.success ? [] : validatedBody.error.errors),
      ...(validatedParams.success ? [] : validatedParams.error.errors),
    ]

    throw new BadRequestError(
      errors
        .map(error => `${error.path.join('.')} -> ${error.message}`)
        .join(', '),
    )
  }

  return {
    ...validatedBody.data,
    productId: validatedParams.data.id,
  }
}
