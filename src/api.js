const express = require('express');
const bankService = require('./bankService');
const app = express();

app.use(express.json());

app.post('/transfer', (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;
        
        if(!senderId || !receiverId || !amount) {
            return res.status(400).json({ error: "Dados incompletos" });
        }
        // receiver or sender not found
        if (!bankService.getBalance(senderId) || !bankService.getBalance(receiverId)) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        //If amount ecceeds balance or is negative 
        if (bankService.getBalance(senderId) < amount) {
            return res.status(422).json({ error: "Entidade não processável" });
        }

        //negative or zero amount  
        if (amount <= 0) {
            return res.status(400).json({ error: "Erro na transferência" });
        }
  
        const result = bankService.transfer(senderId, receiverId, amount);
        res.status(200).json(result);

    } catch (error) {
        // Tratamento de erro genérico
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;