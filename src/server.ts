import express from 'express'
import type { Express } from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors'


//conect database
async function connectionDB() {
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

//read data from forms
server.use(express.json())
server.use('/api/product', router)

server.get('/api', (req, res) => {
    res.json({ msg: 'From Api' })
})


export default server