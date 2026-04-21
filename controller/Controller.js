
// "use strict";

// // const authService = require("../service/AUTH.SERVICE");
// // import authService from "../service/AUTH.SERVICE.js";
// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// import User from '../db/models/user.js';
// import Student from '../db/models/student.js';
// import Teacher from '../db/models/teacher.js';

// import bcrypt from 'bcrypt';
// // import { Sequelize } from 'sequelize';
// import { Sequelize, Op } from 'sequelize';  // Ajoutez Op pour les opérateurs
// import nodemailer from 'nodemailer';

// // const jwt = require('jsonwebtoken');
// import jwt from 'jsonwebtoken';


// export const registerUser = async (req, res) => {
//     try {
//         const {name, email, password } = req.body;

//         // const existingUser = await User.findOne({ $or: [{name }, { email }] });
//   const existingUser = await User.findOne({
//             where: {
//                 [Op.or]: [
//                     { name: name },
//                     { email: email }
//                 ]
//             }
//         });
//         if (existingUser) {
//             return res.status(400).json({ message: "Username or email already exists" });
//         }

//         const countexistingUsers = await User.count();
//         let role = 'user';
//         if (countexistingUsers === 0) {
//             // First user becomes admin
//             role = 'admin';
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // const newUser = new User({ username, email, password: hashedPassword });
//         // await newUser.save();

//         // const newUser = await mongoose.model('User').create({ username, email, password: hashedPassword, role: role });
//         // const newUser = await User.create({ name, email, password: hashedPassword, role });
//        const newUser = await User.create({ 
//             name, 
//             email, 
//             password: hashedPassword, 
//             role 
//         });
//         const token = jwt.sign(
//             { userId: await newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         )
//         res.status(201).json({ message: "User registered successfully" , user: newUser , token });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// export const login = async (req, res) => {
//     try{
//         const { email, password } = req.body;
//         // const user = await User.findOne({ email });
//            // ✅ CORRECTION : Utilisez la syntaxe Sequelize avec "where"
//         const user = await User.findOne({ 
//             where: { email } 
//         });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email: user not found" });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Invalid password" });
//         }
//         const token = jwt.sign(
//             { userId: user.id, name: user.name, email: user.email, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );
//         res.status(200).json({ message: "Login successful", token });
//     }catch (error) {
//               console.error("Erreur register:", error); // Pour le debug
//         res.status(500).json({ message: error.message });
//     }
// }


// // ===============================
// // 🔹LOGOUT
// // ===============================


// // ===============================
// // 🔹 LOGOUT
// // ===============================
// export const logout = async (req, res) => {
//     try {
//         // Récupérer le token du header Authorization
//         const authHeader = req.headers.authorization;
        
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(400).json({ message: "No token provided" });
//         }
        
//         const token = authHeader.split(' ')[1];
        
//         // Option 1: Simple - just return success (le frontend supprimera le token)
//         // C'est la méthode la plus courante avec JWT
        
//         return res.status(200).json({ 
//             message: "Logout successful",
//             success: true 
//         });
        
//         // Option 2: Si vous voulez blacklister le token (plus sécurisé)
//         // Décommentez les lignes ci-dessous si vous avez un modèle BlacklistedToken
        
//         /*
//         // Décoder le token pour connaître sa date d'expiration
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Sauvegarder le token dans une table de blacklist
//         await BlacklistedToken.create({
//             token: token,
//             expiresAt: new Date(decoded.exp * 1000) // Convertir en date
//         });
        
//         return res.status(200).json({ 
//             message: "Logout successful",
//             success: true 
//         });
//         */
        
//     } catch (error) {
//         console.error("Erreur logout:", error);
        
//         // Même en cas d'erreur, on peut considérer que le logout est réussi
//         // car le frontend va supprimer le token
//         return res.status(200).json({ 
//             message: "Logout successful",
//             success: true 
//         });
//     }
// };












// // ===============================
// // 🔹 FORGOT PASSWORD
// // ===============================
// // const forgotPassword = async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     const result = await authService.forgotPassword(email);

// //     return res.status(200).json(result);
// //   } catch (error) {
// //     return res.status(400).json({
// //       message: error.message,
// //     });
// //   }
// // };




// // ===============================
// // 🔹 FORGOT PASSWORD - CORRIGÉ
// // ===============================
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
    
//     console.log("Email reçu pour forgot password:", email);
    
//     // Vérifier que l'email est fourni
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }
    
//     // Chercher l'utilisateur dans la base de données
//     const user = await User.findOne({ where: { email } });
    
//     console.log("Utilisateur trouvé?", user ? "Oui" : "Non");
    
//     // Si l'utilisateur n'existe pas, retourner une erreur claire
//     if (!user) {
//       return res.status(404).json({ message: "User not found with this email" });
//     }
    
//     // Générer un token de réinitialisation
//     const resetToken = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
    
//     // Sauvegarder le token dans la base de données
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 heure
//     await user.save();
    
//     // Ici, vous enverriez un email avec le lien de réinitialisation
//     // Par exemple: http://localhost:3000/reset-password?token=${resetToken}
    
//     console.log("Token de réinitialisation généré pour:", user.email);
    
//     // ===========================================
//     // 🔥 AJOUTEZ LE CODE D'ENVOI D'EMAIL ICI
//     // ===========================================
    
//     // Configurer le transporteur pour MailDev
//     const transporter = nodemailer.createTransport({
//       host: 'localhost',
//       port: 1025,
//       secure: false,
//       ignoreTLS: true
//     });
    
