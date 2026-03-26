import request from 'supertest'
import server from '../../server'
import { response } from 'express'


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


describe('GET /api/product', () => {

    test('validate if api/product url exists', async () => {
        const res = await request(server).get('/api/product')
        expect(res.status).toBe(200)
        expect(res.status).not.toBe(404)
    })
    //when the url does not exist the response will return a text not a JSON
    test('GET a JSON response with product', async () => {
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


describe('GET /api/product/:id', () => {
    test('should return 404 response for non-existent product', async () => {
        const productId = 2000
        const res = await request(server).get(`/api/product/${productId}`)
        expect(res.status).toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('404 Product not found')
    })

    test('should check a valid ID in the URL', async () => {
        const res = await request(server).get('/api/product/not-valid-url')
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('not valid ID')
    })

    test('get a JSON response for a single product', async () => {
        const res = await request(server).get('/api/product/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
    })


    describe('PUT /api/product/:id', () => {

        test('should check a valid ID in the URL', async () => {
            const res = await request(server)
                .put('/api/product/not-valid-url')
                .send({
                    name: "Mouse-PUT-Test",
                    availability: true,
                    price: 300
                })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors')
            expect(res.body.errors).toHaveLength(1)
            expect(res.body.errors[0].msg).toBe('not valid ID')
        })

        test('shuld complete the validations when updating a product', async () => {
            const res = await request(server)
                .put('/api/product/1')
                .send({})
            expect(res.status).toBe(400)
            expect(res.body.errors).toBeTruthy()
            expect(res.body.errors).toHaveLength(5)

            expect(res.status).not.toBe(200)
            expect(res.body).not.toHaveProperty('data')
        })

        test('shuld validate price greater than 0 updating a product', async () => {
            const res = await request(server)
                .put('/api/product/1')
                .send({
                    name: "Mouse-PUT-Test",
                    availability: true,
                    price: -300
                })
            expect(res.status).toBe(400)
            expect(res.body.errors).toBeTruthy()
            expect(res.body.errors).toHaveLength(1)
            expect(res.body.errors[0].msg).toBe('Price not valid')

            expect(res.status).not.toBe(200)
            expect(res.body).not.toHaveProperty('data')
        })

        test('shuld return a 404 for non-existent product', async () => {
            const productId = 2000
            const res = await request(server)
                .put(`/api/product/${productId}`)
                .send({
                    name: "Mouse-PUT-Test",
                    availability: true,
                    price: 300
                })
            expect(res.status).toBe(404)
            expect(res.body.error).toBe('404 Product not found')

            expect(res.status).not.toBe(200)
            expect(res.body).not.toHaveProperty('data')
        })

        test('shuld update an existing product with valid data', async () => {
            const res = await request(server)
                .put(`/api/product/1`)
                .send({
                    name: "Mouse-PUT-Test",
                    availability: true,
                    price: 300
                })
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('data')

            expect(res.status).not.toBe(400)
            expect(res.body).not.toHaveProperty('errors')
        })
    })
})


describe('PATCH /api/product/:id', () => {
    test('shuld return a 404 for non-existent product', async () => {
        const productId = 2000
        const res = await request(server)
            .patch(`/api/product/${productId}`)
            .send({
                availability: true
            })
        expect(res.status).toBe(404)
        expect(res.body.error).toBe('404 Product not found')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    test('shuld update availability for a product', async () => {
        const res = await request(server)
            .patch(`/api/product/1`)
            .send({
                availability: false
            })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data.availability).toBe(false)

        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('errors')
    })
})


describe('DELETE /api/product/:id', () => {
    test('should check valid ID', async () => {
        const res = await request(server).delete('/api/product/not-valid')
        expect(res.status).toBe(400)
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('not valid ID')
    })

    test('should return 404 response for non-existent product', async () => {
        const productId = 2000
        const res = await request(server).delete(`/api/product/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body.error).toBe('404 Product not found')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    test('should delete a product', async () => {
        const res = await request(server).delete(`/api/product/1`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toBe('Deleted Product')

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('error')
    })
})