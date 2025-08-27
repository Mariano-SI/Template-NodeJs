import { Request, Response } from 'express'
import { ExampleRepositoryPG } from '../../database/supplier.repository'
import ListExamplesUseCase from '@/modules/example/application/usecases/list-examples.usecase'

export async function listExamplesController(
  request: Request,
  response: Response,
): Promise<Response> {
  const exampleRepository = ExampleRepositoryPG.getInstance()
  const listExamplesUsecase = new ListExamplesUseCase(exampleRepository)
  const examples = await listExamplesUsecase.execute()
  return response.status(200).json(examples)
}
