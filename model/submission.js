// const pool = require('../config/database');

// const Submission = {
//     async create(fileData) {
//         try {
//             // Étape 1: Créer la table submission si elle n'existe pas
//             await pool.query(`
//                 CREATE TABLE IF NOT EXISTS submission (
//                     submission_id SERIAL PRIMARY KEY,
//                     course_id INTEGER,
//                     submission_type VARCHAR(50) DEFAULT 'file',
//                     esi_id INTEGER,
//                     code_content BYTEA,
//                     titre VARCHAR(255) NOT NULL,
//                     description VARCHAR(500),
//                     language VARCHAR(10),
//                     type_mime VARCHAR(100),
//                     taille_fichier INTEGER,
//                     date_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//                 );
//             `);

//             // Étape 2: Créer la table code_version si elle n'existe pas
//             await pool.query(`
//                 CREATE TABLE IF NOT EXISTS code_version (
//                     version_id SERIAL PRIMARY KEY,
//                     submission_id INTEGER REFERENCES submission(submission_id) ON DELETE CASCADE,
//                     code_content TEXT,
//                     file_name VARCHAR(255),
//                     language VARCHAR(50),
//                     version_notes TEXT,
//                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//                 );
//             `);

//             // ✅ FIX: Ajouter toutes les colonnes manquantes si la table existait déjà
//             await pool.query(`ALTER TABLE code_version ADD COLUMN IF NOT EXISTS file_name VARCHAR(255);`);
//             await pool.query(`ALTER TABLE code_version ADD COLUMN IF NOT EXISTS language VARCHAR(50);`);
//             await pool.query(`ALTER TABLE code_version ADD COLUMN IF NOT EXISTS version_notes TEXT;`);
//             await pool.query(`ALTER TABLE code_version ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`);
//             // ✅ FIX: version_number existait avec NOT NULL sans DEFAULT → on lui ajoute un DEFAULT
//             await pool.query(`ALTER TABLE code_version ALTER COLUMN version_number SET DEFAULT 1;`);

//             console.log('Tables vérifiées/créées avec succès');

//             // ✅ FIX 2: Valider que titre n'est pas null avant d'insérer
//             if (!fileData.titre || String(fileData.titre).trim() === '') {
//                 throw new Error('Le titre est obligatoire.');
//             }

//             // Étape 3: Insérer les données dans submission
//             const insertQuery = `
//                 INSERT INTO submission (
//                     submission_type,
//                    esi_id,
//                     course_id,
//                     code_content,
//                     titre,
//                     description,
//                     language,
//                     type_mime,
//                     taille_fichier,
//                     date_upload
//                 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//                 RETURNING submission_id, titre, date_upload
//             `;

//             const values = [
//                 fileData.submission_type || 'file',
//                 fileData.esi_id,
//                 fileData.course_id,
//                 fileData.code_content,
//                 fileData.titre,
//                 fileData.description || '',
//                 fileData.language,
//                 fileData.type_mime,
//                 fileData.taille_fichier,
//                 fileData.date_upload || new Date(),
//             ];

//             const result = await pool.query(insertQuery, values);
//             return result.rows[0];

//         } catch (error) {
//             console.error('Erreur création soumission:', error);
//             throw error;
//         }
//     }
// };

// module.exports = Submission;



/*
 * model/submission.js
 *
 * table submission :
 *   submission_id  SERIAL PK
 *   student_id     INTEGER
 *   course_id      INTEGER
 *   submission_type VARCHAR(50)   -> 'review' | 'help_request' | 'educational_sharing'
 *   titre          VARCHAR(255)
 *   description    VARCHAR(500)
 *   language       VARCHAR(10)
 *   course_tag     VARCHAR(100)
 *   topic_tag      VARCHAR(100)
 *   code_content   BYTEA        
 *   date_upload    TIMESTAMP
 *
 * table code_version :
 *   version_id     SERIAL PK
 *   submission_id  INTEGER FK
 *   version_number INTEGER
 *   code_content   TEXT           
 *   file_name      VARCHAR(255)
 *   language       VARCHAR(50)
 *   version_notes  TEXT
 *   created_at     TIMESTAMP
 */

