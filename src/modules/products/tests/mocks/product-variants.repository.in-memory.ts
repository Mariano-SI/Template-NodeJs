import { ProductVariantsRepository } from '@/modules/products/domain/repositories/product-variants.repository'
import { ProductVariantModel } from '@/modules/products/domain/models/product.variant.model'

export class ProductVariantsInMemoryRepository
  implements ProductVariantsRepository
{
  private items: ProductVariantModel[] = []

  async create(variant: ProductVariantModel): Promise<ProductVariantModel> {
    this.items.push(variant)
    return variant
  }

  async findByProductId(productId: string): Promise<ProductVariantModel[]> {
    return this.items.filter(item => item.product_id === productId)
  }
}
