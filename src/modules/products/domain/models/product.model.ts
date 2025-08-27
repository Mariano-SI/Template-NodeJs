export interface ProductModel {
  id: string
  name: string
  description: string
  active: boolean
  supplier_id: string
  created_at: Date
  created_by: string
  updated_at?: Date
  updated_by?: string
  inactivated_at?: Date
}
