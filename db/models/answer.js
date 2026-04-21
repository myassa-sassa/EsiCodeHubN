// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB

// import { DataTypes } from 'sequelize';
// import sequelize from '../../config/db.js';

// const Answer = sequelize.define('Answer', {
// answer_id: DataTypes.INTEGER,
// esi_id: DataTypes.INTEGER, //id de la personne qui a poser la question
// id_student_answered : DataTypes.INTEGER,//id de la personne qui a repondu 
// question_id:DataTypes.INTEGER,
// // searchBy:DataTypes.STRING, 
// title:DataTypes.STRING,
// module_name:DataTypes.STRING,
// language:DataTypes.STRING,  
// body:DataTypes.STRING,
// is_accepted:DataTypes.BOOLEAN,
// //  Reset password
// // resetPasswordToken : DataTypes.DATE,
// // resetPasswordExpires : DataTypes.DATE
// },
// {
//   timestamps: true,
//   tableName: 'answer',        // ← Je recommande 'users' en minuscules
//   freezeTableName: true,
//   underscored: false
// }
// );

// // module.exports = User;
// export default Answer;



/****common js  *******/

// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Answer = sequelize.define('Answer', {
  answer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  esi_id: DataTypes.INTEGER, //id de la personne qui a poser la question
  id_student_answered: DataTypes.INTEGER, //id de la personne qui a repondu 
  question_id: DataTypes.INTEGER,
  // searchBy:DataTypes.STRING, 
  title: DataTypes.STRING,
  module_name: DataTypes.STRING,
  language: DataTypes.STRING,  
  body: DataTypes.STRING,
  is_accepted: DataTypes.BOOLEAN,
  //  Reset password
  // resetPasswordToken : DataTypes.DATE,
  // resetPasswordExpires : DataTypes.DATE
}, {
  timestamps: true,
  tableName: 'answer',        // ← Je recommande 'users' en minuscules
  freezeTableName: true,
  underscored: false
});

// module.exports = User;
module.exports = Answer;