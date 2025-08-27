export interface ProductVariantModel {
  id: string
  product_id: string
  active: boolean
  price: number
  quantity: number
  attributes: Record<string, any>
  created_at: Date
  inactivated_at?: Date
  updated_at?: Date
  updated_by?: string
}
