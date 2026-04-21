const pool = require('../config/db');

class TeacherModel {
  // Créer la table users si elle n'existe pas
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS student(
      first_name VARCHAR(100) NOT NULL,
      last_name  VARCHAR(100) NOT NULL,
      teacher_id INTEGER NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         );
    `;


   try {
      await pool.query(query);
      console.log('Table "teacher" créée ou déjà existante');
    } catch (err) {
      console.error('Erreur lors de la création de la table:', err);
      throw err;
    }}

}

module.exports = TeacherModel;  // ← AJOUTER CETTE LIGNE
