// const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db'); // votre connexion DB

// import { DataTypes } from 'sequelize';
// import sequelize from '../../config/db.js';

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Module = sequelize.define('Module', {
  module_name: DataTypes.STRING,
description: DataTypes.STRING,
teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'teachers',
            key: 'id'
        }
    }
 
},
{
  timestamps: true,
  tableName: 'module',        // ← Je recommande 'users' en minuscules
  freezeTableName: true,
  underscored: false
}

);

// module.exports = User;
// export default Module;

module.exports = Module;
