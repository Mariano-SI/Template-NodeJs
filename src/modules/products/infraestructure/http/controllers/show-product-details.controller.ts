import { Request, Response } from 'express'
import ShowProductDetailsUseCase from '@/modules/products/application/usecases/show-product-details.usecase'
import { ProductRepositoryJson } from '../../database/products.repository.json'
import { validateShowProductDetailsRequest } from '../validators/show-product-details.validator'
import { ProductVariantsRepositoryJson } from '../../database/products-variants.repository.json'
import { ProductImagesRepositoryJson } from '../../database/products-images.repository.json'
import { SupplierRepositoryJson } from '@/modules/suppliers/infraestructure/database/supplier.repository'

export async function showProductDetailsController(
  request: Request,
  response: Response,
): Promise<Response> {
  const { id, includeInactive } = validateShowProductDetailsRequest(request)

  const productRepository = ProductRepositoryJson.getInstance()
  const productVariantsRepository = ProductVariantsRepositoryJson.getInstance()
  const productImagesRepository = ProductImagesRepositoryJson.getInstance()
  const suppliersRepository = SupplierRepositoryJson.getInstance()
  const showProductDetailsUseCase = new ShowProductDetailsUseCase(
    productRepository,
    productVariantsRepository,
    productImagesRepository,
    suppliersRepository,
  )

  const example = await showProductDetailsUseCase.execute({
    id,
    includeInactive,
  })
  return response.status(200).json(example)
}
