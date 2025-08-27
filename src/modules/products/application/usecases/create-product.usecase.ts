import { ProductsRepository } from '../../domain/repositories/products.repository'
import { ProductVariantsRepository } from '../../domain/repositories/product-variants.repository'
import { ProductImagesRepository } from '../../domain/repositories/product-images.repository'
import { SuppliersRepository } from '@/modules/suppliers/domain/repositories/supplier.repository'
import { ProductCategorizationRepository } from '../../domain/repositories/product-categorization.repository'
import { ProductCategoryRepository } from '../../domain/repositories/product-category-repository'
import { SupplierModel } from '@/modules/suppliers/domain/models/supplier.model'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { UploaderProvider } from '@/common/domain/providers/uploader.provider'
import { ProductModel } from '../../domain/models/product.model'
import { ProductImageModel } from '../../domain/models/product.image.model'
import { ProductVariantModel } from '../../domain/models/product.variant.model'
import { ProductCategorizationModel } from '../../domain/models/product.categorization.model'
import { CacheProvider } from '@/common/domain/providers/cache.provider'
import { ConflictError } from '@/common/domain/errors/conflict-error'
import { NotFoundError } from '@/common/domain/errors/not-found-error'

type Input = {
  name: string
  description: string
  active?: boolean
  supplier_id: string
  variants: any[]
  categories: string[]
  files?: Express.Multer.File[]
}

export default class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly productVariantsRepository: ProductVariantsRepository,
    private readonly productImagesRepository: ProductImagesRepository,
    private readonly suppliersRepository: SuppliersRepository,
    private readonly productCategorizationRepository: ProductCategorizationRepository,
    private readonly categoryRepository: ProductCategoryRepository,
    private readonly imageUploader: UploaderProvider,
    private readonly cacheProvider: CacheProvider,
  ) {}

  async execute(input: Input): Promise<any> {
    const productAlreadyExists = await this.productRepository.findByName(
      input.name,
    )

    if (productAlreadyExists) {
      throw new ConflictError('A product with this name already exists')
    }

    const supplier: SupplierModel | null =
      await this.suppliersRepository.findById(input.supplier_id)

    if (!supplier) {
      throw new NotFoundError('Supplier not found')
    }

    const product = ProductModel.create({
      name: input.name,
      description: input.description,
      active: input.active,
      supplier_id: input.supplier_id,
      created_by: 'system',
    })

    const createdProduct = await this.productRepository.create(product)

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
      const image = ProductImageModel.create({
        productId: createdProduct.id,
        image: url,
        main: false,
        created_by: 'system',
      })
      await this.productImagesRepository.create(image)
    }

    for (const variant of input.variants) {
      const variantModel = ProductVariantModel.create({
        product_id: createdProduct.id,
        price: variant.price,
        quantity: variant.quantity,
        attributes:
          typeof variant.attributes === 'string'
            ? JSON.parse(variant.attributes)
            : variant.attributes,
        active: variant.active,
      })
      await this.productVariantsRepository.create(variantModel)
    }

    for (const categoryId of input.categories) {
      const categoryExists = await this.categoryRepository.findById(categoryId)
      if (!categoryExists) {
        throw new NotFoundError(`Category not found: ${categoryId}`)
      }

      const categorization = ProductCategorizationModel.create({
        product_category_id: categoryId,
        product_id: createdProduct.id,
      })
      await this.productCategorizationRepository.create(categorization)
    }

    await this.cacheProvider.invalidate('products:all')

    return {
      ...product,
      variants: input.variants,
      images: imageUrls,
      categories: input.categories,
    }
  }
}
