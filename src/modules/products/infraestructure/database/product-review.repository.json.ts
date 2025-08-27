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

  async findByProductId(productId: string): Promise<ProductReviewModel[]> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const reviews: ProductReviewModel[] = JSON.parse(data)
    return reviews.filter(review => review.product_id === productId)
  }

  async findAverageRatingByProductId(productId: string): Promise<number> {
    const reviews = await this.findByProductId(productId)
    if (reviews.length === 0) return 0
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    const avg = total / reviews.length
    return Math.round(avg * 2) / 2
  }
}
