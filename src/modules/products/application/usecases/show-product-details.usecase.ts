import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { ProductsRepository } from '../../domain/repositories/products.repository'
import { ProductDetailsOutputDto } from '../dtos/product-details-output.dto'
import { ProductVariantsRepository } from '../../domain/repositories/product-variants.repository'
import { ProductImagesRepository } from '../../domain/repositories/product-images.repository'
import { SuppliersRepository } from '@/modules/suppliers/domain/repositories/supplier.repository'
import { ProductCategorizationRepository } from '../../domain/repositories/product-categorization.repository'
import { ProductCategoryRepository } from '../../domain/repositories/product-category-repository'

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
    private readonly productCategorizationRepository: ProductCategorizationRepository,
    private readonly categoryRepository: ProductCategoryRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const { id, includeInactive } = input
    const product = await this.productsRepository.findById(id, includeInactive)

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    const [variants, images, supplier, productCategories] = await Promise.all([
      this.variantsRepository.findByProductId(product.id),
      this.imagesRepository.findByProductId(product.id),
      this.suppliersRepository.findById(product.supplier_id),
      this.productCategorizationRepository.findByProductId(product.id),
    ])

    console.log('productCategories', productCategories)

    if (!supplier) {
      throw new NotFoundError('Supplier not found')
    }

    const categories = await Promise.all(
      productCategories.map(async pc => {
        return await this.categoryRepository.findById(pc.product_category_id)
      }),
    )

    return new ProductDetailsOutputDto({
      ...product,
      variants,
      images,
      categories,
      supplier,
    })
  }
}
