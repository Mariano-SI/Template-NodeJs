export class ProductDetailsOutputDto {
  id: string
  name: string
  description: string
  active: boolean
  supplier_id: string
  created_at: string
  created_by: string
  updated_at?: string
  updated_by?: string
  inactivated_at?: string | null
  variants?: any[]
  images?: any[]
  categories?: any[]
  supplier?: any

  constructor(props: any) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.active = props.active
    this.supplier_id = props.supplier_id
    this.created_at = props.created_at
    this.created_by = props.created_by
    this.updated_at = props.updated_at
    this.updated_by = props.updated_by
    this.inactivated_at = props.inactivated_at
    this.variants = props.variants
    this.images = props.images
    this.categories = props.categories
    this.supplier = props.supplier
  }
}
