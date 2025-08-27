import { SupplierModel } from '../models/supplier.model'

export interface SuppliersRepository {
  findById(id: string): Promise<SupplierModel>
}