const pool = require('../config/database');

const Submission = {

  createWithClient: async function (client, data) {
    if (!data.titre || String(data.titre).trim() === '') {
      throw new Error('Le titre est obligatoire.');
    }

    var sql = [
      'INSERT INTO submissions',
      '  (esi_id, course_id, module_id,submission_type,',
      '   titre, description, language,',
      '   course_tag, topic_tag, code_content, submitted_at)',
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      'RETURNING submission_id, titre, submitted_at'
    ].join(' ');

    var values = [
      data.esi_id,
      data.course_id        || null,
      data.module_id        || null,
      data.submission_type  || 'educational_sharing',
      String(data.titre).trim(),
      data.description      || '',
      data.language,
      data.course_tag       || null,
      data.topic_tag        || null,
      Buffer.from(''),
      data.submitted_at      || new Date()
    ];

    var result = await client.query(sql, values);
    return result.rows[0];
  },

  addVersion: async function (client, submission_id, version_number, code_content, file_name, language, version_notes) {
    var sql = [
      'INSERT INTO code_version',
      '  (submission_id, version_number, code_content, file_name, language, version_notes)',
      'VALUES ($1, $2, $3, $4, $5, $6)'
    ].join(' ');

    var values = [
      submission_id,
      version_number,
      code_content,
      file_name     || null,
      language,
      version_notes || null
    ];

    await client.query(sql, values);
  },

  findById: async function (submission_id) {
    var sql = [
      'SELECT s.*,',
      '  st.first_name || \' \' || st.last_name AS student_name',
      'FROM submissions s',
      'LEFT JOIN students st ON st.esi_id = s.esi_id',
      'WHERE s.submission_id = $1'
    ].join(' ');

    var result = await pool.query(sql, [submission_id]);
    return result.rows[0] || null;
  },

  search: async function (params) {
    var conditions = [];
    var values     = [];
    var idx        = 1;

    if (params.language) {
      conditions.push('s.language = $' + idx);
      values.push(params.language);
      idx++;
    }
    if (params.submission_type) {
      conditions.push('s.submission_type = $' + idx);
      values.push(params.submission_type);
      idx++;
    }
    if (params.course_tag) {
      conditions.push('s.course_tag = $' + idx);
      values.push(params.course_tag);
      idx++;
    }
    if (params.esi_id) {
      conditions.push('s.esi_id = $' + idx);
      values.push(params.esi_id);
      idx++;
    }
    if (params.query) {
      conditions.push(
        '(s.titre ILIKE $' + idx + ' OR s.description ILIKE $' + idx + ')'
      );
      values.push('%' + params.query + '%');
      idx++;
    }

    var whereClause = conditions.length > 0
      ? 'WHERE ' + conditions.join(' AND ')
      : '';

    values.push(params.limit || 20, params.offset || 0);

    var sql = [
      'SELECT s.submission_id, s.titre, s.language,',
      '  s.submission_type, s.submitted_at,',
      '  s.esi_id, s.course_tag, s.topic_tag,',
      '  st.first_name || \' \' || st.last_name AS student_name',
      'FROM submissions s',
      'LEFT JOIN students st ON st.esi_id = s.esi_id',
      whereClause,
      'ORDER BY s.submitted_at DESC',
      'LIMIT $' + idx + ' OFFSET $' + (idx + 1)
    ].join(' ');

    var result = await pool.query(sql, values);
    return result.rows;
  },

delete: async function (submission_id) {
  // Supprimer d'abord les versions
  await pool.query(
    'DELETE FROM code_version WHERE submission_id = $1',
    [submission_id]
  );
  // Puis supprimer la soumission
  await pool.query(
    'DELETE FROM submissions WHERE submission_id = $1',
    [submission_id]
  );
}

};

module.exports = Submission;