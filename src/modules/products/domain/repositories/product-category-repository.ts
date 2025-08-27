import { ProductCategoryModel } from '../models/product.category.model'

export interface CategoryRepository {
  findById(categoryId: string): Promise<ProductCategoryModel[]>
}
