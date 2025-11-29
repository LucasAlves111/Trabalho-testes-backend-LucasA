const request = require('supertest');
const app = require('../src/api');
const bankService = require('../src/bankService');


describe('Bank Service API', () => {
    
    test("Successful Transfer", async () => {
        const response = await request(app).post('/transfer').send({
            senderId: 1, receiverId: 2, amount: 200})
        ;
        expect(response.statusCode).toBe(200);
    })
})