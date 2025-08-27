export class SupplierModel {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public active: boolean,
    public created_at: string,
    public created_by: string,
    public updated_at?: string,
    public updated_by?: string,
    public inactivated_at?: string,
  ) {}

  static create(params: {
    name: string
    description: string
    active?: boolean
  }): SupplierModel {
    return new SupplierModel(
      crypto.randomUUID(),
      params.name,
      params.description,
      params.active ?? true,
      new Date().toISOString(),
      'system',
    )
  }
}
