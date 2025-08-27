import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { Request, Response } from 'express'
import { z } from 'zod'
import { ExampleRepositoryPG } from '../../database/supplier.repository'
import ListExampleUseCase from '@/modules/example/application/usecases/list-example.usecase'

export async function listExampleController(
  request: Request,
  response: Response,
): Promise<Response> {
  const listExampleParamSchema = z.object({
    id: z.string().uuid(),
  })
  const validatedData = listExampleParamSchema.safeParse(request.params)

  if (!validatedData.success) {
    throw new BadRequestError(
      `${validatedData.error.errors.map(error => {
        return `${error.path} -> ${error.message}`
      })}`,
    )
  }

  const { id } = validatedData.data
  const exampleRepository = ExampleRepositoryPG.getInstance()
  const listExampleUsecase = new ListExampleUseCase(exampleRepository)

  const example = await listExampleUsecase.execute({ id })
  return response.status(200).json(example)
}
