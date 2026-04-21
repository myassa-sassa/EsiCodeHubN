// // import { Pool } from "pg";
// // import { Sequelize } from 'sequelize';

// // import dotenv from "dotenv";

// // dotenv.config();

// // const pool = new Pool({
// //   host: process.env.DB_HOST,
// //   port: process.env.DB_PORT,
// //   database: process.env.DB_NAME,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// // });

// // pool.on("connect", () => {
// //   console.log("Connected to the database");
// // });

// // pool.on("error", (err) => {
// //   console.error("Database error", err);
// // });

// // export default pool;


// /*****************squeezelie****************/
// import { Sequelize } from 'sequelize';
// import dotenv from "dotenv";

// dotenv.config();

// // Créer une instance Sequelize
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres',
//     logging: console.log, // Affiche les requêtes SQL (optionnel)
//      define: {
//       freezeTableName: false // Permet à Sequelize de gérer les noms de tables
//       // tableName: 'Users' // Définit le nom de table par défaut
// // tableName: 'student' 
//     },
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   }
// );

// // Tester la connexion
// const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connected to the database (via Sequelize)');
//   } catch (error) {
//     console.error('Database connection error:', error);
//   }
// };

// testConnection();

// export default sequelize;




/**++++*/ 
// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Tester la connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à PostgreSQL établie (Sequelize)');
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
  }
};

testConnection();

module.exports = sequelize;