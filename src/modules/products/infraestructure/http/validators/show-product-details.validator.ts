import { Request } from 'express'
import { z } from 'zod'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const querySchema = z.object({
  includeInactive: z
    .enum(['true', 'false'])
    .optional()
    .transform(val => val === 'true'),
})

export function validateShowProductDetailsRequest(req: Request) {
  const validatedParams = paramsSchema.safeParse(req.params)
  const validatedQuery = querySchema.safeParse(req.query)

  if (!validatedParams.success || !validatedQuery.success) {
    throw new BadRequestError(
      [
        ...(validatedParams.error?.errors ?? []),
        ...(validatedQuery.error?.errors ?? []),
      ]
        .map(error => `${error.path} -> ${error.message}`)
        .join(', '),
    )
  }

  return {
    id: validatedParams.data.id,
    includeInactive: validatedQuery.data.includeInactive ?? false,
  }
}
