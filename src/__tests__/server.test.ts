import { connectionDB } from '../server'
import db from "../config/db"

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