// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// // import User from '../models/user.model.js';

// import Admin from '../db/models/admin.js';
// import Student from '../db/models/student.js';
// import Teacher from '../db/models/teacher.js';
// import Module from '../db/models/module.js';
// import Course from '../db/models/course.js';

// import bcrypt from 'bcrypt';




// export const getAllStudents = async (req, res) => {
//     try {
//         const students = await Student.findAll({  attributes: { exclude: ['password'] } }); // Exclude password field
//         res.status(200).json({ 
//             success: true,
//             count: students.length,
//             data: students});
//     } catch (error) {
//  console.error("Erreur dans getAllStudents:", error);
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });    }
// };

// export const getStudentById = async (req, res) => {
//     try {
//         const student = await Student.findOne({
//             where: { esi_id: req.params.id },  // Recherche par esi_id
//             attributes: { exclude: ['password'] }
//         });

//         if (!student) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Étudiant non trouvé avec cet esi_id"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: student
//         });
//     } catch (error) {
//  console.error("Erreur dans getStudentByid:", error);
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });    }
// };





// export const getAllTeachers = async (req, res) => {
//     try {
//         const teachers = await Teacher.findAll({  attributes: { exclude: ['password'] } }); // Exclude password field
//         res.status(200).json({ 
//             success: true,
//             count: teachers.length,
//             data:teachers});
//     } catch (error) {
//  console.error("Erreur dans getAllTeachers:", error);
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });    }
// };



// export const getTeacherById = async (req, res) => {
//     try {
//         const teacher = await Teacher.findOne({
//             where: { teacher_id: req.params.id },  // Recherche par esi_id
//             attributes: { exclude: ['password'] }
//         });

//         if (!teacher) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Teacher non trouvé avec cet teacher_id"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: teacher
//         });
//     } catch (error) {
//  console.error("Erreur dans getTeachertByid:", error);
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });    }
// };


// // /*************************************************** */
// // export const getAllTeachers = async (req, res) => {
// //     try {
// //         const teachers = await Teacher.find({}, '-password'); // Exclude password field
// //         res.status(200).json(teachers);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // export const getTeacherById = async (req, res) => {
// //     try{
// //         const teacher = await Teacher.findById(req.params.id, '-password'); // Exclude password field
// //         res.status(200).json(teacher);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }
// // export const updateTeacher = async (req, res) => {
// //     try {
// //         const {req_first_name,req_last_name, req_email, req_password} = req.body;
// //         const hashedPassword = await bcrypt.hash(req_password, 10);
// //         const teacher = await Teacher.findByIdAndUpdate(req.params.teacher_id, {
// //            first_name: req_first_name,
// //         last_name: req_last_name,
// //             email: req_email,
// //             password: hashedPassword
// //         }, { new: true, fields: '-password' })

// //         res.status(200).json({
// //             messege: "Teacher updated successfully",
// //             teacher
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }
// // //// on enleve
// // export const updateUserRole = async (req, res) => {
// //     try {
// //         const { role } = req.body;
// //         const idUser = req.params.id;

// //         const user = await User.findByIdAndUpdate(idUser, { role: role }, { new: true, fields: '-password' });
// //         res.status(200).json({
// //             message: "User role updated successfully",
// //             user
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }

// // export const deleteTeacher = async (req, res) => {
// //     try {
// //         const teacher = await Teacher.findByIdAndDelete(req.params.teacher_id);
// //         res.status(200).json({
// //             message: "Teacher deleted successfully", 
// //             teacher
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }

// // const userController = {
// //     getAllUsers: exports.getAllUsers,
// //     getUserById: exports.getUserById,
// //     updateUser: exports.updateUser,
// //     updateUserRole: exports.updateUserRole,
// //     deleteUser: exports.deleteUser
// // }

// // module.exports = userController;
// /************************************students**********************************/
// // export const getAllStudents1= async (req, res) => {
// //     try {
// //         const students = await Student.find({}, '-password'); // Exclude password field
// //         res.status(200).json(students);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // export const getStudentById = async (req, res) => {
// //     try{
// //         const student = await Student.findById(req.params.id, '-password'); // Exclude password field
// //         res.status(200).json(student);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }
// // export const updateStudent = async (req, res) => {
// //     try {
// //         const {req_first_name,req_last_name,req_academic_year, req_email, req_password} = req.body;
// //         const hashedPassword = await bcrypt.hash(req_password, 10);
// //         const student= await Student.findByIdAndUpdate(req.params.student_id, {
// //            first_name: req_first_name,
// //         last_name: req_last_name,
// //         academic_year:academic_year,
// //             email: req_email,
// //             password: hashedPassword
// //         }, { new: true, fields: '-password' })

