export interface ProductImageModel {
  id: string
  productId: string
  image: string
  main: boolean
  active: boolean
  createdAt: Date
  createdBy: string
  inactivatedAt?: Date
  updatedAt?: Date
  updatedBy?: string
}