//     // Créer le lien de réinitialisation (ajustez l'URL selon votre frontend)
//     const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    
//     // Préparer l'email
//     const mailOptions = {
//       from: '"Mon Application" <noreply@monapp.com>',
//       to: user.email,
//       subject: 'Réinitialisation de votre mot de passe',
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="utf-8">
//             <title>Réinitialisation de mot de passe</title>
//         </head>
//         <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//             <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
//                 <h2 style="color: #4CAF50; text-align: center;">Réinitialisation de mot de passe</h2>
//                 <p>Bonjour <strong>${user.name || user.email}</strong>,</p>
//                 <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
//                 <p>Cliquez sur le bouton ci-dessous pour procéder :</p>
//                 <div style="text-align: center; margin: 30px 0;">
//                     <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Réinitialiser mon mot de passe</a>
//                 </div>
//                 <p>Ou copiez ce lien dans votre navigateur :</p>
//                 <p style="background-color: #f4f4f4; padding: 10px; word-break: break-all;">${resetLink}</p>
//                 <p><strong>Ce lien est valable 1 heure.</strong></p>
//                 <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
//                 <hr style="border: 1px solid #ddd; margin: 20px 0;">
//                 <p style="color: #777; font-size: 0.9em; text-align: center;">Cet email est automatique, merci de ne pas y répondre.</p>
//             </div>
//         </body>
//         </html>
//       `
//     };
    
//     // Envoyer l'email
//     try {
//       await transporter.sendMail(mailOptions);
//       console.log(`✅ Email envoyé avec succès à ${user.email}`);
//     } catch (emailError) {
//       console.error("❌ Erreur d'envoi d'email:", emailError);
//       // On continue même si l'email échoue, pour ne pas bloquer l'utilisateur
//     }

//     // Retourner une réponse de succès
//     return res.status(200).json({ 
//       message: "Password reset email sent successfully",
//       // En développement, vous pouvez retourner le token pour tester
//       resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
//     });
    
//   } catch (error) {
//     console.error("Erreur dans forgotPassword:", error);
//     return res.status(500).json({ 
//       message: "Server error", 
//       error: error.message 
//     });
//   }
// };
// /*-----------------------------------------*/

// // ===============================
// // 🔹 RESET PASSWORD
// // ===============================
// // const resetPassword = async (req, res) => {
// //   try {
// //     const { token } = req.body;
// //     const { password } = req.body;

// //     const result = await authService.resetPassword(token, password);

// //     return res.status(200).json(result);
// //   } catch (error) {
// //     return res.status(400).json({
// //       message: error.message,
// //     });
// //   }
// // };
// /*------------------------------------------------------*/
// // ===============================
// // 🔹 RESET PASSWORD - CORRIGÉ (sans authService)
// // ===============================
// const resetPassword = async (req, res) => {
//   try {
//     const { token, password } = req.body;  // ← Correction ici : récupérer les deux champs
    
//     console.log("Token reçu pour reset password:", token);
//     console.log("Nouveau mot de passe reçu");
    
//     // Vérifier que le token et le mot de passe sont fournis
//     if (!token || !password) {
//       return res.status(400).json({ message: "Token and password are required" });
//     }
    
//     // Vérifier que le mot de passe est assez long (optionnel)
//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }
    
//     // Vérifier le token JWT
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Token décodé:", decoded);
    
//     // Chercher l'utilisateur avec ce token non expiré
//     const user = await User.findOne({
//       where: {
//         id: decoded.userId,
//         resetPasswordToken: token,
//         resetPasswordExpires: { [Op.gt]: new Date() }  // Token non expiré
//       }
//     });
    
//     if (!user) {
//       console.log("Utilisateur non trouvé ou token expiré");
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }
    
//     console.log("Utilisateur trouvé:", user.email);
    
//     // Hasher le nouveau mot de passe
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Mettre à jour l'utilisateur
//     user.password = hashedPassword;
//     user.resetPasswordToken = null;
//     user.resetPasswordExpires = null;
//     await user.save();
    
//     console.log("Mot de passe réinitialisé avec succès pour:", user.email);
    
//     return res.status(200).json({ message: "Password reset successful" });
    
//   } catch (error) {
//     console.error("Erreur dans resetPassword:", error);
    
//     // Si l'erreur est due à un token JWT invalide
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(400).json({ message: "Invalid token" });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(400).json({ message: "Token expired" });
//     }
    
//     return res.status(500).json({ 
//       message: "Server error", 
//       error: error.message 
//     });
//   }
// };
// // module.exports = {
// //   forgotPassword,
// //   resetPassword,
// // };


// /******************************************************Student Registration **************************************************/




// export const registerStudent = async (req, res) => {
//     try {
//         const {first_name,last_name,esi_id, email, password } = req.body;

//         // const existingUser = await User.findOne({ $or: [{name }, { email }] });
//   const existingStudent = await Student.findOne({
//             where: {
//                 [Op.or]: [
//                     { first_name: first_name },
//                     { last_name: last_name },
//                     {esi_id:esi_id},
//                     { email: email }
//                 ]
//             }
//         });
//         if (existingStudent) {
//             return res.status(400).json({ message: "Studentname or email already exists" });
//         }

//         const countexistingStudents = await Student.count();
//         let role = 'user';
//         if (countexistingStudents === 0) {     //normalement tetnaha hadi
//             // First user becomes admin
//             role = 'admin';
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // const newUser = new User({ username, email, password: hashedPassword });
//         // await newUser.save();

