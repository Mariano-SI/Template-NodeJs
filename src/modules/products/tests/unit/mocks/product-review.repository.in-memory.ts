import { ProductReviewRepository } from '@/modules/products/domain/repositories/product-review.repository'
import { ProductReviewModel } from '@/modules/products/domain/models/product.review.model'

export class ProductReviewRepositoryInMemory
  implements ProductReviewRepository
{
  public items: ProductReviewModel[] = []

  async create(productReview: ProductReviewModel): Promise<ProductReviewModel> {
    this.items.push(productReview)
    return productReview
  }

  async findByProductId(productId: string): Promise<ProductReviewModel[]> {
    return this.items.filter(item => item.product_id === productId)
  }

  async findAverageRatingByProductId(productId: string): Promise<number> {
    const reviews = this.items.filter(item => item.product_id === productId)
    if (reviews.length === 0) return 0
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    const avg = total / reviews.length
    return Math.round(avg * 2) / 2
  }
}
