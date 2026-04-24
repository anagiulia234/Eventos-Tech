require('dotenv').config();
const express = require('express');
const path = require('path');
const eventosRoutes = require('./src/routes/eventoRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (public)
app.use(express.static('public'));

// Rotas
app.use('/eventos', eventosRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'API eventosTech rodando com sucesso!' });
});

// Tratamento de erros 404
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