//         // const newUser = await mongoose.model('User').create({ username, email, password: hashedPassword, role: role });
//         // const newUser = await User.create({ name, email, password: hashedPassword, role });
//        const newStudent = await Student.create({ 
//             first_name,
//             last_name, 
//             esi_id,
//             email, 
//             password: hashedPassword, 
//             role 
//         });
//         const token = jwt.sign(
//             { studentId: await newStudent.id, first_name: newStudent.first_name,last_name: newStudent.last_name,esi_id:newStudent.esi_id, email: newStudent.email, role: newStudent.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         )
//         res.status(201).json({ message: "Student registered successfully" , student: newStudent , token });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }



// export const loginStudent = async (req, res) => {
//     try{
//         const {email, password } = req.body;
//         // const user = await User.findOne({ email });
//            // ✅ CORRECTION : Utilisez la syntaxe Sequelize avec "where"
//         const student = await Student.findOne({ 
//             where: { email } 
//         });
//         if (!student) {
//             return res.status(400).json({ message: "Invalid email: student not found" });
//         }
//         const isPasswordValid = await bcrypt.compare(password, student.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Invalid password" });
//         }
//         const token = jwt.sign(
//             { student_id: student.id, first_name:student.first_name,last_name:student.last_name, esi_id:student.esi_id,email:student.email, role: student.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );
//         res.status(200).json({ message: "Login successful", token });
//     }catch (error) {
//               console.error("Erreur register:", error); // Pour le debug
//         res.status(500).json({ message: error.message });
//     }
// }



// export const logoutStudent = async (req, res) => {
//     try {
//         // Récupérer le token du header Authorization
//         const authHeader = req.headers.authorization;
        
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(400).json({ message: "No token provided" });
//         }
        
//         const token = authHeader.split(' ')[1];
        
//         // Option 1: Simple - just return success (le frontend supprimera le token)
//         // C'est la méthode la plus courante avec JWT
        
//         return res.status(200).json({ 
//             message: "Logout successful",
//             success: true 
//         });
        
//         // Option 2: Si vous voulez blacklister le token (plus sécurisé)
//         // Décommentez les lignes ci-dessous si vous avez un modèle BlacklistedToken
        
//         /*
//         // Décoder le token pour connaître sa date d'expiration
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Sauvegarder le token dans une table de blacklist
//         await BlacklistedToken.create({
//             token: token,
//             expiresAt: new Date(decoded.exp * 1000) // Convertir en date
//         });
        
//         return res.status(200).json({ 
//             message: "Logout successful",
//             success: true 
//         });
//         */
        
//     } catch (error) {
//         console.error("Erreur logout:", error);
        
//         // Même en cas d'erreur, on peut considérer que le logout est réussi
//         // car le frontend va supprimer le token
//         return res.status(200).json({ 
//             message: "Logout successful",
//             success: true 
//         });
//     }
// };







// // ===============================
// // 🔹 FORGOT PASSWORD - CORRIGÉ
// // ===============================
// const forgotPasswordStudent = async (req, res) => {
//   try {
//     const { email } = req.body;
    
//     console.log("Email reçu pour forgot password:", email);
    
//     // Vérifier que l'email est fourni
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }
    
//     // Chercher l'utilisateur dans la base de données
//     const student = await Student.findOne({ where: { email } });
    
//     console.log("Utilisateur trouvé?", student ? "Oui" : "Non");
    
//     // Si l'utilisateur n'existe pas, retourner une erreur claire
//     if (!student) {
//       return res.status(404).json({ message: "Student not found with this email" });
//     }
    
//     // Générer un token de réinitialisation
//     const resetToken = jwt.sign(
//       { studentId: student.id, email: student.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
    
//     // Sauvegarder le token dans la base de données
//     student.resetPasswordToken = resetToken;
//     student.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 heure
//     await student.save();
    
//     // Ici, vous enverriez un email avec le lien de réinitialisation
//     // Par exemple: http://localhost:3000/reset-password?token=${resetToken}
    
//     console.log("Token de réinitialisation généré pour:", student.email);
    
//     // ===========================================
//     // 🔥 AJOUTEZ LE CODE D'ENVOI D'EMAIL ICI
//     // ===========================================
    
//     // Configurer le transporteur pour MailDev
//     const transporter = nodemailer.createTransport({
//       host: 'localhost',
//       port: 1025,
//       secure: false,
//       ignoreTLS: true
//     });
    
//     // Créer le lien de réinitialisation (ajustez l'URL selon votre frontend)
//     const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    
//     // Préparer l'email
//     const mailOptions = {
//       from: '"Mon Application" <noreply@monapp.com>',
//       to: student.email,
//       subject: 'Réinitialisation de votre mot de passe',
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="utf-8">
//             <title>Réinitialisation de mot de passe</title>
//         </head>
//         <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//             <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
//                 <h2 style="color: #4CAF50; text-align: center;">Réinitialisation de mot de passe</h2>
//                 <p>Bonjour <strong>${student.name || student.email}</strong>,</p>
//                 <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
//                 <p>Cliquez sur le bouton ci-dessous pour procéder :</p>
//                 <div style="text-align: center; margin: 30px 0;">
//                     <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Réinitialiser mon mot de passe</a>
//                 </div>
//                 <p>Ou copiez ce lien dans votre navigateur :</p>
//                 <p style="background-color: #f4f4f4; padding: 10px; word-break: break-all;">${resetLink}</p>
//                 <p><strong>Ce lien est valable 1 heure.</strong></p>
//                 <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
//                 <hr style="border: 1px solid #ddd; margin: 20px 0;">
//                 <p style="color: #777; font-size: 0.9em; text-align: center;">Cet email est automatique, merci de ne pas y répondre.</p>
//             </div>
//         </body>
//         </html>
//       `
//     };
    
