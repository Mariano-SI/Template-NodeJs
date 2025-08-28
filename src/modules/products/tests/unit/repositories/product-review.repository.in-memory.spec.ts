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
  test('should find reviews by product id', async () => {
    const review1 = ProductReviewModel.create({
      product_id: 'product-id-1',
      rating: 5,
      description: 'Ótimo produto!',
    })
    const review2 = ProductReviewModel.create({
      product_id: 'product-id-1',
      rating: 4,
      description: 'Bom produto!',
    })
    const review3 = ProductReviewModel.create({
      product_id: 'product-id-2',
      rating: 3,
      description: 'Produto regular.',
    })
    await repo.create(review1)
    await repo.create(review2)
    await repo.create(review3)

    const found = await repo.findByProductId('product-id-1')
    expect(found).toHaveLength(2)
    expect(found).toEqual(expect.arrayContaining([review1, review2]))
  })

  test('should calculate average rating rounded to .5', async () => {
    const review1 = ProductReviewModel.create({
      product_id: 'product-id-1',
      rating: 5,
      description: 'Ótimo produto!',
    })
    const review2 = ProductReviewModel.create({
      product_id: 'product-id-1',
      rating: 2,
      description: 'Ruim!',
    })
    await repo.create(review1)
    await repo.create(review2)

    const avg = await repo.findAverageRatingByProductId('product-id-1')
    expect(avg).toBe(3.5)
  })
})
