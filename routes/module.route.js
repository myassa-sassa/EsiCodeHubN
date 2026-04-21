
// // const express =  require('express');
// // const userController = require('../controller/Controller');
// // const authController = require('../controller/User.js');
// import express from 'express';
// import authMiddleware from '../middleware/auth.middleware.js'; 

// import * as authController from '../controller/Controller.js';

// import * as userController from '../controller/User.js';
// import * as moduleController from '../controller/Module.js';


// // const router = express.Router();
// // const authMiddleware = require('../middleware/auth.middleware');
// const router = express.Router();


// router.post('/', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), moduleController.addModule);

// export default router;
/***********common js  ********/

// routes/module.route.js (version CommonJS)
const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const moduleController = require('../controller/Module');

const router = express.Router();

router.post('/', 
    authMiddleware.authenticateToken, 
    authMiddleware.authorizeRoles('admin'), 
    moduleController.addModule
);

module.exports = router;