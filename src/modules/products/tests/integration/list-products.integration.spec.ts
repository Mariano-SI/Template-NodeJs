import { createMocks } from 'node-mocks-http'
import { listProductsController } from '../../infraestructure/http/controllers/list-products.controller'

jest.mock('../../../../common/domain/providers/cache.provider', () => ({
  CacheProvider: {
    save: jest.fn(),
    recover: jest.fn().mockResolvedValue(null),
    invalidate: jest.fn(),
  },
}))

describe('GET /api/products', () => {
  test('should return a list of products', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })
    await listProductsController(req, res)
    expect(res.statusCode).toBe(200)
    const response = JSON.parse(res._getData())
    expect(Array.isArray(response)).toBe(true)
    expect(response.length).toBeGreaterThan(0)
    expect(response[0]).toHaveProperty('id')
    expect(response[0]).toHaveProperty('name')
    expect(response[0]).toHaveProperty('description')
  })
})
