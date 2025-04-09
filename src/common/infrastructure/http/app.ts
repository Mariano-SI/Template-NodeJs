import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { routes } from './routes'
import { errorHandler } from './middlewares/errorHandler'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Clean Arch Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./src/**/http/routes/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use('/api', routes)
app.use(errorHandler)

export default app
