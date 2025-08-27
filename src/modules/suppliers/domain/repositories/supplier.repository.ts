import { SupplierModel } from '../models/supplier.model'

export interface SuppliersRepository {
  findById(id: string): Promise<SupplierModel>
  create(supplier: SupplierModel): Promise<void>
  findByName(name: string): Promise<SupplierModel | null>
}
