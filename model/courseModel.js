const pool = require('../config/db');

class CourseModel {
  // Créer la table users si elle n'existe pas
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS course(
    course_name VARCHAR(100) NOT NULL,
      module_name VARCHAR(100) NOT NULL,
      module_id INTEGER NOT NULL ,
      description  VARCHAR(100) NOT NULL,
     Addday TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

         );
    `;


   try {
      await pool.query(query);
      console.log('Table "course" créée ou déjà existante');
    } catch (err) {
      console.error('Erreur lors de la création de la table:', err);
      throw err;
    }}

}
module.exports = CourseModel;  // ← AJOUTER CETTE LIGNE
