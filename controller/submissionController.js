/*
 * Search Code :
 *   Entrees : Search_Query, Language_Filter, Course_Filter,
 *             Topic_Filter, Author_Filter, Date_Range
 *   Sorties : Results (array), Result_Count (integer), Error_Message (string)
 *
 * Edit Code Submission :
 *   Entrees : Submission_ID, User_ID, Updated_Code,
 *             Updated_Description, Updated_Tags (array)
 *   Sorties : Success, Error_Message, Version_Number, Update_Timestamp
 *
 * Delete Code Submission :
 *   Entrees : Submission_ID, User_ID, Confirmation (boolean)
 *   Sorties : Success (boolean), Error_Message (string)
 */

var pool       = require('../config/database');
var Submission = require('../model/submission');

/* ============================================================
 * GET /api/submissions/search
 *
 *   q           -> Search_Query      (titre + description)
 *   language    -> Language_Filter
 *   course_tag  -> Course_Filter
 *   topic_tag   -> Topic_Filter
 *   student_id  -> Author_Filter
 *   date_from   -> Date_Range.from  (YYYY-MM-DD)
 *   date_to     -> Date_Range.to    (YYYY-MM-DD)
 * ============================================================ */
exports.searchSubmissions = async function (req, res) {
  var query      = req.query.q;
  var language   = req.query.language;
  var course_tag = req.query.course_tag;
  var topic_tag  = req.query.topic_tag;
  var esi_id = req.query.esi_id ? parseInt(req.query.esi_id) : null;
  var date_from  = req.query.date_from  || null;
  var date_to    = req.query.date_to    || null;
  var limit      = Math.min(parseInt(req.query.limit) || 20, 100);
  var offset     = parseInt(req.query.offset) || 0;

  try {
    var conditions = [];
    var values     = [];
    var idx        = 1;

    if (language)   { conditions.push('s.language = $'   + idx); values.push(language);   idx++; }
    if (course_tag) { conditions.push('s.course_tag = $' + idx); values.push(course_tag); idx++; }
    if (topic_tag)  { conditions.push('s.topic_tag = $'  + idx); values.push(topic_tag);  idx++; }
    if (esi_id) { conditions .push('s.esi_id = $' + idx); values.push(esi_id); idx++; }
    if (date_from)  { conditions.push('s.submitted_at >= $' + idx); values.push(date_from); idx++; }
    if (date_to)    { conditions.push('s.submitted_at <= $' + idx); values.push(date_to + ' 23:59:59'); idx++; }
    if (query) {
      conditions.push('(s.titre ILIKE $' + idx + ' OR s.description ILIKE $' + idx + ')');
      values.push('%' + query + '%');
      idx++;
    }

    var whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
    values.push(limit, offset);

    var sql = [
      'SELECT s.submission_id, s.titre, s.language,',
      '  s.submission_type, s.submitted_at,',
      '  s.esi_id, s.course_tag, s.topic_tag, s.description,',
      '  st.first_name || \' \' || st.last_name AS author_name',
      'FROM submissions s',
      'LEFT JOIN students st ON st.esi_id = s.esi_id',
      whereClause,
      'ORDER BY s.submitted_at DESC',
      'LIMIT $' + idx + ' OFFSET $' + (idx + 1)
    ].join(' ');

    var result = await pool.query(sql, values);

    return res.json({
      success:       true,
      result_count:  result.rows.length,
      results:       result.rows,
      error_message: null
    });

  } catch (err) {
    console.error('[search]', err.message);
    return res.status(500).json({
      success: false, result_count: 0, results: [],
      error_message: 'Erreur serveur.'
    });
  }
};

/* GET /api/submissions/:id */
exports.getSubmission = async function (req, res) {
  var id = parseInt(req.params.id);

  try {
    var sub = await Submission.findById(id);

    if (!sub) {
      return res.status(404).json({
        success:       false,
        error_message: 'Soumission non trouvee.'
      });
    }

    var versionsResult = await pool.query(
      'SELECT version_id, version_number, file_name, language, version_notes, created_at ' +
      'FROM code_version WHERE submission_id = $1 ORDER BY version_number',
      [id]
    );

    return res.json({
      success:       true,
      submission:    sub,
      versions:      versionsResult.rows,
      error_message: null
    });
  } catch (err) {
    console.error('[getSubmission]', err.message);
    return res.status(500).json({
      success:       false,
      error_message: 'Erreur serveur.'
    });
  }
};

