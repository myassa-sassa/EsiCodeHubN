// db/models/codeVersion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const CodeVersion = sequelize.define('CodeVersion', {
  version_id: {
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
    },
    onDelete: 'CASCADE'
  },
  code_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  file_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  language: {
    type: DataTypes.STRING(50),
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
  tableName: 'code_version',
  freezeTableName: true
});

module.exports = CodeVersion;