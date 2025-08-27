import { ProductReviewModel } from '../models/product.review.model'

export interface ProductReviewRepository {
  create(product: ProductReviewModel): Promise<ProductReviewModel>
}
