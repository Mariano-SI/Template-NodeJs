import { createMocks } from 'node-mocks-http'
import { createProductController } from '../../infraestructure/http/controllers/create-product.controller'

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
  })
  //faltam casos: 
  // each nas entradas inavalidas
  // produto ja existir
})
