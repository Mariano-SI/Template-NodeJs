import { checkDatabaseConnection } from '../database'
import { env } from '../env'
import app from './app'

async function startServer() {
  await checkDatabaseConnection()

  app.listen(env.PORT, () => {
    console.log('Server is running on port ', env.PORT)
    console.log(`API docs available at GET ${env.PORT}/docs`)
  })
}
startServer()
