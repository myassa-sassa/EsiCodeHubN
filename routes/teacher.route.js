
// // const express =  require('express');
// // const userController = require('../controller/Controller');
// // const authController = require('../controller/User.js');
// import express from 'express';
// import authMiddleware from '../middleware/auth.middleware.js'; 
// import * as authteacherController from '../controller/Controller.js';

// import * as teacherController from '../controller/User.js';
// // const router = express.Router();
// // const authMiddleware = require('../middleware/auth.middleware');
// const router = express.Router();
// router.get('/admin', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'),teacherController.getAllTeachers );
// router.get('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('user','admin'), teacherController.getTeacherById);
// router.put('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), teacherController.updateTeacher);
// router.put('/role/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), teacherController.updateTeacherRole);
// router.delete('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), teacherController.deleteTeacher);

// // module.exports = router;

// export default router;

/***************common js ****************/
// routes/teacher.route.js (version CommonJS)
const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const teacherController = require('../controller/User');
const authteacherController = require('../controller/Controller');

const router = express.Router();

router.get('/admin', 
    authMiddleware.authenticateToken, 
    authMiddleware.authorizeRoles('admin'), 
    teacherController.getAllTeachers
);

router.get('/:id', 
    authMiddleware.authenticateToken, 
    authMiddleware.authorizeRoles('user', 'admin'), 
    teacherController.getTeacherById
);

router.put('/:id', 
    authMiddleware.authenticateToken, 
    authMiddleware.authorizeRoles('admin'), 
    teacherController.updateTeacher
);

router.put('/role/:id', 
    authMiddleware.authenticateToken, 
    authMiddleware.authorizeRoles('admin'), 
    teacherController.updateTeacherRole
);

router.delete('/:id', 
    authMiddleware.authenticateToken, 
    authMiddleware.authorizeRoles('admin'), 
    teacherController.deleteTeacher
);

module.exports = router;