import { ProductImagesRepository } from '@/modules/products/domain/repositories/product-images.repository'
import { ProductImageModel } from '@/modules/products/domain/models/product.image.model'

export class ProductImagesInMemoryRepository
  implements ProductImagesRepository
{
  private items: ProductImageModel[] = []

  async create(image: ProductImageModel): Promise<ProductImageModel> {
    this.items.push(image)
    return image
  }

  async findByProductId(productId: string): Promise<ProductImageModel[]> {
    return this.items.filter(item => item.productId === productId)
  }
}
