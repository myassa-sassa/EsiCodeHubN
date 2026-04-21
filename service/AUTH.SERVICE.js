// // // * 🔹 AUTH SERVICE – Réinitialisation de mot de passe
// //  * ===============================
// //  *
// //  * Ce fichier contient les services pour gérer la réinitialisation de mot de passe.
// //  * Il fonctionne avec Node.js, Sequelize et Nodemailer + Gmail OAuth2.
// //  *
// //  * Processus détaillé :
// //  *
// //  * 1️⃣ L'utilisateur oublie son mot de passe et fournit son email.
// //  * 2️⃣ La fonction `forgotPassword(email)` :
// //  *    - Vérifie que l'email existe dans la base de données.
// //  *    - Génère un token aléatoire sécurisé (`resetToken`).
// //  *    - Hash le token et le stocke dans la base (`resetPasswordToken`) avec une date d'expiration de 15 min.
// //  *    - Crée un lien de réinitialisation incluant le token (ex: http://localhost:3000/reset-password/<token>).
// //  *    - Envoie un email à l'utilisateur via Gmail OAuth2 avec ce lien.
// //  *    - Affiche le lien dans la console pour test (Postman / développement).
// //  *
// //  * 3️⃣ L'utilisateur clique sur le lien et fournit un nouveau mot de passe.
// //  * 4️⃣ La fonction `resetPassword(token, newPassword)` :
// //  *    - Hash le token reçu pour vérifier la correspondance dans la base.
// //  *    - Vérifie que le token est toujours valide (non expiré).
// //  *    - Hash le nouveau mot de passe et met à jour la base.
// //  *    - Supprime le token et sa date d'expiration pour sécurité.
// //  *    - Retourne un message de succès.
// //  *
// //  * ✅ Ce système fonctionne sans front-end grâce à Postman ou console.
// //  * ✅ L'envoi d'emails utilise OAuth2 pour Gmail (pas besoin d'app password).
// //  *
// //  * 🔹 OAuth2 expliqué :
// //  *   - Google OAuth2 permet d'envoyer des emails via Gmail sans exposer le mot de passe.
// //  *   - Le refresh token long terme permet de générer dynamiquement des access tokens temporaires.
// //  *   - Nodemailer utilise ces tokens pour authentifier la session Gmail de manière sécurisée.
// //  *

// // const crypto = require("crypto"); // Génération de tokens aléatoires
// // const bcrypt = require("bcrypt"); // Hash des mots de passe
// // const { Op } = require("sequelize"); // Opérateurs Sequelize (>, <, etc.)
// // const { User } = require("../db/models/user"); // Modèle Sequelize User
// // const nodemailer = require("nodemailer"); // Pour envoyer des emails
// // const { google } = require("googleapis"); // OAuth2 pour Gmail
// /**************************************/
// import crypto from "crypto"; // Génération de tokens aléatoires
// import bcrypt from "bcrypt"; // Hash des mots de passe
// import { Op } from "sequelize"; // Opérateurs Sequelize (>, <, etc.)
// import  User  from "../db/models/user.js"; // Modèle Sequelize User (ajoutez .js)
// import nodemailer from "nodemailer"; // Pour envoyer des emails
// import { google } from "googleapis"; // OAuth2 pour Gmail
// import dotenv from "dotenv";
// dotenv.config();


// // ===============================
// // 🔹 CONFIGURATION OAUTH2 POUR GMAIL
// // ===============================
// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID, // Client ID OAuth2 depuis Google Cloud
//   process.env.CLIENT_SECRET, // Client Secret OAuth2 depuis Google Cloud
// );
// oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN }); // Refresh token longue durée

// // ===============================
// // 🔹 FORGOT PASSWORD
// // ===============================
// const forgotPassword = async (email) => {
//   // 1️⃣ Vérifier si l'utilisateur existe
//   const user = await User.findOne({ where: { email } });
//   if (!user) throw new Error("Utilisateur introuvable");

//   // 2️⃣ Générer un token aléatoire pour la réinitialisation
//   const resetToken = crypto.randomBytes(32).toString("hex");

//   // 3️⃣ Hasher le token avant de le stocker dans la DB pour sécurité
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // 4️⃣ Stocker le token hashé et la date d'expiration
//   // user.resetPasswordToken = hashedToken;
//   // user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Expire dans 15 minutes
//   // await user.save();
//   await User.update(
//   { 
//     resetPasswordToken: hashedToken,
//     resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000)  // ← Date, pas nombre
//   },
//   { where: { email } }
// );

