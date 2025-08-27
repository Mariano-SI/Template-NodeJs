import { SuppliersInMemoryRepository } from '../mocks/supplier.repository.in-memory'
import { SupplierModel } from '@/modules/suppliers/domain/models/supplier.model'

describe('SuppliersInMemoryRepository unit tests', () => {
  let sut: SuppliersInMemoryRepository

  beforeEach(() => {
    sut = new SuppliersInMemoryRepository()
  })

  describe('create', () => {
    it('should add a supplier', async () => {
      const supplier = SupplierModel.create({
        name: 'Supplier 1',
        description: 'desc',
      })
      await sut.create(supplier)
      expect(sut.items).toContain(supplier)
    })
  })

  describe('findById', () => {
    it('should return null if supplier does not exist', async () => {
      const result = await sut.findById('non-existent-id')
      expect(result).toBeNull()
    })

    it('should return the supplier if it exists', async () => {
      const supplier = SupplierModel.create({
        name: 'Supplier 2',
        description: 'desc',
      })
      await sut.create(supplier)
      const result = await sut.findById(supplier.id)
      expect(result).toStrictEqual(supplier)
    })
  })

  describe('findByName', () => {
    it('should return null if supplier not found', async () => {
      const result = await sut.findByName('NonExistent')
      expect(result).toBeNull()
    })

    it('should find a supplier by name', async () => {
      const supplier = SupplierModel.create({
        name: 'UniqueName',
        description: 'desc',
      })
      await sut.create(supplier)
      const result = await sut.findByName('UniqueName')
      expect(result).toStrictEqual(supplier)
    })
  })
})
