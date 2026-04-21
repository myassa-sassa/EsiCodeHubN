// db/models/codeVersion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const CodeVersion = sequelize.define('CodeVersion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  submission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'submissions',
      key: 'id'
    }
  },
  code_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  language: {
    type: DataTypes.STRING,
    allowNull: true
  },
  version_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  version_number: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'code_version'
});

module.exports = CodeVersion;