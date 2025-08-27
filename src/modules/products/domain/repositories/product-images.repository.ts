import { ProductImageModel } from '../models/product.image.model'

export interface ProductImagesRepository {
  findByProductId(productId: string): Promise<ProductImageModel[]>
  create(image: ProductImageModel): Promise<ProductImageModel>
}
