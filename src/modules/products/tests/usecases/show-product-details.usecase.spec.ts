import ShowProductDetailsUseCase from '@/modules/products/application/usecases/show-product-details.usecase'
import { ProductsInMemoryRepository } from '../mocks/product.repository.in-memory'
import { ProductVariantsInMemoryRepository } from '../mocks/product-variants.repository.in-memory'
import { ProductImagesInMemoryRepository } from '../mocks/product-images.repository.in-memory'
import { SuppliersInMemoryRepository } from '@/modules/suppliers/infraestructure/tests/mocks/supplier.repository.in-memory'
import { ProductCategorizationInMemoryRepository } from '../mocks/product-categorization.repository.in-memory'
import { ProductCategoryInMemoryRepository } from '../mocks/product-category.repository.in-memory'
import { ProductModel } from '@/modules/products/domain/models/product.model'
import { ProductVariantModel } from '@/modules/products/domain/models/product.variant.model'
import { ProductImageModel } from '@/modules/products/domain/models/product.image.model'
import { ProductCategorizationModel } from '@/modules/products/domain/models/product.categorization.model'
import { ProductCategoryModel } from '@/modules/products/domain/models/product.category.model'
import { SupplierModel } from '@/modules/suppliers/domain/models/supplier.model'
import { NotFoundError } from '@/common/domain/errors/not-found-error'

describe('ShowProductDetailsUseCase Unit Tests', () => {
  let sut: ShowProductDetailsUseCase
  let productsRepository: ProductsInMemoryRepository
  let variantsRepository: ProductVariantsInMemoryRepository
  let imagesRepository: ProductImagesInMemoryRepository
  let suppliersRepository: SuppliersInMemoryRepository
  let categorizationRepository: ProductCategorizationInMemoryRepository
  let categoryRepository: ProductCategoryInMemoryRepository

  let product: ProductModel
  let supplier: SupplierModel
  let category: ProductCategoryModel

  beforeEach(async () => {
    productsRepository = new ProductsInMemoryRepository()
    variantsRepository = new ProductVariantsInMemoryRepository()
    imagesRepository = new ProductImagesInMemoryRepository()
    suppliersRepository = new SuppliersInMemoryRepository()
    categorizationRepository = new ProductCategorizationInMemoryRepository()
    categoryRepository = new ProductCategoryInMemoryRepository()

    sut = new ShowProductDetailsUseCase(
      productsRepository,
      variantsRepository,
      imagesRepository,
      suppliersRepository,
      categorizationRepository,
      categoryRepository,
    )

    supplier = SupplierModel.create({ name: 'Supplier 1', description: 'desc' })
    await suppliersRepository.create(supplier)

    product = ProductModel.create({
      name: 'Product 1',
      description: 'desc',
      supplier_id: supplier.id,
    })
    await productsRepository.create(product)

    category = ProductCategoryModel.create({ name: 'Category 1' })
    categoryRepository['items'].push(category)

    const variant = ProductVariantModel.create({
      product_id: product.id,
      price: 100,
      quantity: 2,
      attributes: { color: 'red' },
    })
    await variantsRepository.create(variant)

    const image = ProductImageModel.create({
      productId: product.id,
      image: 'image-url-1',
    })
    await imagesRepository.create(image)

    const categorization = ProductCategorizationModel.create({
      product_category_id: category.id,
      product_id: product.id,
    })
    await categorizationRepository.create(categorization)
  })

  it('should return product details with variants, images, categories and supplier', async () => {
    const result = await sut.execute({ id: product.id })
    expect(result.id).toBe(product.id)
    expect(result.name).toBe(product.name)
    expect(result.description).toBe(product.description)
    expect(result.supplier.id).toBe(product.supplier_id)
    expect(result.variants).toHaveLength(1)
    expect(result.variants[0].product_id).toBe(product.id)
    expect(result.variants[0].price).toBe(100)
    expect(result.variants[0].quantity).toBe(2)
    expect(result.variants[0].attributes).toEqual({ color: 'red' })
    expect(result.images).toHaveLength(1)
    expect(result.images[0].productId).toBe(product.id)
    expect(result.images[0].image).toBe('image-url-1')
    expect(result.categories).toHaveLength(1)
    expect(result.categories[0].id).toBe(category.id)
    expect(result.categories[0].name).toBe(category.name)
    expect(result.supplier.id).toBe(supplier.id)
    expect(result.supplier.name).toBe(supplier.name)
    expect(result.supplier.description).toBe(supplier.description)
  })

  it('should throw NotFoundError if product does not exist', async () => {
    await expect(sut.execute({ id: 'invalid-id' })).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })

  it('should throw NotFoundError if supplier does not exist', async () => {
    const newProduct = ProductModel.create({
      name: 'Product 2',
      description: 'desc',
      supplier_id: 'invalid-supplier',
    })
    await productsRepository.create(newProduct)
    await expect(sut.execute({ id: newProduct.id })).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })

  it('should return empty arrays for variants, images and categories if none exist', async () => {
    const product2 = ProductModel.create({
      name: 'Product 3',
      description: 'desc',
      supplier_id: supplier.id,
    })
    await productsRepository.create(product2)
    const result = await sut.execute({ id: product2.id })
    expect(result.variants).toEqual([])
    expect(result.images).toEqual([])
  })
})