// //         res.status(200).json({
// //             messege: "Student updated successfully",
// //             student
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }
// // //// on enleve
// // export const updateUserRole = async (req, res) => {
// //     try {
// //         const { role } = req.body;
// //         const idUser = req.params.id;

// //         const user = await User.findByIdAndUpdate(idUser, { role: role }, { new: true, fields: '-password' });
// //         res.status(200).json({
// //             message: "User role updated successfully",
// //             user
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }

// // export const deleteStudent= async (req, res) => {
// //     try {
// //         const student = await Student.findByIdAndDelete(req.params.student_id);
// //         res.status(200).json({
// //             message: "Teacher deleted successfully", 
// //             student
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }
// /**************************************************************************************/
// export const assignModule = async (req, res) => {
//     try {
//         const teacherId = req.params.id;
        
//         // 1. Vérifier que l'enseignant existe
//         const teacher = await Teacher.findOne({
//             where: { teacher_id: teacherId }
//         });

//         if (!teacher){
//             return res.status(404).json({
//                 success: false,
//                 message: "Teacher not found"
//             });
//         }

//         // 2. Valider le body
//         const { modules } = req.body;
//         if (!Array.isArray(modules)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Le champ 'modules' doit être un tableau"
//             });
//         }

//         // 3. Récupérer les modules qui existent en BDD
//         const existingModules = await Module.findAll({
//             where: {
//                 module_name: modules  // WHERE module_name IN (...)
//             }
//         });

//         // 4. Assigner les modules à l'enseignant
//         teacher.modules = existingModules;
//         await teacher.save();

//         // 5. Réponse unique (après tout le traitement)
//         res.status(200).json({
//             success: true,
//             message: `${existingModules.length} module(s) assigné(s) avec succès`,
//             data: {
//                 teacher: teacher,
//                 assignedModules: existingModules
//             }
//         });

//     } catch (error) {
//         console.error("Erreur dans assignModule:", error);
//         res.status(500).json({
//             success: false,
//             message: "Erreur serveur",
//             error: error.message
//         });
//     }
// };

// export const getModule = async (req, res) => {
//     try {
//         const teacherId = req.params.id;
//         console.log("Recherche enseignant avec teacher_id:", teacherId);
        
//         // 1. Trouver l'enseignant
//         const teacher = await Teacher.findOne({
//             where: { teacher_id: teacherId }
//         });

//         if (!teacher) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Teacher not found"
//             });
//         }

//         console.log("Enseignant trouvé:", teacher.first_name);
//         console.log("Modules bruts:", teacher.modules);

//         // 2. Récupérer les modules depuis le champ JSON
//         let modules = [];
        
//         // Si teacher.modules est un tableau d'IDs
//         if (teacher.modules && Array.isArray(teacher.modules)) {
//             // Si c'est un tableau d'objets avec des id
//             if (teacher.modules.length > 0 && teacher.modules[0].id) {
//                 modules = teacher.modules;
//             } 
//             // Si c'est un tableau d'IDs
//             else {
//                 const moduleIds = teacher.modules;
//                 modules = await Module.findAll({
//                     where: {
//                         id: moduleIds
//                     }
//                 });
//             }
//         }
//         // Si teacher.modules est un objet unique
//         else if (teacher.modules && teacher.modules.id) {
//             const module = await Module.findOne({
//                 where: { id: teacher.modules.id }
//             });
//             if (module) modules = [module];
//         }

//         return res.status(200).json({
//             success: true,
//             data: modules,
//             teacher: {
//                 id: teacher.id,
//                 teacher_id: teacher.teacher_id,
//                 name: `${teacher.first_name} ${teacher.last_name}`,
//                 email: teacher.email
//             },
//             count: modules.length,
//             message: "Modules retrieved successfully"
//         });

//     } catch (error) {
//         console.error("Error in getModule:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// };


// // export const assignCoursesToModule = async (req, res) => {
// //     try {
// //         const moduleId = req.params.id;
// //         console.log("🔍 Recherche du module avec ID:", moduleId);
        
// //         // 1. Vérifier que le module existe - CORRECTION ICI !
// //         const module = await Module.findByPk(moduleId);  // ← Utilise findByPk au lieu de findOne avec module_id

