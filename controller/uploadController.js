/*
 * Entrees :
 *   User_ID, Code_File/code_content, Language, Title,
 *   Description, Course_Tag, Topic_Tag, Submission_Type, Visibility
 *
 * Sorties :
 *   Success (boolean), Error_Message (string),
 *   Submission_ID (integer), Upload_Timestamp (datetime)
 *
 * POST /api/upload/files   -> form-data, champ "codeFiles" (1 a 5 fichiers)
 * POST /api/upload/online  -> JSON body
 */

var fs           = require('fs');
var path         = require('path');
var pool         = require('../config/database');
var Submission   = require('../model/submission');
var validators   = require('../utils/validators');
var langValidate = require('../utils/languageValidators');

function getStudentId(req) {
  if (process.env.SKIP_AUTH === 'true') {
    return req.body.esi_id;
  }
  if (req.user) {
    return req.user.esi_id || req.user.user_id;
  }
  return null;
}

function deleteTempFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (e) {
    console.error('Impossible de supprimer le fichier temporaire :', filePath);
  }
}


/* ============================================================
 * POST /api/upload/files
 * Body : form-data
 * Champ fichiers : "codeFiles" (1 a 5 fichiers)
 * ============================================================ */
exports.uploadFiles = async function (req, res) {
  var tempPaths = [];
  if (req.files && req.files.length > 0) {
    tempPaths = req.files.map(function (f) { return f.path; });
  }

  try {
    if (req.fileErrors && req.fileErrors.length > 0) {
      return res.status(400).json({
        success:       false,
        error_message: req.fileErrors.join(' | ')
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success:       false,
        error_message: 'Aucun fichier recu. Utilisez le champ "codeFiles" (max 5 fichiers).'
      });
    }

    var esi_id      = getStudentId(req);
    var language        = req.fileLanguages ? req.fileLanguages[0] : 'unknown';
    var titre           = req.body.titre;
    var description     = req.body.description     || '';
    var course_id       = req.body.course_id;
    var module_name     = req.body.module_name;
    var submission_type = req.body.submission_type || 'educational_sharing';
    var course_tag      = req.body.course_tag      || null;
    var topic_tag       = req.body.topic_tag       || null;
    var version_notes   = req.body.version_notes   || null;
 let module_id = null;
  if (module_name) {
    try {
      const moduleResult = await pool.query(
        'SELECT id FROM module WHERE module_name = $1',
        [module_name]
      );
      if (moduleResult.rows.length > 0) {
        module_id = moduleResult.rows[0].id;
        console.log(`✅ Module trouvé: ${module_name} -> ID ${module_id}`);
      } else {
        console.log(`❌ Module non trouvé: ${module_name}`);
      }
    } catch (err) {
      console.log('Erreur recherche module:', err.message);
    }
  }
    var errors = validators.validateUploadBody({
      esi_id:      esi_id,
      titre:           titre,
      language:        language,
      module_id:       module_id,  // ← on va remplacer plus tard

      submission_type: submission_type
    });

    if (errors.length > 0) {
      return res.status(400).json({
        success:       false,
        error_message: errors.join(' | ')
      });
    }

    var client = await pool.connect();

    try {
      await client.query('BEGIN');

      var subRow = await Submission.createWithClient(client, {
        esi_id:      parseInt(esi_id),
        course_id:       course_id ? parseInt(course_id) : null,
        module_id:       module_id,

        submission_type: submission_type,
        titre:           titre,
        description:     description,
        language:        language,
        course_tag:      course_tag,
        topic_tag:       topic_tag,
        submitted_at:     new Date()
      });

      var submission_id    = subRow.submission_id;
      var upload_timestamp = subRow.submitted_at;

      var i;
      for (i = 0; i < req.files.length; i++) {
        var file     = req.files[i];
        var fileLang = req.fileLanguages[i];
        var content  = fs.readFileSync(file.path, 'utf8');

        if (content.trim().length === 0) {
          throw { status: 400, message: 'Le fichier "' + file.originalname + '" est vide.' };
        }

        try {
          await langValidate.validateFile(file.path, fileLang);
        } catch (syntaxErr) {
          throw {
            status:  400,
            message: 'Erreur syntaxe dans "' + file.originalname + '" : ' + syntaxErr
          };
        }

        await Submission.addVersion(
          client,
          submission_id,
          i + 1,
          content,
          file.originalname,
          fileLang,
          version_notes
        );
      }

      await client.query('COMMIT');

      return res.status(201).json({
        success:          true,
        submission_id:    submission_id,
        upload_timestamp: upload_timestamp,
        files_count:      req.files.length,
        error_message:    null
      });

    } catch (err) {
      await client.query('ROLLBACK');
      if (err.status) {
        return res.status(err.status).json({
          success:       false,
          error_message: err.message
        });
      }
      console.error('[uploadFiles]', err.message);
      return res.status(500).json({
        success:       false,
        error_message: 'Erreur serveur : ' + err.message
      });
    } finally {
      client.release();
    }

  } finally {
    var j;
    for (j = 0; j < tempPaths.length; j++) {
      deleteTempFile(tempPaths[j]);
    }
  }
};


