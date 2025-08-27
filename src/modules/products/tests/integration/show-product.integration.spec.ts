import { createMocks } from 'node-mocks-http'
import { showProductDetailsController } from '../../infraestructure/http/controllers/show-product-details.controller'

describe('GET /api/products/:id', () => {
  const existentProductId = '3441a643-ed3d-4c45-bcce-e69139c4d7f5'
  const anotherExistentProductWithoutSupplier =
    '1224900d-3d82-456f-9870-f90b40d47519'
  const inexistetProductId = '8ff3a119-3d69-49f1-8342-c78fd6e8e82e'
  test('should return product details for a valid id', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: existentProductId },
    })
    await showProductDetailsController(req, res)
    expect(res.statusCode).toBe(200)
    const response = JSON.parse(res._getData())

    expect(response.id).toBe(existentProductId)
    expect(response.name).toBe('INTEGRATION TEST DEFAULT PRODUCT')
    expect(response.description).toBeDefined()
    expect(response.active).toBe(true)
    expect(response.created_at).toBeDefined()
    expect(response.created_by).toBeDefined()
    expect(response.updated_at).toBeDefined()
    expect(response.updated_by).toBeDefined()
    expect(response.inactivated_at).toBeNull()

    expect(Array.isArray(response.variants)).toBe(true)
    expect(response.variants.length).toBeGreaterThan(0)
    const variant = response.variants[0]
    expect(variant.product_id).toBe(existentProductId)
    expect(variant.price).toBe(3999.99)
    expect(variant.quantity).toBe(10)
    expect(typeof variant.active).toBe('boolean')
    expect(JSON.parse(variant.attributes)).toEqual({
      color: 'Preto',
      storage: '128GB',
    })

    expect(Array.isArray(response.images)).toBe(true)
    expect(response.images.length).toBeGreaterThan(0)
    const image = response.images[0]
    expect(image.productId).toBe(existentProductId)
    expect(typeof image.image).toBe('string')
    expect(image.main).toBe(true)
    expect(image.createdAt).toBeDefined()
    expect(image.createdBy).toBeDefined()

    expect(Array.isArray(response.categories)).toBe(true)
    expect(response.categories.length).toBeGreaterThanOrEqual(2)
    const categoryNames = response.categories.map((cat: any) => cat.name)
    expect(categoryNames).toContain('Acessórios')
    expect(categoryNames).toContain('Informática')

    expect(response.supplier).toBeDefined()
    expect(response.supplier.id).toBe('abf792bc-aad9-469c-a392-026252785b9c')
    expect(response.supplier.name).toBe('INTEGRATION TEST DEFAULT SUPPLIER')
    expect(response.supplier.description).toBe(
      'Supplier utilizado como padrão nos testes de integração.',
    )
    expect(response.supplier.active).toBe(true)
    expect(response.supplier.created_at).toBe('2024-01-01T09:00:00Z')
    expect(response.supplier.created_by).toBe('admin')
    expect(response.supplier.updated_at).toBe('2024-06-01T12:00:00Z')
    expect(response.supplier.updated_by).toBe('admin')
    expect(response.supplier.inactivated_at).toBeNull()
  })

  test('should return 404 for non-existent product id', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: inexistetProductId },
    })

    let thrownError: any
    try {
      await showProductDetailsController(req, res)
    } catch (error) {
      console.log('error', error.message)
      thrownError = error
    }
    expect(thrownError).toBeDefined()
    expect(thrownError.statusCode).toBe(404)
    expect(thrownError.message).toBeDefined()
    expect(thrownError.message).toBe('Product not found')
  })

  test('should return 404 if supplier does not exist for a valid product', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: anotherExistentProductWithoutSupplier },
    })

    let thrownError: any
    try {
      await showProductDetailsController(req, res)
    } catch (error) {
      thrownError = error
    }
    expect(thrownError).toBeDefined()
    expect(thrownError.statusCode).toBe(404)
    expect(thrownError.message).toBe('Supplier not found')
  })

  test('should return 400 for invalid product id format', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: 'invalid-id-format' },
    })

    let thrownError: any
    try {
      await showProductDetailsController(req, res)
    } catch (error) {
      thrownError = error
    }
    expect(thrownError).toBeDefined()
    expect(thrownError.statusCode).toBe(400)
    expect(thrownError.message).toBeDefined()
    expect(thrownError.message).toMatch(/invalid/i)
  })

  test('should return 400 if query param includeInactive is not boolean', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      params: { id: existentProductId },
      query: { includeInactive: 'notABoolean' },
    })

    let thrownError: any
    try {
      await showProductDetailsController(req, res)
    } catch (error) {
      thrownError = error
    }
    expect(thrownError).toBeDefined()
    expect(thrownError.statusCode).toBe(400)
    expect(thrownError.message).toBeDefined()
    expect(thrownError.message).toMatch(/includeInactive.*boolean/i)
  })
})
