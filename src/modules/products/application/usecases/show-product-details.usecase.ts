import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { ProductsRepository } from '../../domain/repositories/products.repository'
import { ProductDetailsOutputDto } from '../dtos/product-details-output.dto'
import { ProductVariantsRepository } from '../../domain/repositories/product-variants.repository'
import { ProductImagesRepository } from '../../domain/repositories/product-images.repository'
import { SuppliersRepository } from '@/modules/suppliers/domain/repositories/supplier.repository'
import { ProductCategorizationRepository } from '../../domain/repositories/product-categorization.repository'
import { ProductCategoryRepository } from '../../domain/repositories/product-category-repository'
import { ProductReviewRepository } from '../../domain/repositories/product-review.repository'
import { ProductReviewImageRepository } from '../../domain/repositories/product-review-image.repository'

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
    private readonly productReviewRepository: ProductReviewRepository,
    private readonly productReviewImageRepository: ProductReviewImageRepository,
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

    const productReviews = await this.productReviewRepository.findByProductId(
      product.id,
    )
    const reviewsWithImages = []
    for (const review of productReviews) {
      const images =
        await this.productReviewImageRepository.getImageUrlByReviewId(review.id)
      reviewsWithImages.push({
        id: review.id,
        product_id: review.product_id,
        rating: review.rating,
        description: review.description,
        created_at: review.created_at,
        created_by: review.created_by,
        images,
      })
    }

    const average_rating =
      productReviews.length > 0
        ? await this.productReviewRepository.findAverageRatingByProductId(
            product.id,
          )
        : 0

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
      average_rating,
      reviews: reviewsWithImages,
    })
  }
}
