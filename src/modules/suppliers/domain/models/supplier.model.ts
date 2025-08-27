export interface SupplierModel {
  id: string
  name: string
  description: string
  active: boolean
  createdAt: string
  createdBy: string
  updatedAt?: string
  updatedBy?: string
  inactivatedAt?: string
}