// //         if (!module) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "Module non trouvé"
// //             });
// //         }

// //         console.log("✅ Module trouvé:", module.module_name);

// //         // 2. Valider le body
// //         const { courseNames } = req.body;
// //         if (!Array.isArray(courseNames)) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "Le champ 'courseNames' doit être un tableau"
// //             });
// //         }

// //         console.log("📚 Recherche des cours:", courseNames);

// //         // 3. Récupérer les cours par leurs noms
// //         const existingCourses = await Course.findAll({
// //             where: {
// //                 course_name: courseNames
// //             }
// //         });

// //         console.log(`✅ ${existingCourses.length} cours trouvés`);

// //         if (existingCourses.length === 0) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "Aucun cours trouvé avec les noms fournis"
// //             });
// //         }

// //         // 4. Vérifier les cours non trouvés
// //         const foundNames = existingCourses.map(c => c.course_name);
// //         const notFoundNames = courseNames.filter(name => !foundNames.includes(name));
        
// //         if (notFoundNames.length > 0) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "Certains cours n'ont pas été trouvés",
// //                 notFound: notFoundNames
// //             });
// //         }

// //         // 5. Assigner les cours au module
// //         // Vérifier d'abord quelle relation existe
        
// //         // Option 1: Si le module a une clé étrangère course_id
// //         // await module.update({ course_ids: existingCourses.map(c => c.id) });
        
// //         // Option 2: Si les cours ont une clé étrangère module_id
// //         await Promise.all(existingCourses.map(course => 
// //             course.update({ module_id: module.id })
// //         ));

// //         // Option 3: Si table de liaison (many-to-many)
// //         // await module.setCourses(existingCourses);

// //         // 6. Récupérer le module avec ses cours pour confirmation
// //         const moduleWithCourses = await Module.findByPk(module.id, {
// //             include: [{
// //                 model: Course,
// //                 through: { attributes: [] }  // Pour many-to-many
// //             }]
// //         });

// //         res.status(200).json({
// //             success: true,
// //             message: `${existingCourses.length} cours assigné(s) avec succès au module ${module.module_name}`,
// //             data: {
// //                 module: {
// //                     id: module.id,
// //                     module_name: module.module_name,
// //                     description: module.description
// //                 },
// //                 assignedCourses: existingCourses,
// //                 notFound: notFoundNames.length > 0 ? notFoundNames : undefined,
// //                 count: existingCourses.length
// //             }
// //         });

// //     } catch (error) {
// //         console.error("❌ Erreur dans assignCoursesToModule:", error);
// //         res.status(500).json({
// //             success: false,
// //             message: "Erreur serveur",
// //             error: error.message
// //         });
// //     }
// // };

// export const addCourses = async (req, res) => {
//     try {
//         const { courses } = req.body; // Tableau de cours

//         // Validation
//         if (!Array.isArray(courses) || courses.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Le champ 'courses' doit être un tableau non vide"
//             });
//         }

//         console.log("📚 Cours à ajouter:", courses);

//         // Préparer les valeurs pour l'insertion multiple
//         const insertedCourses = [];

//         // Méthode 1: Avec Sequelize create (recommandée)
//         for (const course of courses) {
//             const { course_name, module_name, module_id, description } = course;
            
//             // Validation des champs requis
//             if (!course_name || !module_name || !module_id) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Chaque cours doit avoir course_name, module_name et module_id"
//                 });
//             }

//             const newCourse = await Course.create({
//                 course_name,
//                 module_name,
//                 module_id,
//                 description: description || `Cours de ${course_name}`,
//                 addday: new Date() // Date d'ajout
//             });

//             insertedCourses.push(newCourse);
//         }

//         // Méthode 2: Avec bulkCreate (plus efficace)
//         // const coursesData = courses.map(c => ({
//         //     course_name: c.course_name,
//         //     module_name: c.module_name,
//         //     module_id: c.module_id,
//         //     description: c.description || `Cours de ${c.course_name}`,
//         //     addday: new Date()
//         // }));
//         // const insertedCourses = await Course.bulkCreate(coursesData);

//         res.status(201).json({
//             success: true,
//             message: `${insertedCourses.length} cours ajoutés avec succès`,
//             data: insertedCourses
//         });

//     } catch (error) {
//         console.error("❌ Erreur dans addCourses:", error);
//         res.status(500).json({
//             success: false,
//             message: "Erreur serveur",
//             error: error.message
//         });
//     }
// };

