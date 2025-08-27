import { createMocks } from 'node-mocks-http'
import { createSupplierController } from '@/modules/suppliers/infraestructure/http/controllers/create-supplier.controller'

describe('Supplier Integration Controller Tests', () => {
  const invalidEntries = [
    {},
    { name: '', description: 'desc' },
    { name: 'A', description: 'desc' },
    { name: 'Valid Name', description: '' },
    { name: 'Valid Name', description: '1234' },
    { name: 123, description: 'desc' },
    { name: 'Valid Name', description: 123 },
    null,
    undefined,
    [],
  ]
  test('should create a supplier and return 201', async () => {
    const name = `Supplier Test ${Date.now()}`
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name,
        description: 'description for integration test',
      },
    })
    await createSupplierController(req, res)

    expect(res.statusCode).toBe(201)
    const response = JSON.parse(res._getData())
    expect(response.name).toBe(name)
    expect(response.description).toBe('description for integration test')
  })
  test('should not allow duplicate supplier names', async () => {
    const sameName = `Supplier Test ${Date.now()}`
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: sameName,
        description: 'description for integration test',
      },
    })
    await createSupplierController(req, res)

    const { req: req2, res: res2 } = createMocks({
      method: 'POST',
      body: {
        name: sameName,
        description: 'another description',
      },
    })

    let thrownError: any
    try {
      await createSupplierController(req2, res2)
    } catch (error) {
      thrownError = error
    }
    expect(thrownError).toBeDefined()
    expect(thrownError.statusCode).toBe(409)
    expect(thrownError.message).toMatch(/already exists/i)
  })

  test.each(invalidEntries)(
    'should return 400 for invalid body: %p',
    async invalidBody => {
      const { req, res } = createMocks({
        method: 'POST',
        body: invalidBody,
      })
      let thrownError: any
      try {
        await createSupplierController(req, res)
      } catch (error) {
        thrownError = error
      }
      expect(thrownError).toBeDefined()
      expect(thrownError.statusCode).toBe(400)
      expect(thrownError.message).toBeDefined()
    },
  )
})
