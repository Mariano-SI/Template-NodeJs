import { ProductCategorizationModel } from '../models/product.categorization.model'

export interface ProductCategorizationRepository {
  findByProductId(productId: string): Promise<ProductCategorizationModel[]>
  create(
    categorization: ProductCategorizationModel,
  ): Promise<ProductCategorizationModel>
}
