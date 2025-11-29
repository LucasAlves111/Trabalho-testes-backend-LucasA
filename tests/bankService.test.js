const request = require('supertest');
const app = require('../src/api');
const bankService = require('../src/bankService');


describe('Bank Service API', () => {
    
    test("Successful Transfer function", () => {
        const response =  bankService.transfer(1, 2, 200);
        expect(response.success).toBe(true);
    })

    test("Id not found", () => {
        expect(()=>{
         bankService.transfer(1, 3, 200);}).toThrow("Usuário não encontrado");
       
    });

    test("Insufficient funds", () => {
        expect(()=>{
         bankService.transfer(2, 1, 2000);}).toThrow("Saldo insuficiente");
    });
    test("Negative or zero amounts not allowed", () => {
        expect(()=>{
         bankService.transfer(1, 2, -200);}).toThrow("Montante inválido");
    });
})