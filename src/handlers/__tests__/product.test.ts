import request from 'supertest'
import server from '../../server'


describe('POST /api', () => {
    //this should be tested using QA database.
    //for this time as no real project will be tested in prod Database
    test('should create a new product', async () => {
        const res = await request(server).post('/api/product').send({
            name: "Mouse - testing",
            price: 200
        })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('error')
    })

    test('should display validation errors', async () => {
        const res = await request(server).post('/api/product').send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(4)

        expect(res.status).not.toBe(201)
        expect(res.body).not.toHaveProperty('data')
        expect(res.body.errors).not.toHaveLength(2)
    })

    test('should validate price is number and greater than 0', async () => {
        const res = await request(server).post('/api/product').send({
            name: "Mouse - testing",
            price: 'Hello'
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(2)

        expect(res.status).not.toBe(201)
        expect(res.body).not.toHaveProperty('data')
        expect(res.body.errors).not.toHaveLength(1)
    })
})


describe('GET /api/products', () => {

    test('validate if api/products url exists', async () => {
        const res = await request(server).get('/api/product')
        expect(res.status).toBe(200)
        expect(res.status).not.toBe(404)
    })

    test('GET a JSON response with products', async () => {
        const res = await request(server).get('/api/product')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveLength(1)

        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('error')
        expect(res.body).not.toHaveProperty('errors')
    })
})