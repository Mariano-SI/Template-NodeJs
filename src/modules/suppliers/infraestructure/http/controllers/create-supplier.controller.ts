import { Request, Response } from 'express'
import { SupplierRepositoryJson } from '../../database/supplier.repository'

import { validateCreateSupplierRequest } from '../validators/create-supplier.validator'
import CreateSupplierUseCase from '@/modules/suppliers/application/usecases/create-supplier.usecase'

export async function createSupplierController(
  request: Request,
  response: Response,
): Promise<Response> {
  const { name, active, description } = validateCreateSupplierRequest(request)

  const suppliersRepository = SupplierRepositoryJson.getInstance()
  const createSupplierUseCase = new CreateSupplierUseCase(suppliersRepository)

  const createdSupplier = await createSupplierUseCase.execute({
    name,
    description,
    active,
  })
  return response.status(201).json(createdSupplier)
}
