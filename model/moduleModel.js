const pool = require('../config/db');

class ModuleModel {
  // Créer la table users si elle n'existe pas
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS module(
      module_name VARCHAR(50) NOT NULL ,
      description VARCHAR(500) NOT NULL,
         INTEGER REFERENCES teachers(teacher_id),
         );
    `;


   try {
      await pool.query(query);
      console.log('Table "module" créée ou déjà existante');
    } catch (err) {
      console.error('Erreur lors de la création de la table:', err);
      throw err;
    }}

}
module.exports = ModuleModel;  // ← AJOUTER CETTE LIGNE
