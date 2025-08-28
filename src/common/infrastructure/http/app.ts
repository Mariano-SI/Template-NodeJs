import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { routes } from './routes'
import { errorHandler } from './middlewares/errorHandler'
import rateLimit from 'express-rate-limit'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mercado Livre Products Details API',
      version: '1.0.0',
    },
  },
  apis: ['./src/**/http/routes/docs/*.ts'],
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
})

const swaggerSpec = swaggerJSDoc(options)

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use(limiter)
app.use('/api', routes)
app.use(errorHandler)

export default app
