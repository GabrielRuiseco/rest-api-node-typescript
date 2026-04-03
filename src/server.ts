import express from 'express'
import type { Express } from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUIiOptions } from './config/swagger';


//conect database
export async function connectionDB() {
    try {
        await db.authenticate()
        await db.sync()
        //console.log(colors.blue('Conexión exitosa a la DB'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Error al conectar a la DB'))
    }
}

connectionDB()

// Express Instance
const server: Express = express()

//allow connections
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('CORS Error'))
        }
    }
}

server.use(cors(corsOptions))

//read data from forms
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/product', router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUIiOptions))

export default server