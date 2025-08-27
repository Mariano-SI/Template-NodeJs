import { Router } from 'express'
import { listExampleController } from '../controllers/list-example.controller'
import { createExampleController } from '../controllers/create-example.controller'
import { listExamplesController } from '../controllers/list-examples.controller'

const exampleRoutes = Router()

exampleRoutes.get('/', listExamplesController)
exampleRoutes.get('/:id', listExampleController)
exampleRoutes.post('/', createExampleController)

export { exampleRoutes }
