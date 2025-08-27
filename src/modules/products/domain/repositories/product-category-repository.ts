import { ProductCategoryModel } from '../models/product.category.model'

export interface ProductCategoryRepository {
  findById(categoryId: string): Promise<ProductCategoryModel | null>
}
