import { ProductModel } from '../models/product.model'

export interface ProductsRepository {
  findById(id: string, includeInactive?: boolean): Promise<ProductModel | null>
}
