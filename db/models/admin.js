// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB

// import { DataTypes } from 'sequelize';
// import sequelize from '../../config/db.js';

// const Admin = sequelize.define('Admin', {
//   first_name: DataTypes.STRING,
// last_name: DataTypes.STRING,
// admin_id:DataTypes.INTEGER,
//   email: DataTypes.STRING,
// password :DataTypes.STRING,
//  role: {
//     type: DataTypes.STRING,
//     defaultValue: 'admin'
//   },
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
//   tableName: 'admin',        // ← Je recommande 'users' en minuscules
//   freezeTableName: true,
//   underscored: false
// }

// );

// // module.exports = User;
// export default Admin;

/***common js  *******/

// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  admin_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin'
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
  tableName: 'admin',        // ← Je recommande 'users' en minuscules
  freezeTableName: true,
  underscored: false
});

// module.exports = User;
module.exports = Admin;