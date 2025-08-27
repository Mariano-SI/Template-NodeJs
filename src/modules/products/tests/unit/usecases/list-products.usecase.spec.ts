import ListProductsUseCase from '@/modules/products/application/usecases/list-products.usecase'
import { ProductsInMemoryRepository } from '../mocks/product.repository.in-memory'
import { ProductModel } from '@/modules/products/domain/models/product.model'

const mockCacheProvider = {
  save: jest.fn(),
  recover: jest.fn() as jest.Mock,
  invalidate: jest.fn(),
}

describe('ListProductsUseCase Unit Tests', () => {
  let sut: ListProductsUseCase
  let productsRepository: ProductsInMemoryRepository

  beforeEach(() => {
    productsRepository = new ProductsInMemoryRepository()
    sut = new ListProductsUseCase(productsRepository, mockCacheProvider)
    jest.clearAllMocks()
  })

  it('should return products from cache if available', async () => {
    const products = [
      ProductModel.create({
        name: 'P1',
        description: 'desc',
        supplier_id: 's1',
      }),
      ProductModel.create({
        name: 'P2',
        description: 'desc',
        supplier_id: 's2',
      }),
    ]
    mockCacheProvider.recover.mockResolvedValueOnce(products)
    const result = await sut.execute()
    expect(result).toEqual(products)
    expect(mockCacheProvider.recover).toHaveBeenCalledWith('products:all')
    expect(mockCacheProvider.save).not.toHaveBeenCalled()
  })

  it('should return products from repository and save to cache if cache is empty', async () => {
    mockCacheProvider.recover.mockResolvedValueOnce(null)
    const product = ProductModel.create({
      name: 'P1',
      description: 'desc',
      supplier_id: 's1',
    })
    await productsRepository.create(product)
    const result = await sut.execute()
    expect(result).toEqual([product])
    expect(mockCacheProvider.save).toHaveBeenCalledWith('products:all', [
      product,
    ])
  })

  it('should return empty array if no products', async () => {
    mockCacheProvider.recover.mockResolvedValueOnce(null)
    const result = await sut.execute()
    expect(result).toEqual([])
    expect(mockCacheProvider.save).toHaveBeenCalledWith('products:all', [])
  })
})
