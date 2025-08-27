import CreateProductUseCase from '@/modules/products/application/usecases/create-product.usecase'
import { ProductsInMemoryRepository } from '../mocks/product.repository.in-memory'
import { ProductVariantsInMemoryRepository } from '../mocks/product-variants.repository.in-memory'
import { ProductImagesInMemoryRepository } from '../mocks/product-images.repository.in-memory'
import { ProductCategorizationInMemoryRepository } from '../mocks/product-categorization.repository.in-memory'
import { ProductCategoryInMemoryRepository } from '../mocks/product-category.repository.in-memory'
import { SuppliersInMemoryRepository } from '@/modules/suppliers/tests/unit/mocks/supplier.repository.in-memory'
import { SupplierModel } from '@/modules/suppliers/domain/models/supplier.model'
import { ProductCategoryModel } from '@/modules/products/domain/models/product.category.model'
import { ConflictError } from '@/common/domain/errors/conflict-error'
import { CacheProvider } from '@/common/domain/providers/cache.provider'
import { NotFoundError } from '@/common/domain/errors/not-found-error'

const mockUploader = {
  upload: jest.fn(
    async ({ _fileContent, fileName, _fileType }) => `url/${fileName}`,
  ),
}

const mockCacheProvider: CacheProvider = {
  save: jest.fn(),
  recover: jest.fn(),
  invalidate: jest.fn(),
}

describe('CreateProductUseCase Unit Tests', () => {
  let sut: CreateProductUseCase
  let productRepository: ProductsInMemoryRepository
  let variantsRepository: ProductVariantsInMemoryRepository
  let imagesRepository: ProductImagesInMemoryRepository
  let categorizationRepository: ProductCategorizationInMemoryRepository
  let categoryRepository: ProductCategoryInMemoryRepository
  let suppliersRepository: SuppliersInMemoryRepository
  let supplier: SupplierModel
  let category: ProductCategoryModel

  beforeEach(async () => {
    productRepository = new ProductsInMemoryRepository()
    variantsRepository = new ProductVariantsInMemoryRepository()
    imagesRepository = new ProductImagesInMemoryRepository()
    categorizationRepository = new ProductCategorizationInMemoryRepository()
    categoryRepository = new ProductCategoryInMemoryRepository()
    suppliersRepository = new SuppliersInMemoryRepository()
    sut = new CreateProductUseCase(
      productRepository,
      variantsRepository,
      imagesRepository,
      suppliersRepository,
      categorizationRepository,
      categoryRepository,
      mockUploader,
      mockCacheProvider,
    )
    supplier = SupplierModel.create({ name: 'Supplier 1', description: 'desc' })
    await suppliersRepository.create(supplier)
    category = ProductCategoryModel.create({ name: 'Category 1' })
    categoryRepository['items'].push(category)
    jest.clearAllMocks()
  })

  it('should create a product', async () => {
    const input = {
      name: 'Product 1',
      description: 'desc',
      supplier_id: supplier.id,
      product_type_id: 'type-1',
      variants: [],
      categories: [category.id],
    }
    const result = await sut.execute(input)
    expect(result.id).toBeDefined()
    expect(result.created_at).toBeDefined()
    expect(mockCacheProvider.invalidate).toHaveBeenCalledWith('products:all')
  })

  it('should not allow duplicate product names', async () => {
    const input = {
      name: 'Product 1',
      description: 'desc',
      supplier_id: supplier.id,
      product_type_id: 'type-1',
      variants: [],
      categories: [category.id],
    }
    await sut.execute(input)
    await expect(sut.execute(input)).rejects.toBeInstanceOf(ConflictError)
  })

  it('should throw error when supplier not found', async () => {
    const input = {
      name: 'Product 2',
      description: 'desc',
      supplier_id: 'invalid-supplier',
      product_type_id: 'type-1',
      variants: [],
      categories: [category.id],
    }
    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should throw error when category not found', async () => {
    const input = {
      name: 'Product 3',
      description: 'desc',
      supplier_id: supplier.id,
      product_type_id: 'type-1',
      variants: [],
      categories: ['invalid-category'],
    }
    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should upload images if files are provided', async () => {
    const input = {
      name: 'Product 4',
      description: 'desc',
      supplier_id: supplier.id,
      product_type_id: 'type-1',
      variants: [],
      categories: [category.id],
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
