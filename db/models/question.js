// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB

// import { DataTypes } from 'sequelize';
// import sequelize from '../../config/db.js';

// const Question = sequelize.define('Question', {
//   question_id: DataTypes.INTEGER,
// esi_id: DataTypes.INTEGER,
// course_id:DataTypes.INTEGER,
// module_name:DataTypes.STRING,
// title:DataTypes.STRING,
//   body: DataTypes.STRING,
//   language:DataTypes.STRING,
// is_resolved:DataTypes.BOOLEAN,

//     //  Reset password
// // resetPasswordToken : DataTypes.DATE,

// // resetPasswordExpires : DataTypes.DATE
 
 
// },
// {
//   timestamps: true,
//   tableName: 'question',        // ← Je recommande 'users' en minuscules
//   freezeTableName: true,
//   underscored: false
// }

// );

// // module.exports = User;
// export default Question;


/*************common js  *****/

// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Question = sequelize.define('Question', {
  question_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  esi_id: DataTypes.INTEGER,
  course_id: DataTypes.INTEGER,
  module_name: DataTypes.STRING,
  title: DataTypes.STRING,
  body: DataTypes.STRING,
  language: DataTypes.STRING,
  is_resolved: DataTypes.BOOLEAN,

  //  Reset password
  // resetPasswordToken : DataTypes.DATE,
  // resetPasswordExpires : DataTypes.DATE
}, {
  timestamps: true,
  tableName: 'question',        // ← Je recommande 'users' en minuscules
  freezeTableName: true,
  underscored: false
});

// module.exports = User;
module.exports = Question;