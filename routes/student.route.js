
// // // const express =  require('express');
// // // const userController = require('../controller/Controller');
// // // const authController = require('../controller/User.js');
// // import express from 'express';
// // import authMiddleware from '../middleware/auth.middleware.js'; 
// // import * as authstudentController from '../controller/Controller.js';

// // import * as studentController from '../controller/User.js';
// // // const router = express.Router();
// // // const authMiddleware = require('../middleware/auth.middleware');
// // const router = express.Router();
// // router.get('/admin', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'),studentController.getAllStudents );
// // router.get('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('user','admin'), studentController.getStudentById);
// // router.put('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), studentController.updateStudent);
// // router.put('/role/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), studentController.updateStudentRole);
// // router.delete('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), studentController.deleteStudent);

// // // module.exports = router;

// // export default router;



// // const express =  require('express');
// // const userController = require('../controller/Controller');
// // const authController = require('../controller/User.js');
// import express from 'express';
// import authMiddleware from '../middleware/auth.middleware.js'; 

// import * as authController from '../controller/Controller.js';

// import * as userController from '../controller/User.js';
// import * as moduleController from '../controller/Module.js';
// import * as adminController from '../controller/Admin.js';
// import * as teacherController from '../controller/Teacher.js';
// import * as studentController from  '../controller/Student.js';
// // const router = express.Router();
// // const authMiddleware = require('../middleware/auth.middleware');
// const router = express.Router();

// router.post('/modules', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), moduleController.addModule);

// router.post('/teachers/:id/assign-modules', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), adminController.assignModule);
// router.get('/teachers/:id/getModule', adminController.getModule);

// router.post('/questions', authMiddleware.authenticateToken,  authMiddleware.authorizeRoles('user'),studentController.addQuestionSimple);
// router.post('/questions/recherche', authMiddleware.authenticateToken,  authMiddleware.authorizeRoles('user'),studentController.getQuestionByTitle);
// router.post('/questions/recherche2', authMiddleware.authenticateToken,  authMiddleware.authorizeRoles('user'),studentController.getQuestionByModule);
// router.post('/answer', authMiddleware.authenticateToken,  authMiddleware.authorizeRoles('user'),studentController.addAnswer);

// export default router;

/**********************common js************/

// routes/index.js (version CommonJS)
const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const authController = require('../controller/Controller');
const userController = require('../controller/User');
const moduleController = require('../controller/Module');
const adminController = require('../controller/Admin');
const teacherController = require('../controller/Teacher');
const studentController = require('../controller/Student');

const router = express.Router();

// Routes pour les modules
router.post('/modules', 
    authMiddleware.authenticateToken, 
    authMiddleware.authorizeRoles('admin'), 
    moduleController.addModule
);

// Routes pour les enseignants
router.post('/teachers/:id/assign-modules', 
    authMiddleware.authenticateToken, 
    authMiddleware.authorizeRoles('admin'), 
    adminController.assignModule
);

router.get('/teachers/:id/getModule', 
    adminController.getModule
);

// Routes pour les étudiants
router.post('/questions', 
    authMiddleware.authenticateToken, 
    authMiddleware.authorizeRoles('user'), 
    studentController.addQuestionSimple
);


router.post('/questions/with-code', studentController.addQuestionWithCode);



// router.post('/questions/recherche', 
//     authMiddleware.authenticateToken, 
//     authMiddleware.authorizeRoles('user'), 
//     studentController.getQuestionByTitle
// );
router.post('/questions/recherche', studentController.getQuestionByTitle);




// router.post('/questions/recherche2', 
//     authMiddleware.authenticateToken, 
//     authMiddleware.authorizeRoles('user'), 
//     studentController.getQuestionByModule
// );

router.post('/questions/recherche/module', studentController.getQuestionByModule);


// router.post('/answer', 
//     authMiddleware.authenticateToken, 
//     authMiddleware.authorizeRoles('user'), 
//     studentController.addAnswer
// );

router.post('/answer', studentController.addAnswer);



module.exports = router;