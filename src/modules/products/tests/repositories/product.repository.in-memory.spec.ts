import { ProductsInMemoryRepository } from '../mocks/product.repository.in-memory'
import { ProductModel } from '@/modules/products/domain/models/product.model'

describe('ProductsInMemoryRepository unit tests', () => {
  let sut: ProductsInMemoryRepository

  beforeEach(() => {
    sut = new ProductsInMemoryRepository()
  })

  describe('create', () => {
    it('should add a product and return it', async () => {
      const product = ProductModel.create({
        name: 'Test Product',
        description: 'A product for testing',
        supplier_id: 'supplier-1',
      })
      const result = await sut.create(product)
      expect(result).toStrictEqual(product)
      expect(await sut.findById(product.id)).toStrictEqual(product)
    })
  })

  describe('findById', () => {
    it('should return null if product does not exist', async () => {
      const result = await sut.findById('non-existent-id')
      expect(result).toBeNull()
    })

    it('should return the product if it exists and is active', async () => {
      const product = ProductModel.create({
        name: 'Active Product',
        description: 'Active',
        supplier_id: 'supplier-2',
        active: true,
      })
      await sut.create(product)
      const result = await sut.findById(product.id)
      expect(result).toStrictEqual(product)
    })

    it('should return null if product is inactive and includeInactive is false', async () => {
      const product = ProductModel.create({
        name: 'Inactive Product',
        description: 'Inactive',
        supplier_id: 'supplier-3',
        active: false,
      })
      await sut.create(product)
      const result = await sut.findById(product.id)
      expect(result).toBeNull()
    })

    it('should return product if inactive and includeInactive is true', async () => {
      const product = ProductModel.create({
        name: 'Inactive Product',
        description: 'Inactive',
        supplier_id: 'supplier-3',
        active: false,
      })
      await sut.create(product)
      const result = await sut.findById(product.id, true)
      expect(result).toStrictEqual(product)
    })
  })

  describe('findByName', () => {
    it('should return null if product not found', async () => {
      const result = await sut.findByName('NonExistent')
      expect(result).toBeNull()
    })

    it('should find a product by name', async () => {
      const product = ProductModel.create({
        name: 'UniqueName',
        description: 'desc',
        supplier_id: 'supplier-4',
      })
      await sut.create(product)
      const result = await sut.findByName('UniqueName')
      expect(result).toStrictEqual(product)
    })
  })

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = [
        ProductModel.create({
          name: 'P1',
          description: 'desc1',
          supplier_id: 'supplier-5',
        }),
        ProductModel.create({
          name: 'P2',
          description: 'desc2',
          supplier_id: 'supplier-6',
        }),
      ]
      for (const p of products) {
        await sut.create(p)
      }
      const result = await sut.findAll()
      expect(result).toHaveLength(2)
      expect(result).toEqual(expect.arrayContaining(products))
    })

    it('should return empty array if no products', async () => {
      const result = await sut.findAll()
      expect(result).toEqual([])
    })
  })
})
