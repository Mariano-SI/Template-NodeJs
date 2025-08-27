import { ProductCategoryInMemoryRepository } from '../mocks/product-category.repository.in-memory'
import { ProductCategoryModel } from '@/modules/products/domain/models/product.category.model'

describe('ProductCategoryInMemoryRepository unit tests', () => {
  let sut: ProductCategoryInMemoryRepository

  beforeEach(() => {
    sut = new ProductCategoryInMemoryRepository()
  })

  describe('findById', () => {
    it('should return null if category does not exist', async () => {
      const result = await sut.findById('non-existent-id')
      expect(result).toBeNull()
    })

    it('should return the category if it exists', async () => {
      const category = ProductCategoryModel.create({
        name: 'Category 1',
      })
      sut['items'].push(category)
      const result = await sut.findById(category.id)
      expect(result).toEqual(category)
    })
  })
})
