const request = require('supertest');
const app = require('../src/api');
const bankService = require('../src/bankService');


describe('Bank Service API', () => {
    
    test("Successful Transfer function", async () => {
        const response =  bankService.transfer(1, 2, 200);
        expect(response.success).toBe(true);
    })

    test("Id not found", () => {
        expect(()=>{
         bankService.transfer(1, 3, 200);}).toThrow("Usuário não encontrado");
     
       
    });
})