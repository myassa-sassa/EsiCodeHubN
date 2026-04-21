
// // const express =  require('express');
// // const userController = require('../controller/Controller');
// // const authController = require('../controller/User.js');
// import express from 'express';
// import authMiddleware from '../middleware/auth.middleware.js'; 
// // import authMiddleware1 from '../middleware/auth.middleware.student.js'; 
// // import authMiddleware2 from '../middleware/auth.middleware.teacher.js'; 


// import * as authController from '../controller/Controller.js';

// import * as userController from '../controller/User.js';
// import * as studentController from '../controller/Student.js';
// import * as teacherController from '../controller/Teacher.js';
// import * as courseController from '../controller/Module.js';



// // const router = express.Router();
// // const authMiddleware = require('../middleware/auth.middleware');
// const router = express.Router();
// router.get('/admin', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'),userController.getAllUsers );
// router.get('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('user','admin'), userController.getUserById);
// router.put('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), userController.updateUser);
// router.put('/role/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), userController.updateUserRole);
// router.delete('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), userController.deleteUser);

// /************************************Admin******************************************** */


// // router.get('/admin', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('admin'),adminController.getAllUsers );
// // router.get('/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('user','admin'),adminController.getTeacherById);
// // router.put('/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('admin'), adminController.updateTeacher);
// // router.put('/role/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('admin'), adminController.updateUserRole);
// // router.delete('/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('admin'), adminController.deleteUser);
// // router.delete('/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('user','admin'), adminController.getQuestionByLanguage);
// // router.delete('/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('user','admin'), adminController.getQuestionByCourse);
// // router.delete('/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('user','admin'), adminController.getQuestionByTitre);
// // router.delete('/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('user','admin'), adminController.addquestion);
// // router.delete('/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('user','admin'), adminController.addAnswer);






// // router.get('/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('user','admin'),adminController.getStudentById);
// // router.put('/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('admin'), adminController.updateStudent);
// // router.put('/role/:id', authMiddleware.authenticateToken8, authMiddleware.authorizeRoles('admin'), adminController.updateUserRole);



// // /*----------------Teacher-----------------*/
// // router.get('/admin', authMiddleware.authenticateToken1, authMiddleware.authorizeRoles1('admin'),teacherController.getAllTeachers );
// // router.get('/:id', authMiddleware.authenticateToken1, authMiddleware.authorizeRoles1('user','admin'), teacherController.getTeacherById);
// // router.put('/:id', authMiddleware.authenticateToken1, authMiddleware.authorizeRoles1('admin'),teacherController.updateTeacher);
// // // router.put('/role/:id',authMiddleware1.authenticateToken1, authMiddleware1.authorizeRoles1('admin'),teacherController.updateTeacherRole);
// // router.delete('/:id',authMiddleware.authenticateToken1, authMiddleware.authorizeRoles1('admin'), teacherController.deleteTeacher);
// // /*--------------------Student--------------------*/

// // router.get('/admin', authMiddleware.authenticateToken2, authMiddleware.authorizeRoles2('admin'),studentController.getAllStudents );
// // router.get('/:id', authMiddleware.authenticateToken2, authMiddleware.authorizeRoles2('user','admin'),studentController.getStudentById);
// // router.put('/:id', authMiddleware.authenticateToken2, authMiddleware.authorizeRoles2('admin'),studentController.updateStudent);
// // // router.put('/role/:id', authMiddleware2.authenticateToken2, authMiddleware2.authorizeRoles2('admin'), userController.updateStudentRole);
// // router.delete('/:id', authMiddleware.authenticateToken2, authMiddleware.authorizeRoles2('admin'),studentController.deleteStudent);

// // module.exports = router;




// export default router;