import { Request } from 'express'
import { z } from 'zod'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

const bodySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  active: z.preprocess(
    val => val === 'true' || val === true,
    z.boolean().optional().default(true),
  ),
  supplier_id: z.string().uuid(),
  variants: z.preprocess(
    val => (typeof val === 'string' ? JSON.parse(val) : val),
    z.array(
      z.object({
        price: z.number(),
        quantity: z.number(),
        attributes: z.string(),
        product_image_id: z.string().optional(),
        active: z.boolean().optional(),
      }),
    ),
  ),
  categories: z.preprocess(
    val => (typeof val === 'string' ? JSON.parse(val) : val),
    z.array(z.string()),
  ),
})

export function validateCreateProductRequest(req: Request) {
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
