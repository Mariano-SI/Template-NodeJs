import { ProductCategoryRepository } from '@/modules/products/domain/repositories/product-category-repository'
import { ProductCategoryModel } from '@/modules/products/domain/models/product.category.model'

export class ProductCategoryInMemoryRepository
  implements ProductCategoryRepository
{
  private items: ProductCategoryModel[] = []

  async findById(categoryId: string): Promise<ProductCategoryModel | null> {
    return this.items.find(item => item.id === categoryId) ?? null
  }
}
