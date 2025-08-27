import { ProductReviewImageModel } from '../models/product.review.image.model'

export interface ProductReviewImageRepository {
  create(product: ProductReviewImageModel): Promise<ProductReviewImageModel>
  getImageUrlByReviewId(reviewId: string): Promise<string[]>
}
