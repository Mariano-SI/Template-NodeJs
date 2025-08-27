import { promises as fs } from 'fs'
import { ProductVariantModel } from '../../domain/models/product.variant.model'
import { ProductVariantsRepository } from '../../domain/repositories/product-variants.repository'

export class ProductVariantsRepositoryJson
  implements ProductVariantsRepository
{
  private static instance: ProductVariantsRepositoryJson
  private filePath = 'src/common/infrastructure/database/productVariants.json'

  static getInstance(): ProductVariantsRepositoryJson {
    if (!ProductVariantsRepositoryJson.instance) {
      ProductVariantsRepositoryJson.instance =
        new ProductVariantsRepositoryJson()
    }
    return ProductVariantsRepositoryJson.instance
  }

  async findByProductId(
    productId: string,
    includeInactive?: boolean,
  ): Promise<ProductVariantModel[]> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const variants: ProductVariantModel[] = JSON.parse(data)
    return variants.filter(v => {
      if (v.productId !== productId) return false
      if (!includeInactive && !v.active) return false
      return true
    })
  }
}
