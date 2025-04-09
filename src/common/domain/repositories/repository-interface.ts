export type SelectAllOutput<Model> = {
  items: Model[]
  total: number
}

export interface RepositoryInterface<Model, CreateProps> {
  create(props: CreateProps): Promise<Model>
  findById(id: string): Promise<Model>
  update(model: Model): Promise<Model>
  delete(id: string): Promise<void>
  selectAll(props?: any): Promise<SelectAllOutput<Model>>
}
