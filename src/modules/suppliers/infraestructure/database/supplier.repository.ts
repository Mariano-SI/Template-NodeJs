import { promises as fs } from 'fs'
import { SupplierModel } from '../../domain/models/supplier.model'
import { SuppliersRepository } from '../../domain/repositories/supplier.repository'

export class SupplierRepositoryJson implements SuppliersRepository {
  private static instance: SupplierRepositoryJson
  private filePath = `${process.env.DB_FOLDER_PATH || 'src/common/infrastructure/database'}/suppliers.json`

  static getInstance(): SupplierRepositoryJson {
    if (!SupplierRepositoryJson.instance) {
      SupplierRepositoryJson.instance = new SupplierRepositoryJson()
    }
    return SupplierRepositoryJson.instance
  }

  async findById(id: string): Promise<SupplierModel | null> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const suppliers: SupplierModel[] = JSON.parse(data)
    const supplier = suppliers.find(s => s.id === id)
    return supplier ? supplier : null
  }

  async create(supplier: SupplierModel): Promise<void> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const suppliers: SupplierModel[] = data ? JSON.parse(data) : []
    suppliers.push(supplier)
    await fs.writeFile(
      this.filePath,
      JSON.stringify(suppliers, null, 2),
      'utf-8',
    )
  }

  async findByName(name: string): Promise<SupplierModel | null> {
    const data = await fs.readFile(this.filePath, 'utf-8')
    const suppliers: SupplierModel[] = JSON.parse(data)
    const supplier = suppliers.find(s => s.name === name)
    return supplier ? supplier : null
  }
}
