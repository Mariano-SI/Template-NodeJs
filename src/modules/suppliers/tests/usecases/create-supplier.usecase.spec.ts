import CreateSupplierUseCase from '@/modules/suppliers/application/usecases/create-supplier.usecase'
import { SuppliersInMemoryRepository } from '../mocks/supplier.repository.in-memory'
import { ConflictError } from '@/common/domain/errors/conflict-error'

describe('CreateSupplierUseCase Unit Tests', () => {
  let sut: CreateSupplierUseCase
  let suppliersRepository: SuppliersInMemoryRepository

  beforeEach(() => {
    suppliersRepository = new SuppliersInMemoryRepository()
    sut = new CreateSupplierUseCase(suppliersRepository)
  })

  it('should create a supplier', async () => {
    const input = { name: 'Supplier 1', description: 'desc' }
    const result = await sut.execute(input)
    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.description).toBe(input.description)
    expect(suppliersRepository.items).toContain(result)
  })

  it('should not allow duplicate supplier names', async () => {
    const input = { name: 'Supplier 1', description: 'desc' }
    await sut.execute(input)
    await expect(sut.execute(input)).rejects.toBeInstanceOf(ConflictError)
  })
})
