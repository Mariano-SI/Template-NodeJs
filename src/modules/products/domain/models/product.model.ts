export class ProductModel {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public active: boolean,
    public supplier_id: string,
    public created_at: Date,
    public created_by: string,
    public updated_at?: Date,
    public updated_by?: string,
    public inactivated_at?: Date,
  ) {}

  static create(params: {
    name: string
    description: string
    active?: boolean
    supplier_id: string
    created_by?: string
  }): ProductModel {
    return new ProductModel(
      crypto.randomUUID(),
      params.name,
      params.description,
      params.active ?? true,
      params.supplier_id,
      new Date(),
      params.created_by ?? 'system',
      null,
      null,
      null,
    )
  }
}
