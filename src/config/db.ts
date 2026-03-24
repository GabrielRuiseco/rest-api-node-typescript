import { Sequelize } from "sequelize-typescript";
import { config } from 'dotenv'
import Product from "../models/Product.model";

config()
const db = new Sequelize(process.env.DB_STRING_CONNECTION!, {
    models: [Product],
    logging: false
})

export default db