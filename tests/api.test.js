const request = require('supertest');
const app = require('../src/api');



describe('Bank Service API', () => {
    test("Successful Transfer (Happy path)", async () => {
        const response = await request(app).post('/transfer').send({
            senderId: 1, receiverId: 2, amount: 200})
        ;
        expect(response.statusCode).toBe(200);
    })

    test("Incomplete data", async () => {
        const response = await request(app).post('/transfer').send({
            senderId: 1,receiverId: 2})
        ;
        expect(response.statusCode).toBe(400);
    })
    test("Nonexistent receiver ", async () => {
        const response = await request(app).post('/transfer').send({
            senderId: 1,receiverId: 3, amount: 200})
        ;
        expect(response.statusCode).toBe(404);
    })

        test("Nonexistent sender ", async () => {
        const response = await request(app).post('/transfer').send({
            senderId: 3,receiverId: 2, amount: 200})
        ;
        expect(response.statusCode).toBe(404);
    })
  test("insufficient funds", async () => {
        const response = await request(app).post('/transfer').send({
            senderId: 1,receiverId: 2, amount: 20000})
        ;
        expect(response.statusCode).toBe(422);
    })
    test("Negative or zero amounts not allowed", async () => {
        const response = await request(app).post('/transfer').send({
            senderId: 1,receiverId: 2, amount: -200})
        ;
        expect(response.statusCode).toBe(400);
        })
    
    });




