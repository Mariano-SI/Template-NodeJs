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
 *         name: includeInactive
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
 *                 productTypeId: { type: string }
 *                 supplierId: { type: string }
 *                 createdAt: { type: string, format: date-time }
 *                 createdBy: { type: string }
 *                 updatedAt: { type: string, format: date-time }
 *                 updatedBy: { type: string }
 *                 inactivatedAt: { type: string, format: date-time, nullable: true }
 *                 variants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       productId: { type: string }
 *                       active: { type: boolean }
 *                       price: { type: number }
 *                       quantity: { type: number }
 *                       attributes: { type: string }
 *                       productImageId: { type: string }
 *                       createdAt: { type: string, format: date-time }
 *                       inactivatedAt: { type: string, format: date-time, nullable: true }
 *                       updatedAt: { type: string, format: date-time }
 *                       updatedBy: { type: string }
 *       400:
 *         description: Parâmetros inválidos
 *       404:
 *         description: Produto não encontrado
 */
productsRoutes.get('/:id', showProductDetailsController)

export { productsRoutes }
