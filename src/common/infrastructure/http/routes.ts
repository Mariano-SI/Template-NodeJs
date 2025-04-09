import { exampleRoutes } from '@/modules/example/infraestructure/http/routes/example.routes'
import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' })
})

routes.use('/example', exampleRoutes)

export { routes }
