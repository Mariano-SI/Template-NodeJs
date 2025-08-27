import { SuppliersRepository } from '@/modules/suppliers/domain/repositories/supplier.repository'
import { SupplierModel } from '@/modules/suppliers/domain/models/supplier.model'
import { ConflictError } from '@/common/domain/errors/conflict-error'

type Input = {
  name: string
  description: string
  active?: boolean
}

type Output = SupplierModel

export default class CreateSupplierUseCase {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async execute(input: Input): Promise<Output> {
    const existingSupplier = await this.suppliersRepository.findByName(
      input.name,
    )
    if (existingSupplier) {
      throw new ConflictError('Supplier with this name already exists')
    }

    const supplier = SupplierModel.create({
      name: input.name,
      description: input.description,
      active: input.active,
    })

    await this.suppliersRepository.create(supplier)
    return supplier
  }
}
