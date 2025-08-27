export interface ProductImageModel {
  id: string
  productId: string
  image: string
  main: boolean
  created_at: Date
  created_by: string
  inactivated_at?: Date
  updated_at?: Date
  updated_by?: string
}
