const pool = require('../config/db');

class AnswerModel {
  // Créer la table users si elle n'existe pas
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS answer(
      answer_id BIGSERIAL PRIMARY KEY ,
      question_id BIGSERIAL NOT NULL ,
      esi_id INTEGER NOT NULL?,
      id_student_answered INTEGER NOT NULL,
      title VARCHAR(500),
      module_name VARCHAR(500) ,
      language VARCHAR(500),
      body VARCHAR(500) NOT NULL,
    is_accepted BOOLEAN NOT NULL DEFAULT FALSE,
       answer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`;


   try {
      await pool.query(query);
      console.log('Table "answer" créée ou déjà existante');
    } catch (err) {
      console.error('Erreur lors de la création de la table:', err);
      throw err;
    }}

}
module.exports = AnswerModel;  // ← AJOUTER CETTE LIGNE
