import { productsRoutes } from '@/modules/products/infraestructure/http/routes/products.routes'
import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' })
})

routes.use('/products', productsRoutes)

export { routes }
