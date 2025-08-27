import CreateProductReviewUseCase from '@/modules/products/application/usecases/create-product-review.usecase'
import { ProductsInMemoryRepository } from '../mocks/product.repository.in-memory'
import { ProductReviewRepositoryInMemory } from '../mocks/product-review.repository.in-memory'
import { ProductReviewImageRepositoryInMemory } from '../mocks/product-review-image.repository.in-memory'
import { ProductModel } from '@/modules/products/domain/models/product.model'
import { NotFoundError } from '@/common/domain/errors/not-found-error'

const mockUploader = {
  upload: jest.fn(
    async ({ _fileContent, fileName, _fileType }) => `url/${fileName}`,
  ),
}

describe('CreateProductReviewUseCase Unit Tests', () => {
  let sut: CreateProductReviewUseCase
  let productsRepository: ProductsInMemoryRepository
  let reviewRepository: ProductReviewRepositoryInMemory
  let reviewImageRepository: ProductReviewImageRepositoryInMemory
  let product: ProductModel

  beforeEach(async () => {
    productsRepository = new ProductsInMemoryRepository()
    reviewRepository = new ProductReviewRepositoryInMemory()
    reviewImageRepository = new ProductReviewImageRepositoryInMemory()
    sut = new CreateProductReviewUseCase(
      productsRepository,
      reviewRepository,
      reviewImageRepository,
      mockUploader,
    )
    product = ProductModel.create({
      name: 'Product 1',
      description: 'desc',
      supplier_id: 'supplier-1',
    })
    await productsRepository.create(product)
    jest.clearAllMocks()
  })

  it('should create a product review', async () => {
    const input = {
      productId: product.id,
      rating: 5,
      description: 'Ótimo produto!',
    }
    const result = await sut.execute(input)
    expect(result.id).toBeDefined()
    expect(result.product_id).toBe(product.id)
    expect(result.rating).toBe(5)
    expect(result.description).toBe('Ótimo produto!')
    expect(result.images).toEqual([])
  })

  it('should throw error when product not found', async () => {
    const input = {
      productId: 'invalid-product-id',
      rating: 4,
      description: 'Bom produto!',
    }
    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should upload images if files are provided', async () => {
    const input = {
      productId: product.id,
      rating: 5,
      description: 'Produto com imagem!',
      files: [
        {
          buffer: Buffer.from('file-content'),
          originalname: 'img1.png',
          mimetype: 'image/png',
        } as any,
      ],
    }
    const result = await sut.execute(input)
    expect(result.images.length).toBe(1)
    expect(result.images[0]).toContain('img1.png')
    expect(mockUploader.upload).toHaveBeenCalled()
  })
})
