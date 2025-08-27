import { SuppliersRepository } from '@/modules/suppliers/domain/repositories/supplier.repository'
import { SupplierModel } from '@/modules/suppliers/domain/models/supplier.model'

export class SuppliersInMemoryRepository implements SuppliersRepository {
  public items: SupplierModel[] = []

  async create(supplier: SupplierModel): Promise<void> {
    this.items.push(supplier)
  }

  async findById(id: string): Promise<SupplierModel> {
    const supplier = this.items.find(item => item.id === id)
    return supplier ?? null
  }

  async findByName(name: string): Promise<SupplierModel | null> {
    return this.items.find(item => item.name === name) ?? null
  }
}
