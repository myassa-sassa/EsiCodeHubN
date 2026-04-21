// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB

// import sequelize from '../../config/db.js';
// // import { DataTypes, INTEGER } from 'sequelize'; // INTEGER est redondant
// import { DataTypes } from 'sequelize';

// const Teacher = sequelize.define('Teacher', {
//   first_name: DataTypes.STRING,
//     last_name: DataTypes.STRING,
// teacher_id:DataTypes.INTEGER,
// registration_date: {
//   type: DataTypes.DATE,
//   defaultValue: DataTypes.NOW
// },
//   email: DataTypes.STRING,
// password :DataTypes.STRING,
//  role: {
//     type: DataTypes.STRING,
//     defaultValue: 'user'
//   },
//       modules: {  // ← Cette colonne existe-t-elle ?
//         type: DataTypes.JSONB,  // ou DataTypes.ARRAY(DataTypes.JSONB)
//         defaultValue: []
//     },
//     //  Reset password
// // resetPasswordToken : DataTypes.DATE,
// resetPasswordToken: {
//   type: DataTypes.STRING,  // ← Un token est une chaîne de caractères
//   allowNull: true
// },
// // resetPasswordExpires : DataTypes.DATE
//  resetPasswordExpires: {
//     type: DataTypes.DATE,  // ou DataTypes.DATEONLY
//     allowNull: true,
//     validate: {
//       isDate: true  // optionnel
//     }
//   },
 
// },
// {
//   timestamps: true,
//   tableName: 'teachers',        // ← Je recommande 'users' en minuscules
//   freezeTableName: true,
//   underscored: false
// }

// );

// // module.exports = User;
// export default Teacher;

/************common js  *****/
// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Teacher = sequelize.define('Teacher', {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  teacher_id: DataTypes.INTEGER,
  registration_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  modules: {  // ← Cette colonne existe-t-elle ?
    type: DataTypes.JSONB,  // ou DataTypes.ARRAY(DataTypes.JSONB)
    defaultValue: []
  },
  //  Reset password
  // resetPasswordToken : DataTypes.DATE,
  resetPasswordToken: {
    type: DataTypes.STRING,  // ← Un token est une chaîne de caractères
    allowNull: true
  },
  // resetPasswordExpires : DataTypes.DATE
  resetPasswordExpires: {
    type: DataTypes.DATE,  // ou DataTypes.DATEONLY
    allowNull: true,
    validate: {
      isDate: true  // optionnel
    }
  },
}, {
  timestamps: true,
  tableName: 'teachers',        // ← Je recommande 'users' en minuscules
  freezeTableName: true,
  underscored: false
});

// module.exports = User;
module.exports = Teacher;