// const adminController = {
//     getAllStudents,
//     getStudentById,
// getAllTeachers,    // getStudentById,
// getTeacherById,    // updateStudent,
//     // updateTeacher,
//     // deleteTeacher,
//     // deleteStudent,
//     assignModule,
//     getModule,
//     // 
//     addCourses
// };

// // ✅ Export par défaut de l'objet
// export default adminController;

/***common js  ****/
// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// // import User from '../models/user.model.js';
const Admin = require('../db/models/admin.js');
const Student = require('../db/models/student.js');
const Teacher = require('../db/models/teacher.js');
const Module = require('../db/models/module.js');
const Course = require('../db/models/course.js');
const bcrypt = require('bcrypt');

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json({ 
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        console.error("Erreur dans getAllStudents:", error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: { esi_id: req.params.id },
            attributes: { exclude: ['password'] }
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Étudiant non trouvé avec cet esi_id"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        console.error("Erreur dans getStudentByid:", error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json({ 
            success: true,
            count: teachers.length,
            data: teachers
        });
    } catch (error) {
        console.error("Erreur dans getAllTeachers:", error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({
            where: { teacher_id: req.params.id },
            attributes: { exclude: ['password'] }
        });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher non trouvé avec cet teacher_id"
            });
        }

        res.status(200).json({
            success: true,
            data: teacher
        });
    } catch (error) {
        console.error("Erreur dans getTeachertByid:", error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// // /*************************************************** */
// // export const getAllTeachers = async (req, res) => {
// //     try {
// //         const teachers = await Teacher.find({}, '-password'); // Exclude password field
// //         res.status(200).json(teachers);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // export const getTeacherById = async (req, res) => {
// //     try{
// //         const teacher = await Teacher.findById(req.params.id, '-password'); // Exclude password field
// //         res.status(200).json(teacher);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }
// // export const updateTeacher = async (req, res) => {
// //     try {
// //         const {req_first_name,req_last_name, req_email, req_password} = req.body;
// //         const hashedPassword = await bcrypt.hash(req_password, 10);
// //         const teacher = await Teacher.findByIdAndUpdate(req.params.teacher_id, {
// //            first_name: req_first_name,
// //         last_name: req_last_name,
// //             email: req_email,
// //             password: hashedPassword
// //         }, { new: true, fields: '-password' })

// //         res.status(200).json({
// //             messege: "Teacher updated successfully",
// //             teacher
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }
// // //// on enleve
// // export const updateUserRole = async (req, res) => {
// //     try {
// //         const { role } = req.body;
// //         const idUser = req.params.id;

// //         const user = await User.findByIdAndUpdate(idUser, { role: role }, { new: true, fields: '-password' });
// //         res.status(200).json({
// //             message: "User role updated successfully",
// //             user
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }

// // export const deleteTeacher = async (req, res) => {
// //     try {
// //         const teacher = await Teacher.findByIdAndDelete(req.params.teacher_id);
// //         res.status(200).json({
// //             message: "Teacher deleted successfully", 
// //             teacher
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }

// // const userController = {
// //     getAllUsers: exports.getAllUsers,
// //     getUserById: exports.getUserById,
// //     updateUser: exports.updateUser,
// //     updateUserRole: exports.updateUserRole,
// //     deleteUser: exports.deleteUser
// // }

// // module.exports = userController;
// /************************************students**********************************/
// // export const getAllStudents1= async (req, res) => {
// //     try {
// //         const students = await Student.find({}, '-password'); // Exclude password field
// //         res.status(200).json(students);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // export const getStudentById = async (req, res) => {
// //     try{
// //         const student = await Student.findById(req.params.id, '-password'); // Exclude password field
// //         res.status(200).json(student);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }
// // export const updateStudent = async (req, res) => {
// //     try {
// //         const {req_first_name,req_last_name,req_academic_year, req_email, req_password} = req.body;
// //         const hashedPassword = await bcrypt.hash(req_password, 10);
// //         const student= await Student.findByIdAndUpdate(req.params.student_id, {
// //            first_name: req_first_name,
// //         last_name: req_last_name,
// //         academic_year:academic_year,
// //             email: req_email,
// //             password: hashedPassword
// //         }, { new: true, fields: '-password' })

// //         res.status(200).json({
// //             messege: "Student updated successfully",
// //             student
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }
// // //// on enleve
// // export const updateUserRole = async (req, res) => {
// //     try {
// //         const { role } = req.body;
// //         const idUser = req.params.id;

