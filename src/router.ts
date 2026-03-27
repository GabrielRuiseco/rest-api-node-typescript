import { Router } from "express"
import { createProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./midleware/productMiddleware"
import { getProducts, getProductsById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product"

const router: Router = Router()
/**
 *@swagger 
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product Name
 *                      example: Mouse
 *                  price:
 *                      type: number
 *                      description: The Product Price
 *                      example: 500
 *                  abailavility:
 *                      type: boolean
 *                      description: The Product Availability
 *                      example: true
 */

/**
 *@swagger 
 * /api/product:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products:
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successfull response     
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'          
 */

/**
*@swagger 
* /api/product/{id}:
*      get:
*          summary: Get a product by ID
*          tags:
*              - Products:
*          description: Return a product based on its unique ID
*          parameters:
*            - in: path
*              name: id
*              description: The ID of the product to retrieve
*              required: true
*              schema:
*                  type: integer
*          responses:
*              200:
*                  description: Successfull response     
*                  content:
*                      application/json:
*                          schema:
*                              $ref: '#/components/schemas/Product'
*              400:
*                  description: Bad Request - Invalid ID    
*              404:
*                  description: Not found              
*/

/**
*@swagger 
* /api/product:
*      post:
*          summary: Creates a new product
*          tags:
*              - Products:
*          description: Returns a ne record in the database
*          requestBody:
*               required: true
*               content:
*                   application/json:
*                       schema:
*                              type: object
*                              properties:
*                                  name:
*                                      type: string
*                                      example: "Mouse"
*                                  price:
*                                      type: number
*                                      example: 500
*          responses:
*              201:
*                  description: Product created Successfully      
*              400:
*                  description: Bad Request - Invalid input data         
*/

/**
*@swagger 
* /api/product/{id}:
*      put:
*          summary: Updates a product with user input
*          tags:
*              - Products:
*          description: Return the updated product
*          parameters:
*            - in: path
*              name: id
*              description: The ID of the product to retrieve
*              required: true
*              schema:
*                  type: integer
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                             type: object
*                             properties:
*                                 name:
*                                     type: string
*                                     example: "Mouse"
*                                 price:
*                                     type: number
*                                     example: 500
*                                 availability:
*                                     type: boolean
*                                     example: true
*          responses:
*              200:
*                  description: Successfull response     
*                  content:
*                      application/json:
*                          schema:
*                              $ref: '#/components/schemas/Product'
*              400:
*                  description: Bad Request - Invalid ID or invalid input data   
*              404:
*                  description: Not found              
*/

/**
*@swagger 
* /api/product/{id}:
*      patch:
*          summary: Updates product availability
*          tags:
*              - Products:
*          description: Return the updated product
*          parameters:
*            - in: path
*              name: id
*              description: The ID of the product to retrieve
*              required: true
*              schema:
*                  type: integer
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                             type: object
*                             properties:                     
*                                 availability:
*                                     type: boolean
*                                     example: true
*          responses:
*              200:
*                  description: Successfull response     
*                  content:
*                      application/json:
*                          schema:
*                              $ref: '#/components/schemas/Product'
*              400:
*                  description: Bad Request - Invalid ID or invalid input data   
*              404:
*                  description: Not found              
*/

/**
*@swagger 
* /api/product/{id}:
*      delete:
*          summary: Deletes a product
*          tags:
*              - Products:
*          description: Deletes a product from database
*          parameters:
*            - in: path
*              name: id
*              description: The ID of the product to retrieve
*              required: true
*              schema:
*                  type: integer
*          responses:
*              200:
*                  description: Successfull response     
*                  content:
*                      application/json:
*                          type: string
*                          value: 'Deleted Product'
*              400:
*                  description: Bad Request - Invalid ID or invalid input data   
*              404:
*                  description: Not found              
*/


//Routing
router.get('/', getProducts)
router.get('/:id',
    param('id').isInt().withMessage('not valid ID'),
    handleInputErrors,
    getProductsById)

router.post('/',
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isNumeric().withMessage('Value not valid')
        .notEmpty().withMessage('Product name is required')
        .custom(value => value > 0).withMessage('Price not valid'),
    handleInputErrors,
    createProduct)

router.put('/:id',
    param('id').isInt().withMessage('not valid ID'),
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isNumeric().withMessage('Value not valid')
        .notEmpty().withMessage('Product name is required')
        .custom(value => value > 0).withMessage('Price not valid'),
    body('availability')
        .isBoolean().withMessage('Availability value not valid'),
    handleInputErrors,
    updateProduct)

router.patch('/:id',
    param('id').isInt().withMessage('not valid ID'),
    body('availability')
        .isBoolean().withMessage('Availability value not valid'),
    handleInputErrors,
    updateAvailability)

router.delete('/:id',
    param('id').isInt().withMessage('not valid ID'),
    handleInputErrors,
    deleteProduct
)

export default router