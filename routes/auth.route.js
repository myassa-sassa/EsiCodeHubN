// // const express = require('express'); 
// // const authController = require('../controllers/auth.controller');
// import express from 'express';
// import * as authController from '../controller/Controller.js';
// import { registerUser, login,logout, forgotPassword, resetPassword } from '../controller/Controller.js'; 
// import { registerStudent, loginStudent,logoutStudent,forgotPasswordStudent,resetPasswordStudent} from '../controller/Controller.js'; 
// import { registerTeacher, loginTeacher,logoutTeacher,forgotPasswordTeacher,resetPasswordTeacher} from '../controller/Controller.js'; 


// // import * as authController from '../controller/Controller.js';
// const router = express.Router();

// router.post('/register', authController.registerUser);
// router.post('/login', authController.login);
// router.post('/logout', authController.logout);

// // router.post('/forgot-password', authController.forgotPassword);  // ← À AJOUTER
// // router.post('/reset-password', authController.resetPassword);  
// // /*******************************************************************************/

// router.post('/registerTeacher', authController.registerTeacher);
// router.post('/loginTeacher', authController.loginTeacher);
// router.post('/logoutTeacher', authController.logoutTeacher);
// router.post('/forgotpasswordTeacher', authController.forgotPasswordTeacher);  // ← À AJOUTER
// router.post('/resetpasswordTeacher', authController.resetPasswordTeacher);  


// /*******************************************************************************/
// router.post('/registerStudent', authController.registerStudent);
// router.post('/loginStudent', authController.loginStudent);
// router.post('/logoutStudent', authController.logoutStudent);
// router.post('/forgotpasswordStudent', authController.forgotPasswordStudent);  // ← À AJOUTER
// router.post('/resetpasswordStudent', authController.resetPasswordStudent);  



// /************************************************************************** */
// export default router;
/*****************common js  ********/
// routes/auth.route.js (version CommonJS avec commentaires conservés)
// // const express = require('express'); 
// // const authController = require('../controllers/auth.controller');
const express = require('express');
const authController = require('../controller/Controller');
// import { registerUser, login,logout, forgotPassword, resetPassword } from '../controller/Controller.js'; 
// import { registerStudent, loginStudent,logoutStudent,forgotPasswordStudent,resetPasswordStudent} from '../controller/Controller.js'; 
// import { registerTeacher, loginTeacher,logoutTeacher,forgotPasswordTeacher,resetPasswordTeacher} from '../controller/Controller.js'; 
// const authRoutes = require('./routes/auth.route');


// // import * as authController from '../controller/Controller.js';
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// router.post('/forgot-password', authController.forgotPassword);  // ← À AJOUTER
// router.post('/reset-password', authController.resetPassword);  
// /*******************************************************************************/

router.post('/registerTeacher', authController.registerTeacher);
router.post('/loginTeacher', authController.loginTeacher);
router.post('/logoutTeacher', authController.logoutTeacher);
router.post('/forgotpasswordTeacher', authController.forgotPasswordTeacher);  // ← À AJOUTER
router.post('/resetpasswordTeacher', authController.resetPasswordTeacher);  


/*******************************************************************************/
router.post('/registerStudent', authController.registerStudent);
router.post('/loginStudent', authController.loginStudent);
router.post('/logoutStudent', authController.logoutStudent);
router.post('/forgotpasswordStudent', authController.forgotPasswordStudent);  // ← À AJOUTER
router.post('/resetpasswordStudent', authController.resetPasswordStudent);  



/************************************************************************** */

// ========== AJOUTE CES ROUTES MAGIC LINK ==========
router.post('/send-magic-link', async (req, res) => {
  try {
    const { email } = req.body;
    const sequelize = require('../config/db');
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    console.log('📨 [AuthRoute] Recherche étudiant avec email:', email);
    
    const { Student } = sequelize.models;
    const student = await Student.findOne({ where: { email: email } });
    
    if (!student) {
      return res.status(404).json({ message: 'Aucun compte associé à cet email' });
    }
    
    const token = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    
    // Stockage temporaire (à déplacer dans un fichier partagé)
    if (!global.magicLinks) global.magicLinks = new Map();
    global.magicLinks.set(token, {
      email: email,
      userId: student.esi_id,
      expiresAt: Date.now() + 15 * 60 * 1000
    });
    
    const magicLink = `http://localhost:5173/verify-magic-link?token=${token}&email=${encodeURIComponent(email)}`;
    
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM || 'on_houali@esi.dz',
      subject: '🔗 Connexion à votre plateforme éducative',
      text: `Cliquez sur ce lien pour vous connecter : ${magicLink}\n\nCe lien expire dans 15 minutes.`,
      html: `<a href="${magicLink}">Se connecter</a>`
    };
    
    await sgMail.send(msg);
    console.log('✅ Magic link envoyé à', email);
    res.json({ message: 'Magic link envoyé !', email });
    
  } catch (error) {
    console.error('❌ Erreur:', error.response?.body || error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi' });
  }
});

router.post('/verify-magic-link', async (req, res) => {
  try {
    const { token, email } = req.body;
    
    if (!global.magicLinks) global.magicLinks = new Map();
    const linkData = global.magicLinks.get(token);
    
    if (!linkData) {
      return res.status(401).json({ message: 'Lien invalide ou déjà utilisé' });
    }
    
    if (Date.now() > linkData.expiresAt) {
      global.magicLinks.delete(token);
      return res.status(401).json({ message: 'Lien expiré' });
    }
    
    if (linkData.email !== decodeURIComponent(email)) {
      return res.status(401).json({ message: 'Lien invalide' });
    }
    
    const sequelize = require('../config/db');
    const { Student } = sequelize.models;
    const student = await Student.findOne({ where: { esi_id: linkData.userId } });
    
    if (!student) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    
    global.magicLinks.delete(token);
    
    const sessionToken = Buffer.from(JSON.stringify({
      esi_id: student.esi_id,
      email: student.email,
      timestamp: Date.now()
    })).toString('base64');
    
    res.json({
      success: true,
      token: sessionToken,
      user: {
        esi_id: student.esi_id,
        email: student.email,
        name: student.first_name || student.email,
        role: 'student'
      }
    });
    
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur lors de la vérification' });
  }
});
// ========== FIN MAGIC LINK ==========

module.exports = router;