// //         const user = await User.findByIdAndUpdate(idUser, { role: role }, { new: true, fields: '-password' });
// //         res.status(200).json({
// //             message: "User role updated successfully",
// //             user
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }

// // export const deleteStudent= async (req, res) => {
// //     try {
// //         const student = await Student.findByIdAndDelete(req.params.student_id);
// //         res.status(200).json({
// //             message: "Teacher deleted successfully", 
// //             student
// //         });
// //     }catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // }
/**************************************************************************************/
const assignModule = async (req, res) => {
    try {
        const teacherId = req.params.id;
        
        const teacher = await Teacher.findOne({
            where: { teacher_id: teacherId }
        });

        if (!teacher){
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });
        }

        const { modules } = req.body;
        if (!Array.isArray(modules)) {
            return res.status(400).json({
                success: false,
                message: "Le champ 'modules' doit être un tableau"
            });
        }

        const existingModules = await Module.findAll({
            where: {
                module_name: modules
            }
        });

        teacher.modules = existingModules;
        await teacher.save();

        res.status(200).json({
            success: true,
            message: `${existingModules.length} module(s) assigné(s) avec succès`,
            data: {
                teacher: teacher,
                assignedModules: existingModules
            }
        });

    } catch (error) {
        console.error("Erreur dans assignModule:", error);
        res.status(500).json({
            success: false,
            message: "Erreur serveur",
            error: error.message
        });
    }
};

