export class ProductImageModel {
  constructor(
    public id: string,
    public productId: string,
    public image: string,
    public main: boolean,
    public created_at: Date,
    public created_by: string,
    public inactivated_at?: Date,
    public updated_at?: Date,
    public updated_by?: string,
  ) {}

  static create(params: {
    productId: string
    image: string
    main?: boolean
    created_by?: string
  }): ProductImageModel {
    return new ProductImageModel(
      crypto.randomUUID(),
      params.productId,
      params.image,
      params.main ?? false,
      new Date(),
      params.created_by ?? 'system',
      null,
      null,
      null,
    )
  }
}
