// db/models/submission.js
const sequelize = require('../../config/db.js');
const { DataTypes } = require('sequelize');  // ← Ajoutez cette ligne

const Student = require('./student.js');
const Submission = sequelize.define('Submission', {
submission_id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
               field: 'submission_id'  // ← Nom exact dans la base
     // field: 'question_id'  // Mappe 'id' du code → 'question_id' de la base

  },
  esi_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'students',  // Référence à la table students
      key: 'esi_id'
    }
  },

   titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  course_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  topic_tag: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // references: {
    //   model: 'question',
    //   key: 'question_id'
    // }
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'module',  // Référence à la table modules
      key: 'id'
    }
  },
  // assignment_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  //   references: {
  //     model: 'assignments',  // Référence à la table assignments
  //     key: 'id'
  //   }
  // },
  submission_type: {
    type: DataTypes.ENUM('review', 'help_request', 'educational_sharing'),
    allowNull: false,
    defaultValue: 'educational_sharing'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  file_urls: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  language: {
    type: DataTypes.ENUM('c', 'javascript', 'java', 'html', 'css'),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'completed'),
    defaultValue: 'pending'
  },
  grade: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    validate: {
      min: 0,
      max: 100
    }
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reviewed_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
    //   model: 'users',  // Référence à la table users (admin/prof)
          model: 'students',  // Référence à la table users (admin/prof)
  
    key: 'id'
    }
  },
  reviewed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  submitted_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
},

{
  timestamps: true,
  createdAt: 'submitted_at',
  updatedAt: 'updated_at',
  tableName: 'submissions',
  freezeTableName: true,
  underscored: false,
  indexes: [
    {
      fields: ['esi_id']
    },
    {
      fields: ['module_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['submission_type']
    }
  ]
});

// export default Submission;
module.exports = Submission;  // ✅ À ajouter
