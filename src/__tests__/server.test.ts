import request from 'supertest'
import server, { connectionDB } from '../server'
import db from "../config/db"

describe('GET /api', () => {
    test('sould send back a json response', async () => {
        const res = await request(server).get('/api')
        //console.log(res)
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('From Api')
        //console.log(res.text)
        //console.log(res.body.msg)

        expect(res.status).not.toBe(404)
        expect(res.body.message).not.toBe('from api')
    })
})

jest.mock('../config/db')
describe('connectDB', () => {
    test('sould handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Error al conectar a la DB'))
        const consoleSpy = jest.spyOn(console, 'log')
        await connectionDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error al conectar a la DB')
        )
    })
})