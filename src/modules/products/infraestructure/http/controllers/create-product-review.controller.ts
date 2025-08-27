import { Request, Response } from 'express'
import { ProductRepositoryJson } from '../../database/product.repository.json'
import { CloudflareR2Uploader } from '@/common/infrastructure/providers/uploader-provider.cloudflareR2'
import { validateCreateReviewRequest } from '../validators/create-product-review.validator'
import CreateProductReviewUseCase from '@/modules/products/application/usecases/create-product-review.usecase'
import { ProductReviewRepositoryJson } from '../../database/product-review.repository.json'
import { ProductReviewImageRepositoryJson } from '../../database/product-review-image.repository.json'

export async function createProductReviewController(
  request: Request,
  response: Response,
): Promise<Response> {
  const { rating, description, productId } =
    validateCreateReviewRequest(request)

  const productRepository = ProductRepositoryJson.getInstance()
  const productReviewRepository = ProductReviewRepositoryJson.getInstance()
  const productReviewImageRepository =
    ProductReviewImageRepositoryJson.getInstance()

  const imageUploader = new CloudflareR2Uploader()

  const createProductReviewUseCase = new CreateProductReviewUseCase(
    productRepository,
    productReviewRepository,
    productReviewImageRepository,
    imageUploader,
  )
  const productReview = await createProductReviewUseCase.execute({
    rating,
    description,
    productId,
    files: request.files,
  })

  return response.status(201).json(productReview)
}
