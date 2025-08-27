import { ProductImagesInMemoryRepository } from '../mocks/product-images.repository.in-memory'
import { ProductImageModel } from '@/modules/products/domain/models/product.image.model'

describe('ProductImagesInMemoryRepository unit tests', () => {
  let sut: ProductImagesInMemoryRepository

  beforeEach(() => {
    sut = new ProductImagesInMemoryRepository()
  })

  describe('create', () => {
    it('should add an image and return it', async () => {
      const image = ProductImageModel.create({
        productId: 'product-1',
        image: 'image-url-1',
      })
      const result = await sut.create(image)
      expect(result).toStrictEqual(image)
    })
  })

  describe('findByProductId', () => {
    it('should return empty array if no images for product', async () => {
      const result = await sut.findByProductId('non-existent-product')
      expect(result).toEqual([])
    })

    it('should return all images for a product', async () => {
      const images = [
        ProductImageModel.create({
          productId: 'product-2',
          image: 'image-url-2',
        }),
        ProductImageModel.create({
          productId: 'product-2',
          image: 'image-url-3',
        }),
        ProductImageModel.create({
          productId: 'product-3',
          image: 'image-url-4',
        }),
      ]
      for (const img of images) {
        await sut.create(img)
      }
      const result = await sut.findByProductId('product-2')
      expect(result).toHaveLength(2)
      expect(result).toEqual(expect.arrayContaining([images[0], images[1]]))
    })
  })
})
