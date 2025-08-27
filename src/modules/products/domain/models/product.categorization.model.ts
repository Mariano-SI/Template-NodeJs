export class ProductCategorizationModel {
  constructor(
    public id: string,
    public product_category_id: string,
    public product_id: string,
  ) {}

  static create(params: {
    product_category_id: string
    product_id: string
  }): ProductCategorizationModel {
    return new ProductCategorizationModel(
      crypto.randomUUID(),
      params.product_category_id,
      params.product_id,
    )
  }
}
