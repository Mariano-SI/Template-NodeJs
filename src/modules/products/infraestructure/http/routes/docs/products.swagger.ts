/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retorna todos os detalhes de um produto, incluindo variantes, imagens, categorias, fornecedor, avaliações e nota média.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           default: 760322bd-85fb-4ba6-95ae-8d549db59211
 *         description: UUID do produto
 *       - in: query
 *         name: include_inactives
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
 *                 average_rating: { type: number, example: 3.5, description: "Nota média calculada a partir das avaliações" }
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
 *                       active: { type: boolean }
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       product_id: { type: string }
 *                       rating: { type: integer }
 *                       description: { type: string }
 *                       created_at: { type: string, format: date-time }
 *                       created_by: { type: string }
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                           format: uri
 *       400:
 *         description: Parâmetros inválidos
 *       404:
 *         description: Produto não encontrado ou fornecedor não encontrado
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   name: { type: string }
 *                   description: { type: string }
 *                   active: { type: boolean }
 *                   supplier_id: { type: string }
 *                   created_at: { type: string, format: date-time }
 *                   created_by: { type: string }
 *                   updated_at: { type: string, format: date-time, nullable: true }
 *                   updated_by: { type: string, nullable: true }
 *                   inactivated_at: { type: string, format: date-time, nullable: true }
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Smartphone Samsung Galaxy S23
 *               description:
 *                 type: string
 *                 example: Smartphone com tela AMOLED, 128GB, câmera tripla.
 *               active:
 *                 type: boolean
 *                 example: true
 *               product_type_id:
 *                 type: string
 *                 example: type-smartphone
 *               supplier_id:
 *                 type: string
 *                 format: uuid
 *                 example: 5d44b7b7-375d-4e0b-ae00-53d4355d6e79
 *               variants:
 *                 type: string
 *                 description: "Array de variantes em formato JSON string. Exemplo: '[{\"price\":3999.99,\"quantity\":10,\"attributes\":\"{\\\"color\\\":\\\"Black\\\",\\\"storage\\\":\\\"128GB\\\"}\"}]'"
 *                 example: '[{"price":3999.99,"quantity":10,"attributes":"{\"color\":\"Black\",\"storage\":\"128GB\"}"}]'
 *               categories:
 *                 type: string
 *                 description: "Array de IDs de categorias em formato JSON string. Exemplo: '[\"e6e1e1c2-1a2b-4c3d-8e4f-1a2b3c4d5e01\",\"b9b4b4f5-4d5e-7f8a-1b2c-4d5e6f7a8b04\"]'"
 *                 example: '["e6e1e1c2-1a2b-4c3d-8e4f-1a2b3c4d5e01","b9b4b4f5-4d5e-7f8a-1b2c-4d5e6f7a8b04"]'
 *               photo:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: "Imagens do produto (até 10 arquivos)"
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
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
 *                 updated_at: { type: string, format: date-time, nullable: true }
 *                 updated_by: { type: string, nullable: true }
 *                 inactivated_at: { type: string, format: date-time, nullable: true }
 *                 variants:
 *                   type: array
 *                   items:
 *                     type: object
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Produto já existe
 *
 *     x-formData-tip: |
 *       Para enviar imagens junto com os dados do produto, use o formato **form-data** no Postman ou na sua ferramenta de API.
 *       - Campos simples (name, description, etc): tipo **Text**
 *       - Campos complexos (variants, categories): envie como **string JSON**
 *       - Imagens: campo **photo** (tipo File, pode enviar múltiplos arquivos)
 */

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   post:
 *     summary: Cria um review para um produto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 5
 *               description:
 *                 type: string
 *                 example: "Ótimo produto!"
 *               photo:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: "Imagens do review (até 10 arquivos)"
 *     responses:
 *       201:
 *         description: Review criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 product_id: { type: string }
 *                 rating: { type: integer }
 *                 description: { type: string }
 *                 created_at: { type: string, format: date-time }
 *                 created_by: { type: string }
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Produto não encontrado
 */
