export class ProductCategoryModel {
  constructor(
    public id: string,
    public name: string,
    public active: boolean,
  ) {}

  static create(params: {
    name: string
    active?: boolean
  }): ProductCategoryModel {
    return new ProductCategoryModel(
      crypto.randomUUID(),
      params.name,
      params.active ?? true,
    )
  }
}