const getModule = async (req, res) => {
    try {
        const teacherId = req.params.id;
        console.log("Recherche enseignant avec teacher_id:", teacherId);
        
        const teacher = await Teacher.findOne({
            where: { teacher_id: teacherId }
        });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });
        }

        console.log("Enseignant trouvé:", teacher.first_name);
        console.log("Modules bruts:", teacher.modules);

        let modules = [];
        
        if (teacher.modules && Array.isArray(teacher.modules)) {
            if (teacher.modules.length > 0 && teacher.modules[0].id) {
                modules = teacher.modules;
            } else {
                const moduleIds = teacher.modules;
                modules = await Module.findAll({
                    where: {
                        id: moduleIds
                    }
                });
            }
        } else if (teacher.modules && teacher.modules.id) {
            const module = await Module.findOne({
                where: { id: teacher.modules.id }
            });
            if (module) modules = [module];
        }

        return res.status(200).json({
            success: true,
            data: modules,
            teacher: {
                id: teacher.id,
                teacher_id: teacher.teacher_id,
                name: `${teacher.first_name} ${teacher.last_name}`,
                email: teacher.email
            },
            count: modules.length,
            message: "Modules retrieved successfully"
        });

    } catch (error) {
        console.error("Error in getModule:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// // export const assignCoursesToModule = async (req, res) => {
// //     try {
// //         const moduleId = req.params.id;
// //         console.log("🔍 Recherche du module avec ID:", moduleId);
        
// //         const module = await Module.findByPk(moduleId);

// //         if (!module) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "Module non trouvé"
// //             });
// //         }

// //         console.log("✅ Module trouvé:", module.module_name);

// //         const { courseNames } = req.body;
// //         if (!Array.isArray(courseNames)) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "Le champ 'courseNames' doit être un tableau"
// //             });
// //         }

// //         console.log("📚 Recherche des cours:", courseNames);

// //         const existingCourses = await Course.findAll({
// //             where: {
// //                 course_name: courseNames
// //             }
// //         });

// //         console.log(`✅ ${existingCourses.length} cours trouvés`);

// //         if (existingCourses.length === 0) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "Aucun cours trouvé avec les noms fournis"
// //             });
// //         }

// //         const foundNames = existingCourses.map(c => c.course_name);
// //         const notFoundNames = courseNames.filter(name => !foundNames.includes(name));
        
// //         if (notFoundNames.length > 0) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "Certains cours n'ont pas été trouvés",
// //                 notFound: notFoundNames
// //             });
// //         }

// //         await Promise.all(existingCourses.map(course => 
// //             course.update({ module_id: module.id })
// //         ));

// //         const moduleWithCourses = await Module.findByPk(module.id, {
// //             include: [{
// //                 model: Course,
// //                 through: { attributes: [] }
// //             }]
// //         });

// //         res.status(200).json({
// //             success: true,
// //             message: `${existingCourses.length} cours assigné(s) avec succès au module ${module.module_name}`,
// //             data: {
// //                 module: {
// //                     id: module.id,
// //                     module_name: module.module_name,
// //                     description: module.description
// //                 },
// //                 assignedCourses: existingCourses,
// //                 notFound: notFoundNames.length > 0 ? notFoundNames : undefined,
// //                 count: existingCourses.length
// //             }
// //         });

// //     } catch (error) {
// //         console.error("❌ Erreur dans assignCoursesToModule:", error);
// //         res.status(500).json({
// //             success: false,
// //             message: "Erreur serveur",
// //             error: error.message
// //         });
// //     }
// // };

const addCourses = async (req, res) => {
    try {
        const { courses } = req.body;

        if (!Array.isArray(courses) || courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Le champ 'courses' doit être un tableau non vide"
            });
        }

        console.log("📚 Cours à ajouter:", courses);

        const insertedCourses = [];

        for (const course of courses) {
            const { course_name, module_name, module_id, description } = course;
            
            if (!course_name || !module_name || !module_id) {
                return res.status(400).json({
                    success: false,
                    message: "Chaque cours doit avoir course_name, module_name et module_id"
                });
            }

            const newCourse = await Course.create({
                course_name,
                module_name,
                module_id,
                description: description || `Cours de ${course_name}`,
                addday: new Date()
            });

            insertedCourses.push(newCourse);
        }

        res.status(201).json({
            success: true,
            message: `${insertedCourses.length} cours ajoutés avec succès`,
            data: insertedCourses
        });

    } catch (error) {
        console.error("❌ Erreur dans addCourses:", error);
        res.status(500).json({
            success: false,
            message: "Erreur serveur",
            error: error.message
        });
    }
};
// Ajouter cette fonction dans controller/Admin.js
const addModule = async (req, res) => {
    try {
        const { module_name, description, teacher_id } = req.body;

        // Validation
        if (!module_name) {
            return res.status(400).json({
                success: false,
                message: "Le nom du module est requis"
            });
        }

        // Vérifier si le module existe déjà
        const existingModule = await Module.findOne({
            where: { module_name: module_name }
        });

        if (existingModule) {
            return res.status(400).json({
                success: false,
                message: "Ce module existe déjà"
            });
        }

        // Créer le nouveau module
        const newModule = await Module.create({
            module_name: module_name,
            description: description || null,
            teacher_id: teacher_id || null,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({
            success: true,
            message: "Module ajouté avec succès",
            data: newModule
        });

    } catch (error) {
        console.error("Erreur dans addModule:", error);
        res.status(500).json({
            success: false,
            message: "Erreur serveur",
            error: error.message
        });
    }
};
const deleteModule = async (req, res) => {
    try {
        const moduleId = req.params.id;

        // Vérifier si le module existe
        const module = await Module.findByPk(moduleId);
        
        if (!module) {
            return res.status(404).json({
                success: false,
                message: "Module non trouvé"
            });
        }

        // Supprimer le module
        await module.destroy();

        res.status(200).json({
            success: true,
            message: "Module supprimé avec succès"
        });

    } catch (error) {
        console.error("Erreur dans deleteModule:", error);
        res.status(500).json({
            success: false,
            message: "Erreur serveur",
            error: error.message
        });
    }
};
const addUser = async () => {
    if (!newUser.first_name || !newUser.last_name || !newUser.email) {
        alert('Please fill all fields');
        return;
    }

    const idValue = newUser.role === 'student' ? newUser.esi_id : newUser.teacher_id;
    if (!idValue) {
        alert('Please enter the ID');
        return;
    }

    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        
        const requestBody = {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            role: newUser.role,
            password: 'default123'
        };

        if (newUser.role === 'student') {
            requestBody.esi_id = parseInt(newUser.esi_id);
        } else {
            requestBody.teacher_id = parseInt(newUser.teacher_id);
        }

        const response = await fetch(`${API_URL}/api/admin/users/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ User added successfully!');
            setShowUserModal(false);
            setNewUser({ first_name: '', last_name: '', email: '', role: 'student', esi_id: '', teacher_id: '' });
            fetchDashboardData();
        } else {
            alert('❌ Error: ' + (data.message || 'Registration failed'));
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('❌ Connection error');
    }
};
const adminController = {
    getAllStudents,
    getStudentById,
    getAllTeachers,
    getTeacherById,
    assignModule,
    getModule,
    addCourses,
        addModule , // ← AJOUTE CETTE LIGNE
    deleteModule,  // ← AJOUTE CETTE LIGNE
    addUser  // ← AJOUTE CETTE LIGNE

};

module.exports = adminController;