//     // Envoyer l'email
//     try {
//       await transporter.sendMail(mailOptions);
//       console.log(`✅ Email envoyé avec succès à ${student.email}`);
//     } catch (emailError) {
//       console.error("❌ Erreur d'envoi d'email:", emailError);
//       // On continue même si l'email échoue, pour ne pas bloquer l'utilisateur
//     }

//     // Retourner une réponse de succès
//     return res.status(200).json({ 
//       message: "Password reset email sent successfully",
//       // En développement, vous pouvez retourner le token pour tester
//       resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
//     });
    
//   } catch (error) {
//     console.error("Erreur dans forgotPassword:", error);
//     return res.status(500).json({ 
//       message: "Server error", 
//       error: error.message 
//     });
//   }
// };




// // ===============================
// // 🔹 RESET PASSWORD - CORRIGÉ (sans authService)
// // ===============================
// const resetPasswordStudent = async (req, res) => {
//   try {
//     const { token, password } = req.body;  // ← Correction ici : récupérer les deux champs
    
//     console.log("Token reçu pour reset password:", token);
//     console.log("Nouveau mot de passe reçu");
    
//     // Vérifier que le token et le mot de passe sont fournis
//     if (!token || !password) {
//       return res.status(400).json({ message: "Token and password are required" });
//     }
    
//     // Vérifier que le mot de passe est assez long (optionnel)
//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }
    
//     // Vérifier le token JWT
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Token décodé:", decoded);
    
//     // Chercher l'utilisateur avec ce token non expiré
//     const student = await Student.findOne({
//       where: {
//         id: decoded.studentId,
//         resetPasswordToken: token,
//         resetPasswordExpires: { [Op.gt]: new Date() }  // Token non expiré
//       }
//     });
    
//     if (!student) {
//       console.log("Utilisateur non trouvé ou token expiré");
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }
    
//     console.log("Utilisateur trouvé:", student.email);
    
//     // Hasher le nouveau mot de passe
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Mettre à jour l'utilisateur
//     student.password = hashedPassword;
//     student.resetPasswordToken = null;
//     student.resetPasswordExpires = null;
//     await student.save();
    
//     console.log("Mot de passe réinitialisé avec succès pour:", student.email);
    
//     return res.status(200).json({ message: "Password reset successful" });
    
//   } catch (error) {
//     console.error("Erreur dans resetPassword:", error);
    
//     // Si l'erreur est due à un token JWT invalide
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(400).json({ message: "Invalid token" });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(400).json({ message: "Token expired" });
//     }
    
//     return res.status(500).json({ 
//       message: "Server error", 
//       error: error.message 
//     });
//   }
// };




// /****************************  Teacher ***************************** */


// export const registerTeacher = async (req, res) => {
//     try {
//         const {first_name,last_name,teacher_id, email, password } = req.body;

//         // const existingUser = await User.findOne({ $or: [{name }, { email }] });
//   const existingTeacher = await Teacher.findOne({
//             where: {
//                 [Op.or]: [
//                     { first_name: first_name },
//                     { last_name: last_name },
//                     {teacher_id:teacher_id},
//                     { email: email }
//                 ]
//             }
//         });
//         if (existingTeacher) {
//             return res.status(400).json({ message: "Teacherntname or email already exists" });
//         }

//         const countexistingTeacher = await Teacher.count();
//         let role = 'user';
//         if (countexistingTeacher === 0) {     //normalement tetnaha hadi
//             // First user becomes admin
//             role = 'admin';
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // const newUser = new User({ username, email, password: hashedPassword });
//         // await newUser.save();

//         // const newUser = await mongoose.model('User').create({ username, email, password: hashedPassword, role: role });
//         // const newUser = await User.create({ name, email, password: hashedPassword, role });
//        const newTeacher = await Teacher.create({ 
//             first_name,
//             last_name, 
//             teacher_id,
//             email, 
//             password: hashedPassword, 
//             role 
//         });
//         const token = jwt.sign(
//             { teacherId: await newTeacher.id, first_name: newTeacher.first_name,last_name: newTeacher.last_name,teacher_id:newTeacher.teacher_id, email: newTeacher.email, role: newTeacher.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         )
//         res.status(201).json({ message: "Teacher registered successfully" , teacher: newTeacher , token });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }




// export const loginTeacher = async (req, res) => {
//     try{
//         const {email, password } = req.body;
//         // const user = await User.findOne({ email });
//            // ✅ CORRECTION : Utilisez la syntaxe Sequelize avec "where"
//         const teacher= await Teacher.findOne({ 
//             where: { email } 
//         });
//         if (!teacher) {
//             return res.status(400).json({ message: "Invalid email: teacher not found" });
//         }
//         const isPasswordValid = await bcrypt.compare(password, teacher.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Invalid password" });
//         }
//         const token = jwt.sign(
//             { teacher_id: teacher.teacher_id, first_name:teacher.first_name,last_name:teacher.last_name, teacher_id:teacher.teacher_id,email:teacher.email, role: teacher.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );
//         res.status(200).json({ message: "Login successful", token });
//     }catch (error) {
//               console.error("Erreur register:", error); // Pour le debug
//         res.status(500).json({ message: error.message });
//     }
// }


