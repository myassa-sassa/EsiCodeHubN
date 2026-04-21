/*
 * Validation syntaxique des fichiers de code.
 *
 * Langages valides : c -> gcc
 *                    javascript -> node --check
 *                    java, html, css
 */

var execFile = require('child_process').execFile;

function validateC(filePath) {
  return new Promise(function (resolve, reject) {
    execFile('gcc', ['-fsyntax-only', filePath], function (err, stdout, stderr) {
      if (err) {
        reject(stderr || 'Erreur syntaxe C');
      } else {
        resolve();
      }
    });
  });
}


function validateJavaScript(filePath) {
  return new Promise(function (resolve, reject) {
    execFile('node', ['--check', filePath], function (err, stdout, stderr) {
      if (err) {
        reject(stderr || 'Erreur syntaxe JavaScript');
      } else {
        resolve();
      }
    });
  });
}

async function validateFile(filePath, language) {
  if (language === 'c') {
    await validateC(filePath);
    return;
  }

  if (language === 'javascript') {
    await validateJavaScript(filePath);
    return;
  }
}

module.exports = { validateFile: validateFile };