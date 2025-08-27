/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Cria um novo fornecedor
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Samsung
 *               description:
 *                 type: string
 *                 example: Fornecedor oficial de produtos Samsung.
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Fornecedor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 name: { type: string }
 *                 description: { type: string }
 *                 active: { type: boolean }
 *                 created_at: { type: string, format: date-time }
 *                 created_by: { type: string }
 *                 updated_at: { type: string, format: date-time, nullable: true }
 *                 updated_by: { type: string, nullable: true }
 *                 inactivated_at: { type: string, format: date-time, nullable: true }
 *       409:
 *         description: Já existe um fornecedor com esse nome
 *       400:
 *         description: Dados inválidos
 */
