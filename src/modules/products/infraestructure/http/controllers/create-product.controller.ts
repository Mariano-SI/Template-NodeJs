import { Request, Response } from 'express'
import ShowProductDetailsUseCase from '@/modules/products/application/usecases/show-product-details.usecase'
import { ProductRepositoryJson } from '../../database/product.repository.json'
import { validateShowProductDetailsRequest } from '../validators/show-product-details.validator'
import { ProductVariantsRepositoryJson } from '../../database/product-variants.repository.json'
import { ProductImagesRepositoryJson } from '../../database/product-images.repository.json'
import { SupplierRepositoryJson } from '@/modules/suppliers/infraestructure/database/supplier.repository'
import { ProductCategorizationRepositoryJson } from '../../database/product-categorization.repository'
import { ProductCategoryRepositoryJson } from '../../database/product-category.repository.json'
import { validateCreateProductRequest } from '../validators/create-product.validator'
import { validateProductVariants } from '../validators/validate-product-variants'
import { CloudflareR2Uploader } from '@/common/infrastructure/providers/uploader-provider.cloudflareR2'
import CreateProductUseCase from '@/modules/products/application/usecases/create-product.usecase'

export async function createProductController(
  request: Request,
  response: Response,
): Promise<Response> {
  console.log('files', request.files)
  const productData = validateCreateProductRequest(request)
  validateProductVariants(productData.variants)

  const productRepository = ProductRepositoryJson.getInstance()
  const productVariantsRepository = ProductVariantsRepositoryJson.getInstance()
  const productImagesRepository = ProductImagesRepositoryJson.getInstance()
  const suppliersRepository = SupplierRepositoryJson.getInstance()
  const productCategorizationRepository =
    ProductCategorizationRepositoryJson.getInstance()
  const categoryRepository = ProductCategoryRepositoryJson.getInstance()

  const imageUploader = new CloudflareR2Uploader()

  const createProductUseCase = new CreateProductUseCase(
    productRepository,
    productVariantsRepository,
    productImagesRepository,
    suppliersRepository,
    productCategorizationRepository,
    categoryRepository,
    imageUploader,
  )
  const product = await createProductUseCase.execute({
    ...productData,
    files: request.files,
  })

  return response.status(201).json(product)
}
