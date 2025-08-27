import { ProductVariantsInMemoryRepository } from '../mocks/product-variants.repository.in-memory'
import { ProductVariantModel } from '@/modules/products/domain/models/product.variant.model'

describe('ProductVariantsInMemoryRepository unit tests', () => {
  let sut: ProductVariantsInMemoryRepository

  beforeEach(() => {
    sut = new ProductVariantsInMemoryRepository()
  })

  describe('create', () => {
    it('should add a variant and return it', async () => {
      const variant = ProductVariantModel.create({
        product_id: 'product-1',
        price: 100,
        quantity: 2,
        attributes: { color: 'red' },
      })
      const result = await sut.create(variant)
      expect(result).toStrictEqual(variant)
    })
  })

  describe('findByProductId', () => {
    it('should return empty array if no variants for product', async () => {
      const result = await sut.findByProductId('non-existent-product')
      expect(result).toEqual([])
    })

    it('should return all variants for a product', async () => {
      const variants = [
        ProductVariantModel.create({
          product_id: 'product-2',
          price: 200,
          quantity: 3,
          attributes: { color: 'blue' },
        }),
        ProductVariantModel.create({
          product_id: 'product-2',
          price: 250,
          quantity: 1,
          attributes: { color: 'green' },
        }),
        ProductVariantModel.create({
          product_id: 'product-3',
          price: 300,
          quantity: 5,
          attributes: { color: 'yellow' },
        }),
      ]
      for (const v of variants) {
        await sut.create(v)
      }
      const result = await sut.findByProductId('product-2')
      expect(result).toHaveLength(2)
      expect(result).toEqual(expect.arrayContaining([variants[0], variants[1]]))
    })
  })
})
