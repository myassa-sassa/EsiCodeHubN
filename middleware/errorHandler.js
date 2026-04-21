// module.exports = (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ success: false, message: 'Une erreur interne est survenue.' });
// };





/**************common js  *******/
// module.exports = (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ success: false, message: 'Une erreur interne est survenue.' });
// };


var multer = require('multer');

function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success:       false,
        error_message: 'Fichier trop volumineux. Maximum 10 Mo par fichier.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success:       false,
        error_message: 'Trop de fichiers. Maximum 5 fichiers par upload.'
      });
    }
    return res.status(400).json({
      success:       false,
      error_message: err.message
    });
  }

  console.error('[Erreur serveur]', err.message || err);
  return res.status(500).json({
    success:       false,
    error_message: 'Erreur interne du serveur.'
  });
}

module.exports = errorHandler;