// export const logoutTeacher = async (req, res) => {
//     try {
//         // Récupérer le token du header Authorization
//         const authHeader = req.headers.authorization;
        
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(400).json({ message: "No token provided" });
//         }
        
//         const token = authHeader.split(' ')[1];
        
//         // Option 1: Simple - just return success (le frontend supprimera le token)
//         // C'est la méthode la plus courante avec JWT
        
//         return res.status(200).json({ 
//             message: "Logout successful",
//             success: true 
//         });
        
//         // Option 2: Si vous voulez blacklister le token (plus sécurisé)
//         // Décommentez les lignes ci-dessous si vous avez un modèle BlacklistedToken
        
//         /*
//         // Décoder le token pour connaître sa date d'expiration
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Sauvegarder le token dans une table de blacklist
//         await BlacklistedToken.create({
//             token: token,
//             expiresAt: new Date(decoded.exp * 1000) // Convertir en date
//         });
        
//         return res.status(200).json({ 
//             message: "Logout successful",
//             success: true 
//         });
//         */
        
//     } catch (error) {
//         console.error("Erreur logout:", error);
        
//         // Même en cas d'erreur, on peut considérer que le logout est réussi
//         // car le frontend va supprimer le token
//         return res.status(200).json({ 
//             message: "Logout successful",
//             success: true 
//         });
//     }
// };





// // ===============================
// // 🔹 FORGOT PASSWORD - CORRIGÉ
// // ===============================
// const forgotPasswordTeacher = async (req, res) => {
//   try {
//     const { email } = req.body;
    
//     console.log("Email reçu pour forgot password:", email);
    
//     // Vérifier que l'email est fourni
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }
    
//     // Chercher l'utilisateur dans la base de données
//     const teacher = await Teacher.findOne({ where: { email } });
    
//     console.log("Utilisateur trouvé?", teacher ? "Oui" : "Non");
    
//     // Si l'utilisateur n'existe pas, retourner une erreur claire
//     if (!teacher) {
//       return res.status(404).json({ message: "Student not found with this email" });
//     }
    
//     // Générer un token de réinitialisation
//     const resetToken = jwt.sign(
//       { teacherId: teacher.id, email: teacher.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
    
//     // Sauvegarder le token dans la base de données
//     teacher.resetPasswordToken = resetToken;
//     teacher.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 heure
//     await teacher.save();
    
//     // Ici, vous enverriez un email avec le lien de réinitialisation
//     // Par exemple: http://localhost:3000/reset-password?token=${resetToken}
    
//     console.log("Token de réinitialisation généré pour:", teacher.email);
    
//     // ===========================================
//     // 🔥 AJOUTEZ LE CODE D'ENVOI D'EMAIL ICI
//     // ===========================================
    
//     // Configurer le transporteur pour MailDev
//     const transporter = nodemailer.createTransport({
//       host: 'localhost',
//       port: 1025,
//       secure: false,
//       ignoreTLS: true
//     });
    
//     // Créer le lien de réinitialisation (ajustez l'URL selon votre frontend)
//     const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    
//     // Préparer l'email
//     const mailOptions = {
//       from: '"Mon Application" <noreply@monapp.com>',
//       to: teacher.email,
//       subject: 'Réinitialisation de votre mot de passe',
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="utf-8">
//             <title>Réinitialisation de mot de passe</title>
//         </head>
//         <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//             <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
//                 <h2 style="color: #4CAF50; text-align: center;">Réinitialisation de mot de passe</h2>
//                 <p>Bonjour <strong>${teacher.name || teacher.email}</strong>,</p>
//                 <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
//                 <p>Cliquez sur le bouton ci-dessous pour procéder :</p>
//                 <div style="text-align: center; margin: 30px 0;">
//                     <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Réinitialiser mon mot de passe</a>
//                 </div>
//                 <p>Ou copiez ce lien dans votre navigateur :</p>
//                 <p style="background-color: #f4f4f4; padding: 10px; word-break: break-all;">${resetLink}</p>
//                 <p><strong>Ce lien est valable 1 heure.</strong></p>
//                 <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
//                 <hr style="border: 1px solid #ddd; margin: 20px 0;">
//                 <p style="color: #777; font-size: 0.9em; text-align: center;">Cet email est automatique, merci de ne pas y répondre.</p>
//             </div>
//         </body>
//         </html>
//       `
//     };
    
//     // Envoyer l'email
//     try {
//       await transporter.sendMail(mailOptions);
//       console.log(`✅ Email envoyé avec succès à ${teacher.email}`);
//     } catch (emailError) {
//       console.error("❌ Erreur d'envoi d'email:", emailError);
//       // On continue même si l'email échoue, pour ne pas bloquer l'utilisateur
//     }

//     // Retourner une réponse de succès
//     return res.status(200).json({ 
//       message: "Password reset email sent successfully",
//       // En développement, vous pouvez retourner le token pour tester
//       resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
//     });
    
//   } catch (error) {
//     console.error("Erreur dans forgotPassword:", error);
//     return res.status(500).json({ 
//       message: "Server error", 
//       error: error.message 
//     });
//   }
// };




