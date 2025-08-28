import { ProductReviewImageRepository } from '@/modules/products/domain/repositories/product-review-image.repository'
import { ProductReviewImageModel } from '@/modules/products/domain/models/product.review.image.model'

export class ProductReviewImageRepositoryInMemory
  implements ProductReviewImageRepository
{
  public items: ProductReviewImageModel[] = []

  async create(
    productReviewImage: ProductReviewImageModel,
  ): Promise<ProductReviewImageModel> {
    this.items.push(productReviewImage)
    return productReviewImage
  }

  async getImageUrlByReviewId(reviewId: string): Promise<string[]> {
    return this.items
      .filter(item => item.product_review_id === reviewId)
      .map(item => item.image)
  }
}
