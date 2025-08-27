export class ProductReviewModel {
  constructor(
    public id: string,
    public product_id: string,
    public rating: number,
    public description: string,
    public created_at: Date,
    public created_by: string,
  ) {}

  static create(params: {
    product_id: string
    rating: number
    description: string
    created_by?: string
  }): ProductReviewModel {
    return new ProductReviewModel(
      crypto.randomUUID(),
      params.product_id,
      params.rating,
      params.description,
      new Date(),
      params.created_by ?? 'system',
    )
  }
}
