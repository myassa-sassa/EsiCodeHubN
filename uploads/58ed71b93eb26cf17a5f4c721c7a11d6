// test-upload.js - Petit script pour tester l'upload
const fs = require('fs');
const path = require('path');

// Configuration
const API_URL = 'http://localhost:3000/api/upload/files';
const ESI_ID = 31731309;
const MODULE_ID = 1;

// Créer un fichier de test
const testFile = path.join(__dirname, 'test.html');
fs.writeFileSync(testFile, '<html><body><h1>Test Upload</h1></body></html>');
console.log('✅ Fichier test.html créé');

// Fonction d'upload
async function uploadFile() {
    const FormData = require('form-data');
    const axios = require('axios');
    
    const form = new FormData();
    form.append('files', fs.createReadStream(testFile));
    form.append('esi_id', ESI_ID);
    form.append('module_id', MODULE_ID);
    form.append('content', 'Test depuis script JS');
    
    try {
        const response = await axios.post(API_URL, form, {
            headers: {
                ...form.getHeaders()
            }
        });
        
        console.log('✅ Upload réussi !');
        console.log('Réponse:', response.data);
        
    } catch (error) {
        console.error('❌ Erreur:', error.response?.data || error.message);
    }
}

// Exécuter
uploadFile();