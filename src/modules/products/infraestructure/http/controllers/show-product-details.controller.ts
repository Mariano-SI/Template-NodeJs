import { Request, Response } from 'express'
import ShowProductDetailsUseCase from '@/modules/products/application/usecases/show-product-details.usecase'
import { ProductRepositoryJson } from '../../database/product.repository.json'
import { validateShowProductDetailsRequest } from '../validators/show-product-details.validator'
import { ProductVariantsRepositoryJson } from '../../database/product-variants.repository.json'
import { ProductImagesRepositoryJson } from '../../database/product-images.repository.json'
import { SupplierRepositoryJson } from '@/modules/suppliers/infraestructure/database/supplier.repository'
import { ProductCategorizationRepositoryJson } from '../../database/product-categorization.repository'
import { ProductCategoryRepositoryJson } from '../../database/product-category.repository.json'

export async function showProductDetailsController(
  request: Request,
  response: Response,
): Promise<Response> {
  const { id, includeInactive } = validateShowProductDetailsRequest(request)

  const productRepository = ProductRepositoryJson.getInstance()
  const productVariantsRepository = ProductVariantsRepositoryJson.getInstance()
  const productImagesRepository = ProductImagesRepositoryJson.getInstance()
  const suppliersRepository = SupplierRepositoryJson.getInstance()
  const productCategorizationRepository =
    ProductCategorizationRepositoryJson.getInstance()
  const categoryRepository = ProductCategoryRepositoryJson.getInstance()

  const showProductDetailsUseCase = new ShowProductDetailsUseCase(
    productRepository,
    productVariantsRepository,
    productImagesRepository,
    suppliersRepository,
    productCategorizationRepository,
    categoryRepository,
  )

  const example = await showProductDetailsUseCase.execute({
    id,
    includeInactive,
  })
  return response.status(200).json(example)
}
