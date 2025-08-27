import { ProductsRepository } from '../../domain/repositories/products.repository'
import { UploaderProvider } from '@/common/domain/providers/uploader.provider'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { ProductReviewModel } from '../../domain/models/product.review.model'
import { ProductReviewRepository } from '../../domain/repositories/product-review.repository'
import { ProductReviewImageModel } from '../../domain/models/product.review.image.model'
import { ProductReviewImageRepository } from '../../domain/repositories/product-review-image.repository'

type Input = {
  productId: string
  rating: number
  description: string
  files?: Express.Multer.File[]
}

type Output = {
  id: string
  product_id: string
  rating: number
  description: string
  created_at: Date
  created_by: string
  images: string[]
}

export default class CreateProductReviewUseCase {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly productReviewRepository: ProductReviewRepository,
    private readonly ProductReviewImageRepository: ProductReviewImageRepository,
    private readonly imageUploader: UploaderProvider,
  ) {}

  async execute(input: Input): Promise<Output> {
    const product = await this.productRepository.findById(input.productId)

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    const productReview = ProductReviewModel.create({
      product_id: product.id,
      rating: input.rating,
      description: input.description,
    })

    const createdProductReview =
      await this.productReviewRepository.create(productReview)

    const imageUrls: string[] = []
    if (input.files && input.files.length > 0) {
      imageUrls.push(
        ...(await Promise.all(
          input.files.map(file =>
            this.imageUploader.upload({
              fileContent: file.buffer,
              fileName: file.originalname,
              fileType: file.mimetype,
            }),
          ),
        )),
      )
    }

    for (const url of imageUrls) {
      const image = ProductReviewImageModel.create({
        product_review_id: createdProductReview.id,
        image: url,
      })
      await this.ProductReviewImageRepository.create(image)
    }

    return {
      id: createdProductReview.id,
      product_id: createdProductReview.product_id,
      rating: createdProductReview.rating,
      description: createdProductReview.description,
      created_at: createdProductReview.created_at,
      created_by: createdProductReview.created_by,
      images: imageUrls,
    }
  }
}
