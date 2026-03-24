import { validationResult } from "express-validator"
import { Request, Response } from "express"

export const handleInputErrors = (req: Request, res: Response, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() })
    }
    next()
}