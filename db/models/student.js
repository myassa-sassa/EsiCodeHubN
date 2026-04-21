// const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db'); // votre connexion DB
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
// import sequelize from '../../config/db.js';
// // import { DataTypes, INTEGER } from 'sequelize'; // INTEGER est redondant
// import { DataTypes } from 'sequelize';

const Student = sequelize.define('Student', {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  esi_id:DataTypes.INTEGER,
  academic_year:DataTypes.STRING,
  email: DataTypes.STRING,
password :DataTypes.STRING,
registration_date:{
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW
},

 role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
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
 
},
{
  timestamps: true,
  tableName: 'students',        // ← Je recommande 'users' en minuscules
  freezeTableName: true,
  underscored: false
}

);

// module.exports = User;
// export default Student;
module.exports = Student;  // ✅ À ajouter
