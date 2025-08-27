import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { ProductsRepository } from '../../domain/repositories/products.repository'
import { ProductDetailsOutputDto } from '../dtos/product-details-output.dto'
import { ProductVariantsRepository } from '../../domain/repositories/product-variants.repository'
import { ProductImagesRepository } from '../../domain/repositories/product-images.repository'
import { SuppliersRepository } from '@/modules/suppliers/domain/repositories/supplier.repository'

type Input = {
  id: string
  includeInactive?: boolean
}
type Output = ProductDetailsOutputDto

export default class ShowProductDetailsUseCase {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: ProductVariantsRepository,
    private readonly imagesRepository: ProductImagesRepository,
    private readonly suppliersRepository: SuppliersRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const { id, includeInactive } = input
    const product = await this.productsRepository.findById(id, includeInactive)

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    const [variants, images, supplier] = await Promise.all([
      this.variantsRepository.findByProductId(product.id),
      this.imagesRepository.findByProductId(product.id),
      this.suppliersRepository.findById(product.supplierId),
    ])

    if (!supplier) {
      throw new NotFoundError('Supplier not found')
    }

    return new ProductDetailsOutputDto({
      ...product,
      variants,
      images,
      supplier,
    })
  }
}
