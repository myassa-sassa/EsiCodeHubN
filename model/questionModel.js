const pool = require('../config/db');

class QuestionModel {
  // Créer la table users si elle n'existe pas
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS question(
      question_id INTEGER PRIMARY KEY
      esi_id INTEGER  NOT NULL,
      course_id INTEGER  NOT NULL,
      module_name VARCHAR(100) NOT NULL,
      title VARCHAR(100) NOT NULL ,
      body  VARCHAR(500) ,
      language VARCHAR(10) NOT NULL ,
      is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
      question_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
    `;


   try {
      await pool.query(query);
      console.log('Table "question" créée ou déjà existante');
    } catch (err) {
      console.error('Erreur lors de la création de la table:', err);
      throw err;
    }}

}

module.exports = QuestionModel;  // ← AJOUTER CETTE LIGNE
