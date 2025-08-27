import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { Request, Response } from 'express'
import { z } from 'zod'
import { ExampleRepositoryPG } from '../../database/example.repository'
import CreateExampleUseCase from '@/modules/example/application/usecases/create-example.usecase'

export async function createExampleController(
  request: Request,
  response: Response,
): Promise<Response> {
  const createExampleBodySchema = z.object({
    name: z.string(),
    age: z.number(),
    status: z.enum(['active', 'inactive', 'archived']),
  })

  const validatedData = createExampleBodySchema.safeParse(request.body)

  if (!validatedData.success) {
    throw new BadRequestError(
      `${validatedData.error.errors.map(error => {
        return `${error.path} -> ${error.message}`
      })}`,
    )
  }

  const { name, age, status } = validatedData.data

  const exampleRepository = ExampleRepositoryPG.getInstance()
  const createExampleUseCase = new CreateExampleUseCase(exampleRepository)

  const example = await createExampleUseCase.execute({
    name,
    age,
    status,
  })
  return response.status(201).json(example)
}