//   // 5️⃣ Créer le lien de réinitialisation à envoyer à l'utilisateur
//   const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

//   // ===============================
//   // 🔹 ENVOI EMAIL VIA GMAIL + OAUTH2
//   // ===============================
//   const accessToken = await oAuth2Client.getAccessToken(); // Génère un access token temporaire

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.EMAIL_USER, // Ton compte Gmail
//       clientId: process.env.CLIENT_ID, // Client ID OAuth2
//       clientSecret: process.env.CLIENT_SECRET, // Client Secret OAuth2
//       refreshToken: process.env.REFRESH_TOKEN, // Refresh token
//       accessToken: accessToken.token, // Token temporaire pour cet envoi
//     },
//   });

//   await transporter.sendMail({
//     from: `"Reset Password" <${process.env.EMAIL_USER}>`,
//     to: user.email,
//     subject: "Réinitialisation du mot de passe",
//     html: `
//       <h3>Réinitialisation du mot de passe</h3>
//       <p>Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
//       <a href="${resetURL}">${resetURL}</a>
//     `,
//   });
//   // ===============================
//   // 🔹 ENVOI EMAIL AVEC MOT DE PASSE D'APPLICATION
//   // ===============================
  
// }

// // ===============================
// // 🔹 RESET PASSWORD
// // ===============================
// const resetPassword = async (token, newPassword) => {
//   // 1️⃣ Hasher le token reçu pour comparer avec la base de données
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//   // 2️⃣ Chercher l'utilisateur avec le token valide et non expiré
//   const user = await User.findOne({
//     where: {
//       resetPasswordToken: hashedToken,
//       // resetPasswordExpires: { [Op.gt]: Date.now() }, // Vérifier la validité
//    resetPasswordExpires: { [Op.gt]: new Date() }  // ← Compare avec une Date

//     },
//   });

//   if (!user) throw new Error("Token invalide ou expiré");

//   // 3️⃣ Hasher le nouveau mot de passe
//   const hashedPassword = await bcrypt.hash(newPassword, 10);

//   // 4️⃣ Mettre à jour le mot de passe et supprimer le token et expiration
//   user.password = hashedPassword;
//   user.resetPasswordToken = null;
//   user.resetPasswordExpires = null;

//   await user.save(); // Sauvegarde dans la DB

//   return { message: "Mot de passe mis à jour avec succès" };
// };

// // ===============================
// // 🔹 EXPORT
// // ===============================
// // module.exports = {
// //   forgotPassword,
// //   resetPassword,
// // };
// export default {
//   forgotPassword,
//   resetPassword,
// };

/********common js  *******/
// // * 🔹 AUTH SERVICE – Réinitialisation de mot de passe
//  * ===============================
//  *
//  * Ce fichier contient les services pour gérer la réinitialisation de mot de passe.
//  * Il fonctionne avec Node.js, Sequelize et Nodemailer + Gmail OAuth2.
//  *
//  * Processus détaillé :
//  *
//  * 1️⃣ L'utilisateur oublie son mot de passe et fournit son email.
//  * 2️⃣ La fonction `forgotPassword(email)` :
//  *    - Vérifie que l'email existe dans la base de données.
//  *    - Génère un token aléatoire sécurisé (`resetToken`).
//  *    - Hash le token et le stocke dans la base (`resetPasswordToken`) avec une date d'expiration de 15 min.
//  *    - Crée un lien de réinitialisation incluant le token (ex: http://localhost:3000/reset-password/<token>).
//  *    - Envoie un email à l'utilisateur via Gmail OAuth2 avec ce lien.
//  *    - Affiche le lien dans la console pour test (Postman / développement).
//  *
//  * 3️⃣ L'utilisateur clique sur le lien et fournit un nouveau mot de passe.
//  * 4️⃣ La fonction `resetPassword(token, newPassword)` :
//  *    - Hash le token reçu pour vérifier la correspondance dans la base.
//  *    - Vérifie que le token est toujours valide (non expiré).
//  *    - Hash le nouveau mot de passe et met à jour la base.
//  *    - Supprime le token et sa date d'expiration pour sécurité.
//  *    - Retourne un message de succès.
//  *
//  * ✅ Ce système fonctionne sans front-end grâce à Postman ou console.
//  * ✅ L'envoi d'emails utilise OAuth2 pour Gmail (pas besoin d'app password).
//  *
//  * 🔹 OAuth2 expliqué :
//  *   - Google OAuth2 permet d'envoyer des emails via Gmail sans exposer le mot de passe.
//  *   - Le refresh token long terme permet de générer dynamiquement des access tokens temporaires.
//  *   - Nodemailer utilise ces tokens pour authentifier la session Gmail de manière sécurisée.
//  *

