export class ProductDetailsOutputDto {
  id: string
  name: string
  description: string
  active: boolean
  productTypeId: string
  supplierId: string
  createdAt: string
  createdBy: string
  updatedAt?: string
  updatedBy?: string
  inactivatedAt?: string | null
  variants?: any[]
  // images?: any[]
  // supplier?: any

  constructor(props: any) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.active = props.active
    this.productTypeId = props.productTypeId
    this.supplierId = props.supplierId
    this.createdAt = props.createdAt
    this.createdBy = props.createdBy
    this.updatedAt = props.updatedAt
    this.updatedBy = props.updatedBy
    this.inactivatedAt = props.inactivatedAt
    this.variants = props.variants
    // this.images = props.images
    // this.supplier = props.supplier
  }
}
