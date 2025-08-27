import { Router } from 'express'
import { createSupplierController } from '../controllers/create-supplier.controller'

const suppliersRoutes = Router()

suppliersRoutes.post('/', createSupplierController)

export { suppliersRoutes }
