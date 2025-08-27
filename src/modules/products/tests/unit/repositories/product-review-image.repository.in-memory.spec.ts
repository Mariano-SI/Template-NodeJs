import { ProductReviewImageRepositoryInMemory } from '../mocks/product-review-image.repository.in-memory'
import { ProductReviewImageModel } from '@/modules/products/domain/models/product.review.image.model'

describe('ProductReviewImageRepositoryInMemory', () => {
  let repo: ProductReviewImageRepositoryInMemory

  beforeEach(() => {
    repo = new ProductReviewImageRepositoryInMemory()
  })

  test('should create a product review image', async () => {
    const image = ProductReviewImageModel.create({
      product_review_id: 'review-id-1',
      image: 'https://example.com/image.jpg',
    })
    const result = await repo.create(image)
    expect(result).toBe(image)
    expect(repo.items).toContain(image)
  })
})
