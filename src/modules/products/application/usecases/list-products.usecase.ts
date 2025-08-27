import { ProductsRepository } from '../../domain/repositories/products.repository'
import { CacheProvider } from '@/common/domain/providers/cache.provider'
import { ProductModel } from '../../domain/models/product.model'

export default class ListProductsUseCase {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly cacheProvider: CacheProvider,
  ) {}

  async execute(): Promise<ProductModel[]> {
    const cacheKey = 'products:all'
    const cached = await this.cacheProvider.recover<ProductModel[]>(cacheKey)
    if (cached) {
      return cached
    }

    const products = await this.productsRepository.findAll()
    await this.cacheProvider.save<ProductModel[]>(cacheKey, products)

    return products
  }
}
