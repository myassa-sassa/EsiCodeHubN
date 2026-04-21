const sequelize = require('../../config/db');
const Student = require('./student');
const Submission = require('./submission');
const CodeVersion = require('./codeVersion');  // ← Ajoutez

// Définir les relations
Student.hasMany(Submission, { foreignKey: 'esi_id' });
Submission.belongsTo(Student, { foreignKey: 'esi_id' });
CodeVersion.belongsTo(Submission, { foreignKey: 'submission_id' });

module.exports = {
  sequelize,
  Student,
  Submission,
    CodeVersion  // ← Exportez

};