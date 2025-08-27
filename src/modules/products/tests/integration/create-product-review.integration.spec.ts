import { createMocks } from 'node-mocks-http'
import { createProductReviewController } from '@/modules/products/infraestructure/http/controllers/create-product-review.controller'

const existentProductId = '3441a643-ed3d-4c45-bcce-e69139c4d7f5'
const invalidEntries = [
  { description: [], rating: {} },
  { description: 'Produto sem avaliação', rating: 6 },
  { description: 'Produto com avaliação inválida', rating: 0 },
]

describe('POST /api/products/:id/reviews - Integration', () => {
  test('should create a product review and return 201', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      params: { id: existentProductId },
      body: {
        rating: 5,
        description: 'Ótimo produto!',
      },
      files: {},
    })
    await createProductReviewController(req, res)
    expect(res.statusCode).toBe(201)
    const response = JSON.parse(res._getData())
    expect(response.product_id).toBe(existentProductId)
    expect(response.rating).toBe(5)
    expect(response.description).toBe('Ótimo produto!')
    expect(Array.isArray(response.images)).toBe(true)
    expect(response.images.length).toBe(0)
    expect(response.id).toBeDefined()
    expect(response.created_at).toBeDefined()
    expect(response.created_by).toBeDefined()
  })

  test('should return 404 if product does not exist', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      params: { id: 'd404a392-c384-4157-a4eb-a89785ef1b31' },
      body: {
        rating: 4,
        description: 'Produto não existe',
      },
      files: {},
    })
    let thrownError: any
    try {
      await createProductReviewController(req, res)
    } catch (error) {
      thrownError = error
    }
    expect(thrownError).toBeDefined()
    expect(thrownError.statusCode).toBe(404)
    expect(thrownError.message).toMatch(/not found/i)
  })

  test.each(invalidEntries)(
    'should return 400 for invalid review input: %p',
    async invalidBody => {
      const { req, res } = createMocks({
        method: 'POST',
        params: { id: existentProductId },
        body: invalidBody,
        files: {},
      })
      let thrownError: any
      try {
        await createProductReviewController(req, res)
      } catch (error) {
        thrownError = error
      }
      expect(thrownError).toBeDefined()
      expect(thrownError.statusCode).toBe(400)
      expect(thrownError.message).toBeDefined()
    },
  )
})
