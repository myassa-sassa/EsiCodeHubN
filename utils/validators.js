var constants = require('../config/constants');

function validateUploadBody(data) {
  var errors = [];

  var esi_id          = data.esi_id;
  var titre           = data.titre;
  var language        = data.language;
  var submission_type = data.submission_type;

  if (!esi_id) {
    errors.push('esi_id est obligatoire.');
  } else if (isNaN(Number(esi_id)) || Number(esi_id) <= 0) {
    errors.push('esi_id doit etre un entier positif.');
  }

  if (!titre || String(titre).trim().length === 0) {
    errors.push('titre est obligatoire.');
  } else if (String(titre).trim().length > 255) {
    errors.push('titre ne doit pas depasser 255 caracteres.');
  }

  if (!language) {
    errors.push('language est obligatoire.');
  } else if (constants.ALLOWED_LANGUAGES.indexOf(language) === -1) {
    errors.push(
      'language invalide. Acceptes : ' + constants.ALLOWED_LANGUAGES.join(', ') + '.'
    );
  }

  if (submission_type && constants.ALLOWED_SUB_TYPES.indexOf(submission_type) === -1) {
    errors.push(
      'submission_type invalide. Acceptes : ' + constants.ALLOWED_SUB_TYPES.join(', ') + '.'
    );
  }

  return errors;
}

module.exports = { validateUploadBody: validateUploadBody };