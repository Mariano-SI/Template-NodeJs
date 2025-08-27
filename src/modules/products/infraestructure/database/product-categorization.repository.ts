import { promises as fs } from 'fs'
import { ProductCategorizationModel } from '../../domain/models/product.categorization.model'
import { ProductCategorizationRepository } from '../../domain/repositories/product-categorization.repository'

export class ProductCategorizationRepositoryJson
  implements ProductCategorizationRepository
{
  private static instance: ProductCategorizationRepositoryJson

  private filePath = `${process.env.DB_FOLDER_PATH || 'src/common/infrastructure/database'}/productCategorization.json`

  static getInstance(): ProductCategorizationRepositoryJson {
    if (!ProductCategorizationRepositoryJson.instance) {
      ProductCategorizationRepositoryJson.instance =
        new ProductCategorizationRepositoryJson()
    }
    return ProductCategorizationRepositoryJson.instance
  }

  async findByProductId(
    productId: string,
  ): Promise<ProductCategorizationModel[]> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const productCategories: ProductCategorizationModel[] = JSON.parse(data)
    return productCategories.filter(pc => pc.product_id === productId)
  }

  async create(
    categorization: ProductCategorizationModel,
  ): Promise<ProductCategorizationModel> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const productCategories: ProductCategorizationModel[] = JSON.parse(data)
    productCategories.push(categorization)
    await fs.writeFile(
      this.filePath,
      JSON.stringify(productCategories, null, 2),
    )
    return categorization
  }
}