/* ============================================================
 * PUT /api/submissions/:id  — Edit Code Submission 
 *
 * Body JSON :
 *   user_id             -> User_ID (integer)
 *   updated_description -> Updated_Description (string)
 *   updated_tags        -> Updated_Tags (array) ex: ["algo1","tri"]
 *   updated_code        -> Updated_Code (string) nouveau contenu du code
 *   titre               -> nouveau titre (optionnel)
 *   version_notes       -> notes sur la version (optionnel)
 * ============================================================ */
exports.editSubmission = async function (req, res) {
  var id = parseInt(req.params.id);

  var user_id;
  if (process.env.SKIP_AUTH === 'true') {
    user_id = parseInt(req.body.user_id || req.body.esi_id);
  } else {
    user_id = req.user ? (req.user.esi_id || req.user.user_id) : null;
  }

  try {
    var sub = await Submission.findById(id);
    if (!sub) {
      return res.status(404).json({
        success: false, error_message: 'Soumission non trouvee.',
        version_number: null, update_timestamp: null
      });
    }
    if (user_id !== sub.esi_id) {
      return res.status(403).json({
        success: false, error_message: 'Acces refuse.',
        version_number: null, update_timestamp: null
      });
    }

    var titre               = req.body.titre               !== undefined ? req.body.titre               : sub.titre;
    var updated_description = req.body.updated_description !== undefined ? req.body.updated_description : sub.description;
    var updated_tags        = req.body.updated_tags || null;
    var updated_code        = req.body.updated_code || null;

    var course_tag = sub.course_tag;
    var topic_tag  = sub.topic_tag;
    if (Array.isArray(updated_tags) && updated_tags.length > 0) {
      course_tag = updated_tags[0] || sub.course_tag;
      topic_tag  = updated_tags[1] || sub.topic_tag;
    }

    var update_timestamp = new Date();

    /* 1. Mettre a jour les metadonnees dans submission */
    await pool.query(
      'UPDATE submissions SET titre=$1, description=$2, course_tag=$3, topic_tag=$4 WHERE submission_id=$5',
      [titre, updated_description, course_tag, topic_tag, id]
    );

    /* 2. Si updated_code fourni → modifier la DERNIERE version directement */
    var version_number = null;
    if (updated_code && String(updated_code).trim().length > 0) {

      /* Trouver la derniere version */
      var lastVersion = await pool.query(
        'SELECT version_id, version_number FROM code_version ' +
        'WHERE submission_id = $1 ORDER BY version_number DESC LIMIT 1',
        [id]
      );

      if (lastVersion.rows.length > 0) {
        version_number = lastVersion.rows[0].version_number;

        /* Modifier la row directement — pas de nouvelle ligne */
        await pool.query(
          'UPDATE code_version SET code_content = $1, updated_at = $2 WHERE version_id = $3',
          [updated_code, update_timestamp, lastVersion.rows[0].version_id]
        );
      }
    }

    return res.json({
      success:          true,
      error_message:    null,
      version_number:   version_number,
      update_timestamp: update_timestamp
    });

  } catch (err) {
    console.error('[edit]', err.message);
    return res.status(500).json({
      success: false, error_message: 'Erreur serveur.',
      version_number: null, update_timestamp: null
    });
  }
};

/* ============================================================
 * DELETE /api/submissions/:id  — Delete Code Submission 
 *
 * Body JSON :
 *   user_id      -> User_ID (integer)
 *   confirmation -> Confirmation (boolean)  true
 * ============================================================ */
exports.deleteSubmission = async function (req, res) {
  if (!req.body.confirmation) {
    return res.status(400).json({
      success:       false,
      error_message: 'confirmation: true est requis dans le body.'
    });
  }

  var user_id;
  if (process.env.SKIP_AUTH === 'true') {
    user_id = parseInt(req.body.user_id || req.body.esi_id);
  } else {
    user_id = req.user ? (req.user.esi_id || req.user.user_id) : null;
  }

  var id = parseInt(req.params.id);

  try {
    var sub = await Submission.findById(id);
    if (!sub) {
      return res.status(404).json({ success: false, error_message: 'Soumission non trouvee.' });
    }
    if (user_id !== sub.esi_id) {
      return res.status(403).json({ success: false, error_message: 'Acces refuse.' });
    }

    await Submission.delete(id);
    return res.json({ success: true, error_message: null });

  } catch (err) {
    console.error('[delete]', err.message);
    return res.status(500).json({ success: false, error_message: 'Erreur serveur.' });
  }
};