// const crypto = require("crypto"); // Génération de tokens aléatoires
// const bcrypt = require("bcrypt"); // Hash des mots de passe
// const { Op } = require("sequelize"); // Opérateurs Sequelize (>, <, etc.)
// const { User } = require("../db/models/user"); // Modèle Sequelize User
// const nodemailer = require("nodemailer"); // Pour envoyer des emails
// const { google } = require("googleapis"); // OAuth2 pour Gmail
/**************************************/
const crypto = require("crypto"); // Génération de tokens aléatoires
const bcrypt = require("bcrypt"); // Hash des mots de passe
const { Op } = require("sequelize"); // Opérateurs Sequelize (>, <, etc.)
const User = require("../db/models/user.js"); // Modèle Sequelize User
const nodemailer = require("nodemailer"); // Pour envoyer des emails
const { google } = require("googleapis"); // OAuth2 pour Gmail
const dotenv = require("dotenv");
dotenv.config();

// ===============================
// 🔹 CONFIGURATION OAUTH2 POUR GMAIL
// ===============================
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID, // Client ID OAuth2 depuis Google Cloud
  process.env.CLIENT_SECRET, // Client Secret OAuth2 depuis Google Cloud
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN }); // Refresh token longue durée

// ===============================
// 🔹 FORGOT PASSWORD
// ===============================
const forgotPassword = async (email) => {
  // 1️⃣ Vérifier si l'utilisateur existe
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Utilisateur introuvable");

  // 2️⃣ Générer un token aléatoire pour la réinitialisation
  const resetToken = crypto.randomBytes(32).toString("hex");

  // 3️⃣ Hasher le token avant de le stocker dans la DB pour sécurité
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 4️⃣ Stocker le token hashé et la date d'expiration
  // user.resetPasswordToken = hashedToken;
  // user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Expire dans 15 minutes
  // await user.save();
  await User.update(
    { 
      resetPasswordToken: hashedToken,
      resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000)  // ← Date, pas nombre
    },
    { where: { email } }
  );

  // 5️⃣ Créer le lien de réinitialisation à envoyer à l'utilisateur
  const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

  // ===============================
  // 🔹 ENVOI EMAIL VIA GMAIL + OAUTH2
  // ===============================
  const accessToken = await oAuth2Client.getAccessToken(); // Génère un access token temporaire

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER, // Ton compte Gmail
      clientId: process.env.CLIENT_ID, // Client ID OAuth2
      clientSecret: process.env.CLIENT_SECRET, // Client Secret OAuth2
      refreshToken: process.env.REFRESH_TOKEN, // Refresh token
      accessToken: accessToken.token, // Token temporaire pour cet envoi
    },
  });

  await transporter.sendMail({
    from: `"Reset Password" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Réinitialisation du mot de passe",
    html: `
      <h3>Réinitialisation du mot de passe</h3>
      <p>Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
      <a href="${resetURL}">${resetURL}</a>
    `,
  });
  // ===============================
  // 🔹 ENVOI EMAIL AVEC MOT DE PASSE D'APPLICATION
  // ===============================
}

// ===============================
// 🔹 RESET PASSWORD
// ===============================
const resetPassword = async (token, newPassword) => {
  // 1️⃣ Hasher le token reçu pour comparer avec la base de données
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // 2️⃣ Chercher l'utilisateur avec le token valide et non expiré
  const user = await User.findOne({
    where: {
      resetPasswordToken: hashedToken,
      // resetPasswordExpires: { [Op.gt]: Date.now() }, // Vérifier la validité
      resetPasswordExpires: { [Op.gt]: new Date() }  // ← Compare avec une Date
    },
  });

  if (!user) throw new Error("Token invalide ou expiré");

  // 3️⃣ Hasher le nouveau mot de passe
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 4️⃣ Mettre à jour le mot de passe et supprimer le token et expiration
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save(); // Sauvegarde dans la DB

  return { message: "Mot de passe mis à jour avec succès" };
};

// ===============================
// 🔹 EXPORT
// ===============================
// module.exports = {
//   forgotPassword,
//   resetPassword,
// };
module.exports = {
  forgotPassword,
  resetPassword,
};