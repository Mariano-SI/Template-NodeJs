import { ProductVariantModel } from '../models/product.variant.model'

export interface ProductVariantsRepository {
  findByProductId(productId: string): Promise<ProductVariantModel[]>
}
