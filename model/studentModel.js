const pool = require('../config/db');

class StudentModel {
  // Créer la table users si elle n'existe pas
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS student(
      first_name VARCHAR(100) NOT NULL,
      last_name  VARCHAR(100) NOT NULL,
      esi_id  INTEGER NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        academic_year VARCHAR(3),
        modules JSONB DEFAULT '[]'::jsonb 
       );
    `;


   try {
      await pool.query(query);
      console.log('Table "student" créée ou déjà existante');
    } catch (err) {
      console.error('Erreur lors de la création de la table:', err);
      throw err;
    }}

}

module.exports = StudentModel;  // ← AJOUTER CETTE LIGNE
