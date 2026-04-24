// models/eventoModel.js
const pool = require('../config/db'); 

exports.findAll = async () => { 
    const text = 'SELECT id, nome, organizador, data_evento, capacidade, tipo, descricao FROM eventos ORDER BY id'; 
    const result = await pool.query(text); 
    return result.rows;  
};
exports.findByField = async (tipo, valor) => {
    let text;
    let values;

    if (tipo === 'id') {
        text = 'SELECT id, nome, organizador, data_evento, capacidade, tipo, descricao FROM eventos WHERE id = $1 ORDER BY id';
        values = [valor];
    } else {
        text = 'SELECT id, nome, organizador, data_evento, capacidade, tipo, descricao FROM eventos WHERE nome ILIKE $1 ORDER BY id';
        values = [`%${valor}%`];
    }

    const result = await pool.query(text, values);
    return result.rows;
};


exports.create = async (nome, organizador, data_evento, capacidade, tipo, descricao) => { 
    const text = `
        INSERT INTO eventos (nome, organizador, data_evento, capacidade, tipo, descricao)
        VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING *`; 
    const values = [nome, organizador, data_evento, capacidade, tipo, descricao];  
    const result = await pool.query(text, values); 
    return result.rows[0]; 
};

exports.update = async (id, nome, organizador, data_evento, capacidade, tipo, descricao) =>{
    const text = `
        UPDATE eventos
        SET nome = $1, organizador = $2, data_evento = $3, capacidade = $4, tipo = $5, descricao = $6
        WHERE id= $7 
        RETURNING *`;
    const values = [ nome, organizador, data_evento, capacidade, tipo, descricao, id];
    const result = await pool.query(text, values);
    return result.rows[0]; 
};


exports.delete = async (id) => {
    const text = 'DELETE FROM eventos WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(text, values);
    return result.rows[0]; 
};







