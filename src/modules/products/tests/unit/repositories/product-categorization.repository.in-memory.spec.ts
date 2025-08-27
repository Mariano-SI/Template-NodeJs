import { ProductCategorizationInMemoryRepository } from '../mocks/product-categorization.repository.in-memory'
import { ProductCategorizationModel } from '@/modules/products/domain/models/product.categorization.model'

describe('ProductCategorizationInMemoryRepository unit tests', () => {
  let sut: ProductCategorizationInMemoryRepository

  beforeEach(() => {
    sut = new ProductCategorizationInMemoryRepository()
  })

  describe('create', () => {
    it('should add a categorization and return it', async () => {
      const categorization = ProductCategorizationModel.create({
        product_category_id: 'cat-1',
        product_id: 'prod-1',
      })
      const result = await sut.create(categorization)
      expect(result).toStrictEqual(categorization)
    })
  })

  describe('findByProductId', () => {
    it('should return empty array if no categorizations for product', async () => {
      const result = await sut.findByProductId('non-existent-product')
      expect(result).toEqual([])
    })

    it('should return all categorizations for a product', async () => {
      const categorizations = [
        ProductCategorizationModel.create({
          product_category_id: 'cat-2',
          product_id: 'prod-2',
        }),
        ProductCategorizationModel.create({
          product_category_id: 'cat-3',
          product_id: 'prod-2',
        }),
        ProductCategorizationModel.create({
          product_category_id: 'cat-4',
          product_id: 'prod-3',
        }),
      ]
      for (const c of categorizations) {
        await sut.create(c)
      }
      const result = await sut.findByProductId('prod-2')
      expect(result).toHaveLength(2)
      expect(result).toEqual(
        expect.arrayContaining([categorizations[0], categorizations[1]]),
      )
    })
  })
})
