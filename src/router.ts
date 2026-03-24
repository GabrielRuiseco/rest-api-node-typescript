import { Router } from "express"
import { createProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./midleware/productMiddleware.js"
import { getProducts, getProductsById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product.js"

const router: Router = Router()
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