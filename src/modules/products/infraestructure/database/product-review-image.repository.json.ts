import { promises as fs } from 'fs'
import { ProductReviewImageRepository } from '../../domain/repositories/product-review-image.repository'
import { ProductReviewImageModel } from '../../domain/models/product.review.image.model'

export class ProductReviewImageRepositoryJson
  implements ProductReviewImageRepository
{
  private static instance: ProductReviewImageRepositoryJson
  private filePath = `${process.env.DB_FOLDER_PATH || 'src/common/infrastructure/database'}/productReviewImages.json`

  static getInstance(): ProductReviewImageRepositoryJson {
    if (!ProductReviewImageRepositoryJson.instance) {
      ProductReviewImageRepositoryJson.instance =
        new ProductReviewImageRepositoryJson()
    }
    return ProductReviewImageRepositoryJson.instance
  }

  async create(
    image: ProductReviewImageModel,
  ): Promise<ProductReviewImageModel> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const images: ProductReviewImageModel[] = JSON.parse(data)
    images.push(image)
    await fs.writeFile(this.filePath, JSON.stringify(images, null, 2))
    return image
  }
}
