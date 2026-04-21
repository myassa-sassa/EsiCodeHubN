// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../../config/db'); // votre connexion DB

// import { DataTypes } from 'sequelize';
// import sequelize from '../../config/db.js';

// const User = sequelize.define('User', {
//   name: DataTypes.STRING,
//   email: DataTypes.STRING,
// password :DataTypes.STRING,
//  role: {
//     type: DataTypes.STRING,
//     defaultValue: 'user'
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
//   tableName: 'Users',        // ← Je recommande 'users' en minuscules
//   freezeTableName: true,
//   underscored: false
// }

// );

// // module.exports = User;
// export default User;