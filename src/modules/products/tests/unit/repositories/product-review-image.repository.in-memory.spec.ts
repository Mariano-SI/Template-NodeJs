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

  test('should get image urls by review id', async () => {
    const image1 = ProductReviewImageModel.create({
      product_review_id: 'review-id-1',
      image: 'https://example.com/image1.jpg',
    })
    const image2 = ProductReviewImageModel.create({
      product_review_id: 'review-id-1',
      image: 'https://example.com/image2.jpg',
    })
    const image3 = ProductReviewImageModel.create({
      product_review_id: 'review-id-2',
      image: 'https://example.com/image3.jpg',
    })
    await repo.create(image1)
    await repo.create(image2)
    await repo.create(image3)

    const urls = await repo.getImageUrlByReviewId('review-id-1')
    expect(urls).toEqual([
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ])
    const urls2 = await repo.getImageUrlByReviewId('review-id-2')
    expect(urls2).toEqual(['https://example.com/image3.jpg'])
    const urlsEmpty = await repo.getImageUrlByReviewId('review-id-unknown')
    expect(urlsEmpty).toEqual([])
  })
})