/* ============================================================
 * POST /api/upload/online
 * Body : JSON
 * ============================================================ */
exports.uploadOnline = async function (req, res) {
  function getEsiId(req) {
    if (process.env.SKIP_AUTH === 'true') {
        return req.body.esi_id;
    }
    if (req.user) {
        return req.user.esi_id || req.user.user_id;
    }
    return null;
}
  var esi_id      = getEsiId(req);
  var titre           = req.body.titre;
  var description     = req.body.description     || '';
  var language        = req.body.language;
  var code_content    = req.body.code_content;
  var course_id       = req.body.course_id;
    var module_name     = req.body.module_name;     // ← CHANGÉ: course_id → module_name

  var submission_type = req.body.submission_type || 'educational_sharing';
  var course_tag      = req.body.course_tag      || null;
  var topic_tag       = req.body.topic_tag       || null;
  var version_notes   = req.body.version_notes   || null;
 let module_id = null;
  if (module_name) {
    try {
      const moduleResult = await pool.query(
        'SELECT id FROM module WHERE module_name = $1',
        [module_name]
      );
      if (moduleResult.rows.length > 0) {
        module_id = moduleResult.rows[0].id;
        console.log(`Module trouvé: ${module_name} -> ID ${module_id}`);
      }
    } catch (err) {
      console.log('Erreur recherche module:', err.message);
    }
  }
  if (!code_content || String(code_content).trim().length === 0) {
    return res.status(400).json({
      success:       false,
      error_message: 'code_content ne peut pas etre vide.'
    });
  }

  var errors = validators.validateUploadBody({
    esi_id:      esi_id,
    titre:           titre,
    language:        language,
    submission_type: submission_type
  });

  if (errors.length > 0) {
    return res.status(400).json({
      success:       false,
      error_message: errors.join(' | ')
    });
  }

  var ext     = (language === 'javascript') ? 'js' : language;
  var tmpDir  = path.join('uploads', 'tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  var tmpFile = path.join(tmpDir, 'temp_' + Date.now() + '.' + ext);

  fs.writeFileSync(tmpFile, code_content);

  try {
    await langValidate.validateFile(tmpFile, language);
  } catch (syntaxErr) {
    deleteTempFile(tmpFile);
    return res.status(400).json({
      success:       false,
      error_message: 'Erreur de syntaxe : ' + syntaxErr
    });
  } finally {
    deleteTempFile(tmpFile);
  }

  var client = await pool.connect();
  try {
    await client.query('BEGIN');

    var subRow = await Submission.createWithClient(client, {
      esi_id:      parseInt(esi_id),
      course_id:       course_id ? parseInt(course_id) : null,
           module_id:       module_id,

      submission_type: submission_type,
      titre:           titre,
      description:     description,
      language:        language,
      course_tag:      course_tag,
      topic_tag:       topic_tag,
      submitted_at:     new Date()
    });

    var submission_id    = subRow.submission_id;
    var upload_timestamp = subRow.submitted_at;

    await Submission.addVersion(
      client,
      submission_id,
      1,
      code_content,
      null,
      language,
      version_notes
    );

    await client.query('COMMIT');

    return res.status(201).json({
      success:          true,
      submission_id:    submission_id,
      upload_timestamp: upload_timestamp,
      error_message:    null
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[uploadOnline]', err.message);
    return res.status(500).json({
      success:       false,
      error_message: 'Erreur serveur : ' + err.message
    });
  } finally {
    client.release();
  }
};