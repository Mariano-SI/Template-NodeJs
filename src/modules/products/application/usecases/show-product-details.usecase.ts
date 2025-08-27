import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { ProductsRepository } from '../../domain/repositories/products.repository'
import { ProductDetailsOutputDto } from '../dtos/product-details-output.dto'
import { ProductVariantsRepository } from '../../domain/repositories/product-variants.repository'

type Input = {
  id: string
  includeInactive?: boolean
}
type Output = ProductDetailsOutputDto

export default class ShowProductDetailsUseCase {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: ProductVariantsRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const { id, includeInactive } = input
    const product = await this.productsRepository.findById(id, includeInactive)

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    const variants = await this.variantsRepository.findByProductId(product.id)

    return new ProductDetailsOutputDto({
      ...product,
      variants,
      // images,
      // supplier,
    })
  }
}
