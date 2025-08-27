import { promises as fs } from 'fs'
import { ProductCategoryModel } from '../../domain/models/product.category.model'
import { CategoryRepository } from '../../domain/repositories/product-category-repository'

export class ProductCategoryRepositoryJson implements CategoryRepository {
  private static instance: ProductCategoryRepositoryJson
  private filePath = 'src/common/infrastructure/database/productCategories.json'

  static getInstance(): ProductCategoryRepositoryJson {
    if (!ProductCategoryRepositoryJson.instance) {
      ProductCategoryRepositoryJson.instance =
        new ProductCategoryRepositoryJson()
    }
    return ProductCategoryRepositoryJson.instance
  }

  async findById(categoryId: string): Promise<ProductCategoryModel[]> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const categories: ProductCategoryModel[] = JSON.parse(data)
    return categories.filter(c => c.id === categoryId)
  }
}
