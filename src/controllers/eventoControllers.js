// controllers/eventosControllers.js
const eventosModel= require('../models/eventoModel'); 

// 1. READ (GET /clientes) - Buscar todos 
exports.getEventos = async (req, res) => { 
  try { 
    const eventos = await eventosModel.findAll(); 
    res.json(eventos);  
  } catch (err) { 
    console.error('Erro ao buscar eventos:', err); 
    res.status(500).json({ error: 'Erro interno ao buscar eventos' }); 
  } 
}; 

// 2. CREATE (POST /clientes) - Criar novo 
exports.createEventos = async (req, res) => { 
    
    const { nome, organizador, data_evento, capacidade, tipo, descricao } = req.body;  
     
    // Validação: Todos os campos são obrigatórios para o cadastro
    if (!nome || !organizador || !data_evento || !capacidade || !tipo || !descricao) { 
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' }); 
    } 

    try {
       const neweventos = await eventosModel.create(nome, organizador, data_evento, capacidade, tipo, descricao);
        res.status(201).json(neweventos);  
    } catch (err) { 
        console.error('Erro ao criar eventos:', err); 
        res.status(500).json({ error: 'Erro interno ao criar eventos' }); 
    } 
}; 

// 3. UPDATE (PUT /eventos/:id) - Atualizar existente 
exports.updateEventos = async (req, res) => { 
    const id = req.params.id; 
    const { nome, organizador, data_evento, capacidade, tipo, descricao } = req.body; 

    try { 
        const updatedEventos = await eventosModel.update(id, nome, organizador, data_evento, capacidade, tipo, descricao); 
         
        if (!updatedEventos) { 
            return res.status(404).json({ error: 'Evento não encontrado.' }); 
        } 

        res.json(updatedEventos);  
    } catch (err) { 
        console.error('Erro ao atualizar eventos:', err); 
        res.status(500).json({ error: 'Erro interno ao atualizar eventos' }); 
    } 
}; 

// 4. DELETE (DELETE /eventos/:id) - Remover existente 
exports.deleteEventos = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteEventos = await eventosModel.delete(id);
        
        if (!deleteEventos) {
            return res.status(404).json({ error: 'Evento não encontrado para exclusão.' });
        }
        
        // Retornamos o eventos deletado ou apenas uma mensagem de sucesso
        res.json({ message: 'Evento removido com sucesso', eventos: deleteEventos });
    } catch (err) {
        console.error('Erro ao deletar eventos:', err);
        res.status(500).json({ error: 'Erro interno ao deletar eventos' });
    }
};

exports.getEventoById = async (req, res) => {
    const { id } = req.params;

    try {
        const eventos = await eventosModel.findByField('id', id);
        
        if (eventos.length === 0) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }
        
        res.json(eventos[0]); 
    } catch (err) {
        console.error('Erro ao buscar evento por ID:', err);
        res.status(500).json({ error: 'Erro interno ao buscar evento' });
    }
};

exports.buscarEventos = async (req, res) => {
    const { filtro } = req.query;

    if (!filtro) {
        return res.status(400).json({ error: 'Parâmetro de busca obrigatório.' });
    }

    try {
        const eventos = await eventosModel.findByField('nome', filtro);
        res.json(eventos);
    } catch (err) {
        console.error('Erro ao buscar eventos:', err);
        res.status(500).json({ error: 'Erro interno ao buscar eventos' });
    }
};






