import { ProductCategorizationRepository } from '@/modules/products/domain/repositories/product-categorization.repository'
import { ProductCategorizationModel } from '@/modules/products/domain/models/product.categorization.model'

export class ProductCategorizationInMemoryRepository
  implements ProductCategorizationRepository
{
  private items: ProductCategorizationModel[] = []

  async create(
    categorization: ProductCategorizationModel,
  ): Promise<ProductCategorizationModel> {
    this.items.push(categorization)
    return categorization
  }

  async findByProductId(
    productId: string,
  ): Promise<ProductCategorizationModel[]> {
    return this.items.filter(item => item.product_id === productId)
  }
}
