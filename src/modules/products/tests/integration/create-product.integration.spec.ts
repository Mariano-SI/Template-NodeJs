import { createMocks } from 'node-mocks-http'
import { createProductController } from '../../infraestructure/http/controllers/create-product.controller'

const invalidEntries = [
  {},
  {
    name: '',
    description: 'desc',
    supplier_id: 'abf792bc-aad9-469c-a392-026252785b9c',
    variants: [],
    categories: [],
  },
  {
    name: 'A',
    description: 'desc',
    supplier_id: 'abf792bc-aad9-469c-a392-026252785b9c',
    variants: [],
    categories: [],
  },
  {
    name: 'Valid Name',
    description: '',
    supplier_id: 'abf792bc-aad9-469c-a392-026252785b9c',
    variants: [],
    categories: [],
  },
  {
    name: 'Valid Name',
    description: '1234',
    supplier_id: 'abf792bc-aad9-469c-a392-026252785b9c',
    variants: [],
    categories: [],
  },
  {
    name: 123,
    description: 'desc',
    supplier_id: 'abf792bc-aad9-469c-a392-026252785b9c',
    variants: [],
    categories: [],
  },
  {
    name: 'Valid Name',
    description: 123,
    supplier_id: 'abf792bc-aad9-469c-a392-026252785b9c',
    variants: [],
    categories: [],
  },
  null,
  undefined,
  [],
]
describe('POST /api/products', () => {
  test('should create a product and return 201', async () => {
    const now = Date.now()
    const productName = `INTEGRATION TEST PRODUCT ${now}`
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: productName,
        description: 'Produto criado via teste de integração',
        active: true,
        supplier_id: 'abf792bc-aad9-469c-a392-026252785b9c',
        variants: [
          {
            price: 3999.99,
            quantity: 10,
            attributes: JSON.stringify({ color: 'Preto', storage: '128GB' }),
            active: true,
          },
        ],
        categories: [
          'b9b4b4f5-4d5e-7f8a-1b2c-4d5e6f7a8b04',
          'c0c5c5a6-5e6f-8a9b-2c3d-5e6f7a8b9c05',
        ],
      },
      files: {},
    })
    await createProductController(req, res)
    expect(res.statusCode).toBe(201)
    const response = JSON.parse(res._getData())
    expect(response.name).toBe(productName)
    expect(response.description).toBe('Produto criado via teste de integração')
    expect(response.active).toBe(true)
    expect(response.supplier_id).toBe('abf792bc-aad9-469c-a392-026252785b9c')
    expect(response.id).toBeDefined()
    expect(Array.isArray(response.variants)).toBe(true)
    expect(response.variants.length).toBe(1)
    expect(response.variants[0].price).toBe(3999.99)
    expect(response.variants[0].quantity).toBe(10)
    expect(typeof response.variants[0].active).toBe('boolean')
    expect(typeof response.variants[0].attributes).toBe('string')

    expect(Array.isArray(response.images)).toBe(true)
    expect(response.images.length).toBe(0)

    expect(Array.isArray(response.categories)).toBe(true)
    expect(response.categories).toEqual([
      'b9b4b4f5-4d5e-7f8a-1b2c-4d5e6f7a8b04',
      'c0c5c5a6-5e6f-8a9b-2c3d-5e6f7a8b9c05',
    ])
  })
  test.each(invalidEntries)(
    'should return 400 for invalid product input: %p',
    async invalidBody => {
      const { req, res } = createMocks({
        method: 'POST',
        body: invalidBody,
        files: {},
      })
      let thrownError: any
      try {
        await createProductController(req, res)
      } catch (error) {
        thrownError = error
      }
      expect(thrownError).toBeDefined()
      expect(thrownError.statusCode).toBe(400)
      expect(thrownError.message).toBeDefined()
    },
  )

  test('should return 409 if product already exists', async () => {
    const productBody = {
      name: 'INTEGRATION TEST DEFAULT PRODUCT',
      description: 'Smartphone com tela AMOLED, 128GB, câmera tripla.',
      active: true,
      supplier_id: 'abf792bc-aad9-469c-a392-026252785b9c',
      variants: [
        {
          price: 3999.99,
          quantity: 10,
          attributes: JSON.stringify({ color: 'Preto', storage: '128GB' }),
          active: true,
        },
      ],
      categories: [
        'b9b4b4f5-4d5e-7f8a-1b2c-4d5e6f7a8b04',
        'c0c5c5a6-5e6f-8a9b-2c3d-5e6f7a8b9c05',
      ],
    }

    const { req, res } = createMocks({
      method: 'POST',
      body: productBody,
      files: {},
    })

    let thrownError: any
    try {
      await createProductController(req, res)
    } catch (error) {
      thrownError = error
    }
    expect(thrownError).toBeDefined()
    expect(thrownError.statusCode).toBe(409)
    expect(thrownError.message).toMatch(/already exists/i)
  })
})
