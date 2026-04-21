// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// // import User from '../models/user.model.js';

// import Teacher from '../db/models/teacher.js';

// import bcrypt from 'bcrypt';

// export const getAllMyStudents = async (req, res) => {
//     try {
//         const students = await Student.find({}, '-password'); // Exclude password field
//         res.status(200).json(teachers);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getStudentById = async (req, res) => {
//     try{
//         const teacher = await Teacher.findById(req.params.teacher_id, '-password'); // Exclude password field
//         res.status(200).json(teacher);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// export const updateTeacher = async (req, res) => {
//     try {
//         const {req_first_name,req_last_name, req_email, req_password} = req.body;
//         const hashedPassword = await bcrypt.hash(req_password, 10);
//         const teacher = await Teacher.findByIdAndUpdate(req.params.teacher_id, {
//            first_name: req_first_name,
//         last_name: req_last_name,
//             email: req_email,
//             password: hashedPassword
//         }, { new: true, fields: '-password' })

//         res.status(200).json({
//             messege: "Teacher updated successfully",
//             teacher
//         });
//     }catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// // export const assignModule = async (req,res) =>{
// //     try{
// //    const {req_first_name  ,req_last_name,req_email, }

// //     }catch(error){

// //     }
// // }

// // module.exports = userController;
// const teacherController = {
//     getAllTeachers,
//     getTeacherById,
//     updateTeacher,
//     updateUserRole,
//     deleteTeacher
// };

// // ✅ Export par défaut de l'objet
// export default teacherController;


// /*****************************************************/
// // getallmystudents
// // getallmycourses
// // getStudentById...


/****common js  ******/

// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// // import User from '../models/user.model.js';
const Teacher = require('../db/models/teacher.js');
const bcrypt = require('bcrypt');

// const Teacher = require('../db/models/teacher');
// const bcrypt = require('bcrypt');

// ✅ AJOUTE CETTE FONCTION
const registerTeacher = async (req, res) => {
    try {
        console.log('✅ registerTeacher appelé');
        console.log('Body reçu:', req.body);
        
        const { first_name, last_name, email, teacher_id, password } = req.body;
        
        // Réponse temporaire sans sauvegarde en base
        res.status(201).json({
            success: true,
            message: 'Teacher registered (test)',
            data: { first_name, last_name, email, teacher_id }
        });
        
    } catch (error) {
        console.error('❌ Erreur:', error);
        res.status(500).json({ 
            message: 'Erreur serveur',
            error: error.message 
        });
    }
};


const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({}, '-password'); // Exclude password field
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTeacherById = async (req, res) => {
    try{
        const teacher = await Teacher.findById(req.params.id, '-password'); // Exclude password field
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTeacher = async (req, res) => {
    try {
        const {req_first_name, req_last_name, req_email, req_password} = req.body;
        const hashedPassword = await bcrypt.hash(req_password, 10);
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, {
            first_name: req_first_name,
            last_name: req_last_name,
            email: req_email,
            password: hashedPassword
        }, { new: true, fields: '-password' })

        res.status(200).json({
            message: "Teacher updated successfully",
            teacher
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, { role: role }, { new: true, fields: '-password' });
        res.status(200).json({
            message: "Teacher role updated successfully",
            teacher
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Teacher deleted successfully", 
            teacher
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// // export const assignModule = async (req,res) =>{
// //     try{
// //    const {req_first_name  ,req_last_name,req_email, }

// //     }catch(error){

// //     }
// // }

// // module.exports = userController;
const teacherController = {
    registerTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    updateUserRole,
    deleteTeacher
};

// ✅ Export par défaut de l'objet
module.exports = teacherController;

// /*****************************************************/
// // getallmystudents
// // getallmycourses
// // getStudentById...