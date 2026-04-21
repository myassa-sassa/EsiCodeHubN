// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB

// import { DataTypes } from 'sequelize';
// import sequelize from '../../config/db.js';

// const Course = sequelize.define('Course', {
//     course_name: DataTypes.STRING,
// course_id:DataTypes.INTEGER,
// module_name: DataTypes.STRING,
// module_id:DataTypes.INTEGER,
// description: DataTypes.STRING,
//      addday: {  // ← Attention : Dans ta table c'est "Addedday" avec majuscule
//         type: DataTypes.DATE,  // ← CORRECTION : DataTypes.DATE
//         defaultValue: DataTypes.NOW
//     }
// },
//     //  Reset password
// // resetPasswordToken : DataTypes.DATE,

// // resetPasswordExpires : DataTypes.DATE
 
  
 
// {
//   timestamps: false,
//   tableName: 'course',        // ← Je recommande 'users' en minuscules
//   freezeTableName: true,
//   underscored: false
// }

// );

// // module.exports = User;
// export default Course;


/****common js  ******/
// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Course = sequelize.define('Course', {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_name: DataTypes.STRING,
  module_name: DataTypes.STRING,
  module_id: DataTypes.INTEGER,
  description: DataTypes.STRING,
  addday: {  // ← Attention : Dans ta table c'est "Addedday" avec majuscule
    type: DataTypes.DATE,  // ← CORRECTION : DataTypes.DATE
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'course',        // ← Je recommande 'users' en minuscules
  freezeTableName: true,
  underscored: false
});

// module.exports = User;
module.exports = Course;