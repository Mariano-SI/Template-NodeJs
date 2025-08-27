import { Router } from 'express'
import { showProductDetailsController } from '../controllers/show-product-details.controller'
import upload from '@/common/infrastructure/upload/multer'
import { createProductController } from '../controllers/create-product.controller'
import { listProductsController } from '../controllers/list-products.controller'
import { createProductReviewController } from '../controllers/create-product-review.controller'

const productsRoutes = Router()

productsRoutes.get('/', listProductsController)

productsRoutes.get('/:id', showProductDetailsController)

productsRoutes.post('/', upload.array('photo', 10), createProductController)

productsRoutes.post(
  '/:id/reviews',
  upload.array('photo', 10),
  createProductReviewController,
)

export { productsRoutes }
