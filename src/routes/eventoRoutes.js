// routes/eventoRoutes.js 
const express = require('express'); 
const router = express.Router(); 
const eventosControllers = require('../controllers/eventoControllers'); 

// Lista todos os usuários
router.get('/', eventosControllers.getEventos); 

router.get('/buscar', eventosControllers.buscarEventos); 
 
// Cria um novo usuário (espera nome, cpf, email, telefone no body)
router.post('/', eventosControllers.createEventos); 
 
// Atualiza um usuário pelo ID (espera nome, cpf, email, telefone no body)
router.put('/:id', eventosControllers.updateEventos);

router.get('/:id', eventosControllers.getEventoById); 
 
// Remove um usuário pelo ID
router.delete('/:id', eventosControllers.deleteEventos); 
 

module.exports = router;

