import { Request, Response } from "express"
import Product from "../models/Product.model"
/*import { check, validationResult } from "express-validator"*/

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            /*order: [
                ['id', 'DESC']
            ], limit: 5,
            attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
            ,*/
        })
        res.json({ data: products })

    } catch (error) {
        res.status(500).json({ error: "500 Internal Server Error" })
    }
}

export const getProductsById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                Error: '404 Producto No Encontrado'
            })
        }

        res.json({ data: product })
    } catch (error) {
        res.status(500).json({ error: "500 Internal Server Error" })
    }
}

export const createProduct = async (req: Request, res: Response) => {

    //validations
    /*await check('name').notEmpty().withMessage('Product name is required')
        .run(req)
    await check('price').isNumeric().withMessage('Value not valid')
        .notEmpty().withMessage('Product name is required')
        .custom(value => value > 0).withMessage('Price not valid')
        .run(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() })
    }*/
    try {
        const product = await Product.create(req.body)
        res.status(201).json({ data: product })
    } catch (error) {
        res.status(500).json({ error: "500 Internal Server Error" })
    }


}

export const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                Error: '404 Producto No Encontrado'
            })
        }

        const updatedProduct = req.body
        await product.update(updatedProduct)
        await product.save()

        res.json({ data: product })
    } catch (error) {
        res.status(500).json({ error: "500 Internal Server Error" })
    }
}

export const updateAvailability = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                Error: '404 Producto No Encontrado'
            })
        }

        product.availability = req.body.availability
        await product.save()

        res.json({ data: product })
    } catch (error) {
        res.status(500).json({ error: "500 Internal Server Error" })
    }
}

export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                Error: '404 Producto No Encontrado'
            })
        }

        await product.destroy()

        res.json({ data: "Deleted Product" })
    } catch (error) {
        res.status(500).json({ error: "500 Internal Server Error" })
    }
}