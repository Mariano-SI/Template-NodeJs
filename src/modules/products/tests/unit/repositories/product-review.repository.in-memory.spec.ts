import { ProductReviewRepositoryInMemory } from '../mocks/product-review.repository.in-memory'
import { ProductReviewModel } from '@/modules/products/domain/models/product.review.model'

describe('ProductReviewRepositoryInMemory', () => {
  let repo: ProductReviewRepositoryInMemory

  beforeEach(() => {
    repo = new ProductReviewRepositoryInMemory()
  })

  test('should create a product review', async () => {
    const review = ProductReviewModel.create({
      product_id: 'product-id-1',
      rating: 5,
      description: 'Ótimo produto!',
    })
    const result = await repo.create(review)
    expect(result).toBe(review)
    expect(repo.items).toContain(review)
  })
})
