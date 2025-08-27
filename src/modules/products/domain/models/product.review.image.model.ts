export class ProductReviewImageModel {
  constructor(
    public id: string,
    public product_review_id: string,
    public image: string,
    public created_at: Date,
    public created_by: string,
  ) {}

  static create(params: {
    product_review_id: string
    image: string
    created_by?: string
  }): ProductReviewImageModel {
    return new ProductReviewImageModel(
      crypto.randomUUID(),
      params.product_review_id,
      params.image,
      new Date(),
      params.created_by ?? 'system',
    )
  }
}
