export class ProductVariantModel {
  constructor(
    public id: string,
    public product_id: string,
    public active: boolean,
    public price: number,
    public quantity: number,
    public attributes: Record<string, any>,
    public created_at: Date,
    public inactivated_at?: Date,
    public updated_at?: Date,
    public updated_by?: string,
  ) {}

  static create(params: {
    product_id: string
    price: number
    quantity: number
    attributes: Record<string, any>
    active?: boolean
  }): ProductVariantModel {
    return new ProductVariantModel(
      crypto.randomUUID(),
      params.product_id,
      params.active ?? true,
      params.price,
      params.quantity,
      params.attributes,
      new Date(),
    )
  }
}
