export interface ProductVariantModel {
  id: string
  productId: string
  active: boolean
  price: number
  quantity: number
  attributes: Record<string, any>
  productImageId?: string
  createdAt: Date
  inactivatedAt?: Date
  updatedAt?: Date
  updatedBy?: string
}
