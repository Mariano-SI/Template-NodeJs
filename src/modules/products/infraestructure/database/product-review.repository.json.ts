import { promises as fs } from 'fs'
import { ProductReviewRepository } from '../../domain/repositories/product-review.repository'
import { ProductReviewModel } from '../../domain/models/product.review.model'

export class ProductReviewRepositoryJson implements ProductReviewRepository {
  private static instance: ProductReviewRepositoryJson
  private filePath = `${process.env.DB_FOLDER_PATH || 'src/common/infrastructure/database'}/productReviews.json`

  static getInstance(): ProductReviewRepositoryJson {
    if (!ProductReviewRepositoryJson.instance) {
      ProductReviewRepositoryJson.instance = new ProductReviewRepositoryJson()
    }
    return ProductReviewRepositoryJson.instance
  }

  async create(review: ProductReviewModel): Promise<ProductReviewModel> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const reviews: ProductReviewModel[] = JSON.parse(data)
    reviews.push(review)
    await fs.writeFile(this.filePath, JSON.stringify(reviews, null, 2))
    return review
  }
}
