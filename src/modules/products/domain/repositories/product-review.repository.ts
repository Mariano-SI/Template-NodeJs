import { ProductReviewModel } from '../models/product.review.model'

export interface ProductReviewRepository {
  create(product: ProductReviewModel): Promise<ProductReviewModel>
  findByProductId(productId: string): Promise<ProductReviewModel[]>
  findAverageRatingByProductId(productId: string): Promise<number>
}
