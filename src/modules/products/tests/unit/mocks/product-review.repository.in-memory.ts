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
}
