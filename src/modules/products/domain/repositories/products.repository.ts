import { ProductModel } from '../models/product.model'

export interface ProductsRepository {
  findById(id: string, includeInactive?: boolean): Promise<ProductModel | null>
  findByName(name: string): Promise<ProductModel | null>
  create(product: ProductModel): Promise<ProductModel>
}
