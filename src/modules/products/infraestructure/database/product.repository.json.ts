import { promises as fs } from 'fs'
import { ProductModel } from '../../domain/models/product.model'
import { ProductsRepository } from '../../domain/repositories/products.repository'

export class ProductRepositoryJson implements ProductsRepository {
  private static instance: ProductRepositoryJson
  private filePath = 'src/common/infrastructure/database/products.json'

  static getInstance(): ProductRepositoryJson {
    if (!ProductRepositoryJson.instance) {
      ProductRepositoryJson.instance = new ProductRepositoryJson()
    }
    return ProductRepositoryJson.instance
  }

  async findById(
    id: string,
    includeInactive?: boolean,
  ): Promise<ProductModel | null> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const products: ProductModel[] = JSON.parse(data)
    const product = products.find(p => {
      if (p.id !== id) return false
      if (!includeInactive && !p.active) return false
      return true
    })
    return product ? product : null
  }

  async findByName(name: string): Promise<ProductModel | null> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const products: ProductModel[] = JSON.parse(data)
    const product = products.find(p => p.name === name)
    return product ? product : null
  }

  async create(product: ProductModel): Promise<ProductModel> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const products: ProductModel[] = JSON.parse(data)
    products.push(product)
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2))
    return product
  }
}
