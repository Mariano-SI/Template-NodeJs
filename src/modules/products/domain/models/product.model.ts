export interface ProductModel {
  id: string
  name: string
  description: string
  active: boolean
  productTypeId: string
  supplierId: string
  createdAt: Date
  createdBy: string
  updatedAt?: Date
  updatedBy?: string
  inactivatedAt?: Date
}
