import { Request, Response } from 'express'
import { ProductRepositoryJson } from '../../database/product.repository.json'
import { CacheProviderRedis } from '@/common/infrastructure/providers/cache-provider.redis'
import ListProductsUseCase from '@/modules/products/application/usecases/list-products.usecase'

export async function listProductsController(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const productRepository = ProductRepositoryJson.getInstance()
    const redisCacheProvider = new CacheProviderRedis()
    const useCase = new ListProductsUseCase(
      productRepository,
      redisCacheProvider,
    )
    const products = await useCase.execute()
    return response.status(200).json(products)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}
