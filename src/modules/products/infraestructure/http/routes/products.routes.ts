import { Router } from 'express'
import { showProductDetailsController } from '../controllers/show-product-details.controller'

const productsRoutes = Router()

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna os detalhes de um produto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do produto
 *       - in: query
 *         name: include_inactive
 *         required: false
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Incluir produtos inativos
 *     responses:
 *       200:
 *         description: Detalhes do produto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 name: { type: string }
 *                 description: { type: string }
 *                 active: { type: boolean }
 *                 product_type_id: { type: string }
 *                 supplier_id: { type: string }
 *                 created_at: { type: string, format: date-time }
 *                 created_by: { type: string }
 *                 updated_at: { type: string, format: date-time }
 *                 updated_by: { type: string }
 *                 inactivated_at: { type: string, format: date-time, nullable: true }
 *                 variants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       product_id: { type: string }
 *                       active: { type: boolean }
 *                       price: { type: number }
 *                       quantity: { type: number }
 *                       attributes: { type: string }
 *                       product_image_id: { type: string }
 *                       created_at: { type: string, format: date-time }
 *                       inactivated_at: { type: string, format: date-time, nullable: true }
 *                       updated_at: { type: string, format: date-time }
 *                       updated_by: { type: string }
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       product_id: { type: string }
 *                       image: { type: string }
 *                       main: { type: boolean }
 *                       active: { type: boolean }
 *                       created_at: { type: string, format: date-time }
 *                       created_by: { type: string }
 *                       inactivated_at: { type: string, format: date-time, nullable: true }
 *                       updated_at: { type: string, format: date-time }
 *                       updated_by: { type: string }
 *                 supplier:
 *                   type: object
 *                   properties:
 *                     id: { type: string }
 *                     name: { type: string }
 *                     description: { type: string }
 *                     active: { type: boolean }
 *                     created_at: { type: string, format: date-time }
 *                     created_by: { type: string }
 *                     updated_at: { type: string, format: date-time }
 *                     updated_by: { type: string }
 *                     inactivated_at: { type: string, format: date-time, nullable: true }
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       name: { type: string }
 *       400:
 *         description: Parâmetros inválidos
 *       404:
 *         description: Produto não encontrado ou fornecedor não encontrado
 */
productsRoutes.get('/:id', showProductDetailsController)

export { productsRoutes }