// // ===============================
// // 🔹 RESET PASSWORD - CORRIGÉ (sans authService)
// // ===============================
// const resetPasswordTeacher = async (req, res) => {
//   try {
//     const { token, password } = req.body;  // ← Correction ici : récupérer les deux champs
    
//     console.log("Token reçu pour reset password:", token);
//     console.log("Nouveau mot de passe reçu");
    
//     // Vérifier que le token et le mot de passe sont fournis
//     if (!token || !password) {
//       return res.status(400).json({ message: "Token and password are required" });
//     }
    
//     // Vérifier que le mot de passe est assez long (optionnel)
//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }
    
//     // Vérifier le token JWT
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Token décodé:", decoded);
    
//     // Chercher l'utilisateur avec ce token non expiré
//     const teacher = await Teacher.findOne({
//       where: {
//         id: decoded.teacherId,
//         resetPasswordToken: token,
//         resetPasswordExpires: { [Op.gt]: new Date() }  // Token non expiré
//       }
//     });
    
//     if (!teacher) {
//       console.log("Utilisateur non trouvé ou token expiré");
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }
    
//     console.log("Utilisateur trouvé:", teacher.email);
    
//     // Hasher le nouveau mot de passe
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Mettre à jour l'utilisateur
//     teacher.password = hashedPassword;
//     teacher.resetPasswordToken = null;
//     teacher.resetPasswordExpires = null;
//     await teacher.save();
    
//     console.log("Mot de passe réinitialisé avec succès pour:", teacher.email);
    
//     return res.status(200).json({ message: "Password reset successful" });
    
//   } catch (error) {
//     console.error("Erreur dans resetPassword:", error);
    
//     // Si l'erreur est due à un token JWT invalide
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(400).json({ message: "Invalid token" });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(400).json({ message: "Token expired" });
//     }
    
//     return res.status(500).json({ 
//       message: "Server error", 
//       error: error.message 
//     });
//   }
// };







//  export {

//   forgotPassword,
//   resetPassword,
//     forgotPasswordStudent,
// resetPasswordStudent ,
//     forgotPasswordTeacher,
// resetPasswordTeacher,
// };

/**************common js  *****/
// "use strict";

// // const authService = require("../service/AUTH.SERVICE");
// // import authService from "../service/AUTH.SERVICE.js";
// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
const User = require('../db/models/user.js');
const Student = require('../db/models/student.js');
const Teacher = require('../db/models/teacher.js');
const bcrypt = require('bcrypt');
// // import { Sequelize } from 'sequelize';
const { Sequelize, Op } = require('sequelize');  // Ajoutez Op pour les opérateurs
const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const {name, email, password } = req.body;

        // const existingUser = await User.findOne({ $or: [{name }, { email }] });
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { name: name },
                    { email: email }
                ]
            }
        });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        const countexistingUsers = await User.count();
        let role = 'user';
        if (countexistingUsers === 0) {
            // First user becomes admin
            role = 'admin';
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ 
            name, 
            email, 
            password: hashedPassword, 
            role 
        });
        const token = jwt.sign(
            { userId: await newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(201).json({ message: "User registered successfully" , user: newUser , token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ 
            where: { email } 
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid email: user not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { userId: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        // res.status(200).json({ message: "Login successful", tokenuser: {
        // id: student.id,
        // esi_id: student.esi_id,
        // email: student.email,
        // first_name: student.first_name,
        // last_name: student.last_name,
        // role: student.role} });
        res.status(200).json({ message: "Login successful", token });

    }catch (error) {
        console.error("Erreur register:", error);
        res.status(500).json({ message: error.message });
    }
}

// ===============================
// 🔹 LOGOUT
// ===============================
const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ message: "No token provided" });
        }
        
        const token = authHeader.split(' ')[1];
        
        return res.status(200).json({ 
            message: "Logout successful",
            success: true 
        });
        
    } catch (error) {
        console.error("Erreur logout:", error);
        return res.status(200).json({ 
            message: "Logout successful",
            success: true 
        });
    }
};

// ===============================
// 🔹 FORGOT PASSWORD - CORRIGÉ
// ===============================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log("Email reçu pour forgot password:", email);
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    const user = await User.findOne({ where: { email } });
    
    console.log("Utilisateur trouvé?", user ? "Oui" : "Non");
    
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }
    
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();
    
    console.log("Token de réinitialisation généré pour:", user.email);
    
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      ignoreTLS: true
    });
    
    // const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
// const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: '"Mon Application" <noreply@monapp.com>',
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Réinitialisation de mot de passe</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h2 style="color: #4CAF50; text-align: center;">Réinitialisation de mot de passe</h2>
                <p>Bonjour <strong>${user.name || user.email}</strong>,</p>
                <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
                <p>Cliquez sur le bouton ci-dessous pour procéder :</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Réinitialiser mon mot de passe</a>
                </div>
                <p>Ou copiez ce lien dans votre navigateur :</p>
                <p style="background-color: #f4f4f4; padding: 10px; word-break: break-all;">${resetLink}</p>
                <p><strong>Ce lien est valable 1 heure.</strong></p>
                <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
                <hr style="border: 1px solid #ddd; margin: 20px 0;">
                <p style="color: #777; font-size: 0.9em; text-align: center;">Cet email est automatique, merci de ne pas y répondre.</p>
            </div>
        </body>
        </html>
      `
    };
    
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email envoyé avec succès à ${user.email}`);
    } catch (emailError) {
      console.error("❌ Erreur d'envoi d'email:", emailError);
    }

    return res.status(200).json({ 
      message: "Password reset email sent successfully",
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });
    
  } catch (error) {
    console.error("Erreur dans forgotPassword:", error);
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// ===============================
// 🔹 RESET PASSWORD - CORRIGÉ
// ===============================
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    console.log("Token reçu pour reset password:", token);
    
    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé:", decoded);
    
    const user = await User.findOne({
      where: {
        id: decoded.userId,
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() }
      }
    });
    
    if (!user) {
      console.log("Utilisateur non trouvé ou token expiré");
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    
    console.log("Utilisateur trouvé:", user.email);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    
    console.log("Mot de passe réinitialisé avec succès pour:", user.email);
    
    return res.status(200).json({ message: "Password reset successful" });
    
  } catch (error) {
    console.error("Erreur dans resetPassword:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Token expired" });
    }
    
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

