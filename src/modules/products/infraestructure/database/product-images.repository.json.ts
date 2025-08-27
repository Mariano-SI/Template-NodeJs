import { promises as fs } from 'fs'
import { ProductImageModel } from '../../domain/models/product.image.model'
import { ProductImagesRepository } from '../../domain/repositories/product-images.repository'

export class ProductImagesRepositoryJson implements ProductImagesRepository {
  private static instance: ProductImagesRepositoryJson
  private filePath = 'src/common/infrastructure/database/productImages.json'

  static getInstance(): ProductImagesRepositoryJson {
    if (!ProductImagesRepositoryJson.instance) {
      ProductImagesRepositoryJson.instance = new ProductImagesRepositoryJson()
    }
    return ProductImagesRepositoryJson.instance
  }

  async findByProductId(productId: string): Promise<ProductImageModel[]> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const images: ProductImageModel[] = JSON.parse(data)
    return images.filter(img => img.productId === productId)
  }
}
