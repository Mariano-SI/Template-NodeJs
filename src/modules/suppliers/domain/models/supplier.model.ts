export interface SupplierModel {
  id: string
  name: string
  description: string
  active: boolean
  created_at: string
  created_by: string
  updated_at?: string
  updated_by?: string
  inactivated_at?: string
}
