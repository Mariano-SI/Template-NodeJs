import { Request, Response } from 'express'
import { ProductRepositoryJson } from '../../database/product.repository.json'
import { ProductVariantsRepositoryJson } from '../../database/product-variants.repository.json'
import { ProductImagesRepositoryJson } from '../../database/product-images.repository.json'
import { SupplierRepositoryJson } from '@/modules/suppliers/infraestructure/database/supplier.repository'
import { ProductCategorizationRepositoryJson } from '../../database/product-categorization.repository'
import { ProductCategoryRepositoryJson } from '../../database/product-category.repository.json'
import { validateCreateProductRequest } from '../validators/create-product.validator'
import { validateProductVariants } from '../validators/validate-product-variants'
import { CloudflareR2Uploader } from '@/common/infrastructure/providers/uploader-provider.cloudflareR2'
import CreateProductUseCase from '@/modules/products/application/usecases/create-product.usecase'
import { CacheProviderRedis } from '@/common/infrastructure/providers/cache-provider.redis'

export async function createProductController(
  request: Request,
  response: Response,
): Promise<Response> {
  const productData = validateCreateProductRequest(request)
  validateProductVariants(productData.variants)

  const productRepository = ProductRepositoryJson.getInstance()
  const productVariantsRepository = ProductVariantsRepositoryJson.getInstance()
  const productImagesRepository = ProductImagesRepositoryJson.getInstance()
  const suppliersRepository = SupplierRepositoryJson.getInstance()
  const productCategorizationRepository =
    ProductCategorizationRepositoryJson.getInstance()
  const categoryRepository = ProductCategoryRepositoryJson.getInstance()

  const redisCacheProvider = new CacheProviderRedis()

  const imageUploader = new CloudflareR2Uploader()

  const createProductUseCase = new CreateProductUseCase(
    productRepository,
    productVariantsRepository,
    productImagesRepository,
    suppliersRepository,
    productCategorizationRepository,
    categoryRepository,
    imageUploader,
    redisCacheProvider,
  )
  const product = await createProductUseCase.execute({
    name: productData.name,
    description: productData.description,
    active: productData.active,
    supplier_id: productData.supplier_id,
    variants: productData.variants,
    categories: productData.categories,
    files: request.files,
  })

  return response.status(201).json(product)
}
