import { ProductsRepository } from '@/modules/products/domain/repositories/products.repository'
import { ProductModel } from '@/modules/products/domain/models/product.model'

export class ProductsInMemoryRepository implements ProductsRepository {
  private items: ProductModel[] = []

  async findById(
    id: string,
    includeInactive?: boolean,
  ): Promise<ProductModel | null> {
    const product = this.items.find(item => item.id === id)
    if (!product) return null
    if (!includeInactive && !product.active) return null
    return product
  }

  async findByName(name: string): Promise<ProductModel | null> {
    return this.items.find(item => item.name === name) ?? null
  }

  async create(product: ProductModel): Promise<ProductModel> {
    this.items.push(product)
    return product
  }

  async findAll(): Promise<ProductModel[]> {
    return [...this.items]
  }
}
