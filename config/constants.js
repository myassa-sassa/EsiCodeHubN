module.exports = {

  ALLOWED_LANGUAGES: ['c', 'javascript', 'java', 'html', 'css'],

  ALLOWED_SUB_TYPES: ['review', 'help_request', 'educational_sharing'],

  /* Upload fichier : max 5 fichiers, 10 Mo chacun */
  MAX_FILES:     5,
  MAX_FILE_SIZE: 10 * 1024 * 1024,

  EXTENSION_MAP: {
    '.c':    'c',
    '.js':   'javascript',
    '.java': 'java',
    '.html': 'html',
    '.css':  'css'
  }
};