/******************************************************Student Registration **************************************************/

const registerStudent = async (req, res) => {
    try {
        const {first_name,last_name,esi_id, email, password } = req.body;

        const existingStudent = await Student.findOne({
            where: {
                [Op.or]: [
                    { first_name: first_name },
                    { last_name: last_name },
                    { esi_id: esi_id },
                    { email: email }
                ]
            }
        });
        if (existingStudent) {
            return res.status(400).json({ message: "Studentname or email already exists" });
        }

        const countexistingStudents = await Student.count();
        let role = 'user';
        if (countexistingStudents === 0) {
            role = 'admin';
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = await Student.create({ 
            first_name,
            last_name, 
            esi_id,
            email, 
            password: hashedPassword, 
            role 
        });
        const token = jwt.sign(
            { studentId: await newStudent.id, first_name: newStudent.first_name, last_name: newStudent.last_name, esi_id: newStudent.esi_id, email: newStudent.email, role: newStudent.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(201).json({ message: "Student registered successfully" , student: newStudent , token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginStudent = async (req, res) => {
    try{
        const {email, password } = req.body;
        const student = await Student.findOne({ 
            where: { email } 
        });
        if (!student) {
            return res.status(400).json({ message: "Invalid email: student not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { student_id: student.id, first_name: student.first_name, last_name: student.last_name, esi_id: student.esi_id, email: student.email, role: student.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: "Login successful", token });
    }catch (error) {
        console.error("Erreur register:", error);
        res.status(500).json({ message: error.message });
    }
}

const logoutStudent = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ message: "No token provided" });
        }
        
        const token = authHeader.split(' ')[1];
        
        return res.status(200).json({ 
            message: "Logout successful",
            success: true 
        });
        
    } catch (error) {
        console.error("Erreur logout:", error);
        return res.status(200).json({ 
            message: "Logout successful",
            success: true 
        });
    }
};

const forgotPasswordStudent = async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log("Email reçu pour forgot password:", email);
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    const student = await Student.findOne({ where: { email } });
    
    console.log("Utilisateur trouvé?", student ? "Oui" : "Non");
    
    if (!student) {
      return res.status(404).json({ message: "Student not found with this email" });
    }
    
    const resetToken = jwt.sign(
      { studentId: student.id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    student.resetPasswordToken = resetToken;
    student.resetPasswordExpires = new Date(Date.now() + 3600000);
    await student.save();
    
    console.log("Token de réinitialisation généré pour:", student.email);
    
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      ignoreTLS: true
    });
    
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: '"Mon Application" <noreply@monapp.com>',
      to: student.email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Réinitialisation de mot de passe</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h2 style="color: #4CAF50; text-align: center;">Réinitialisation de mot de passe</h2>
                <p>Bonjour <strong>${student.name || student.email}</strong>,</p>
                <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
                <p>Cliquez sur le bouton ci-dessous pour procéder :</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Réinitialiser mon mot de passe</a>
                </div>
                <p>Ou copiez ce lien dans votre navigateur :</p>
                <p style="background-color: #f4f4f4; padding: 10px; word-break: break-all;">${resetLink}</p>
                <p><strong>Ce lien est valable 1 heure.</strong></p>
                <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
                <hr style="border: 1px solid #ddd; margin: 20px 0;">
                <p style="color: #777; font-size: 0.9em; text-align: center;">Cet email est automatique, merci de ne pas y répondre.</p>
            </div>
        </body>
        </html>
      `
    };
    
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email envoyé avec succès à ${student.email}`);
    } catch (emailError) {
      console.error("❌ Erreur d'envoi d'email:", emailError);
    }

    return res.status(200).json({ 
      message: "Password reset email sent successfully",
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });
    
  } catch (error) {
    console.error("Erreur dans forgotPassword:", error);
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

const resetPasswordStudent = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    console.log("Token reçu pour reset password:", token);
    
    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé:", decoded);
    
    const student = await Student.findOne({
      where: {
        id: decoded.studentId,
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() }
      }
    });
    
    if (!student) {
      console.log("Utilisateur non trouvé ou token expiré");
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    
    console.log("Utilisateur trouvé:", student.email);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    student.password = hashedPassword;
    student.resetPasswordToken = null;
    student.resetPasswordExpires = null;
    await student.save();
    
    console.log("Mot de passe réinitialisé avec succès pour:", student.email);
    
    return res.status(200).json({ message: "Password reset successful" });
    
  } catch (error) {
    console.error("Erreur dans resetPassword:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Token expired" });
    }
    
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

/****************************  Teacher ***************************** */

const registerTeacher = async (req, res) => {
    try {
              console.log('📝 [BACKEND] Body reçu:', req.body);

        const {first_name,last_name,teacher_id, email, password } = req.body;
 console.log('📝 Champs:', { first_name, last_name, teacher_id, email, password });
        const existingTeacher = await Teacher.findOne({
            // where: {  {email}               // [Op.or]: [
            //     //     { first_name: first_name },
            //     //     { last_name: last_name },
            //     //     { teacher_id: teacher_id },
            //     //     { email: email }
            //     // ]
            
       where: { email }  });
        if (existingTeacher) {
            return res.status(400).json({ message: "Teacherntname or email already exists" });
        }
  const existingId = await Teacher.findOne({ where: { teacher_id } });
        if (existingId) {
            console.log('❌ Teacher ID déjà utilisé:', teacher_id);
            return res.status(400).json({ message: "Cet ID enseignant est déjà utilisé" });
        }
        const countexistingTeacher = await Teacher.count();
        let role = 'user';
        if (countexistingTeacher === 0) {
            role = 'admin';
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = await Teacher.create({ 
            first_name,
            last_name, 
            teacher_id,
            email, 
            password: hashedPassword, 
            role 
        });
        const token = jwt.sign(
            { teacherId: await newTeacher.id, first_name: newTeacher.first_name, last_name: newTeacher.last_name, teacher_id: newTeacher.teacher_id, email: newTeacher.email, role: newTeacher.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(201).json({ message: "Teacher registered successfully" , teacher: newTeacher , token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginTeacher = async (req, res) => {
    try{
        const {email, password } = req.body;
        const teacher = await Teacher.findOne({ 
            where: { email } 
        });
        if (!teacher) {
            return res.status(400).json({ message: "Invalid email: teacher not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, teacher.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { teacher_id: teacher.teacher_id, first_name: teacher.first_name, last_name: teacher.last_name, email: teacher.email, role: teacher.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: "Login successful", token });
    }catch (error) {
        console.error("Erreur register:", error);
        res.status(500).json({ message: error.message });
    }
}

const logoutTeacher = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ message: "No token provided" });
        }
        
        const token = authHeader.split(' ')[1];
        
        return res.status(200).json({ 
            message: "Logout successful",
            success: true 
        });
        
    } catch (error) {
        console.error("Erreur logout:", error);
        return res.status(200).json({ 
            message: "Logout successful",
            success: true 
        });
    }
};

const forgotPasswordTeacher = async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log("Email reçu pour forgot password:", email);
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    const teacher = await Teacher.findOne({ where: { email } });
    
    console.log("Utilisateur trouvé?", teacher ? "Oui" : "Non");
    
    if (!teacher) {
      return res.status(404).json({ message: "Student not found with this email" });
    }
    
    const resetToken = jwt.sign(
      { teacherId: teacher.id, email: teacher.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    teacher.resetPasswordToken = resetToken;
    teacher.resetPasswordExpires = new Date(Date.now() + 3600000);
    await teacher.save();
    
    console.log("Token de réinitialisation généré pour:", teacher.email);
    
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      ignoreTLS: true
    });
    
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: '"Mon Application" <noreply@monapp.com>',
      to: teacher.email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Réinitialisation de mot de passe</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h2 style="color: #4CAF50; text-align: center;">Réinitialisation de mot de passe</h2>
                <p>Bonjour <strong>${teacher.name || teacher.email}</strong>,</p>
                <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
                <p>Cliquez sur le bouton ci-dessous pour procéder :</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Réinitialiser mon mot de passe</a>
                </div>
                <p>Ou copiez ce lien dans votre navigateur :</p>
                <p style="background-color: #f4f4f4; padding: 10px; word-break: break-all;">${resetLink}</p>
                <p><strong>Ce lien est valable 1 heure.</strong></p>
                <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
                <hr style="border: 1px solid #ddd; margin: 20px 0;">
                <p style="color: #777; font-size: 0.9em; text-align: center;">Cet email est automatique, merci de ne pas y répondre.</p>
            </div>
        </body>
        </html>
      `
    };
    
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email envoyé avec succès à ${teacher.email}`);
    } catch (emailError) {
      console.error("❌ Erreur d'envoi d'email:", emailError);
    }

    return res.status(200).json({ 
      message: "Password reset email sent successfully",
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });
    
  } catch (error) {
    console.error("Erreur dans forgotPassword:", error);
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

const resetPasswordTeacher = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    console.log("Token reçu pour reset password:", token);
    
    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé:", decoded);
    
    const teacher = await Teacher.findOne({
      where: {
        id: decoded.teacherId,
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() }
      }
    });
    
    if (!teacher) {
      console.log("Utilisateur non trouvé ou token expiré");
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    
    console.log("Utilisateur trouvé:", teacher.email);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    teacher.password = hashedPassword;
    teacher.resetPasswordToken = null;
    teacher.resetPasswordExpires = null;
    await teacher.save();
    
    console.log("Mot de passe réinitialisé avec succès pour:", teacher.email);
    
    return res.status(200).json({ message: "Password reset successful" });
    
  } catch (error) {
    console.error("Erreur dans resetPassword:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Token expired" });
    }
    
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

module.exports = {
  registerUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  registerStudent,
  loginStudent,
  logoutStudent,
  forgotPasswordStudent,
  resetPasswordStudent,
  registerTeacher,
  loginTeacher,
  logoutTeacher,
  forgotPasswordTeacher,
  resetPasswordTeacher
};