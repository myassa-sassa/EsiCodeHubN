// // const jwt = require('jsonwebtoken');
// // const User = require('../db/models/user.js');

// import jwt from 'jsonwebtoken';
// import Teacher from '../db/models/teacher.js';

// export const authenticateToken = (req, res, next) => {
//     try {
//          const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: "Access token missing" });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, teacher) => {
//         if (err) {
//             return res.status(403).json({ message: "Invalid access token" });
//         }
//         req.teacher =teacher;
//         next();
//     })
//     }
//     catch (error) {
//         next(error);
//     }
// }



// export const authorizeRoles = (...teacherRoles) => {
//         return (req, res, next) => {

//             try {

//                 const teacherRole = req.teacher.role;
//                 console.log("Teacher Role:", teacherRole);
//                 console.log("Allowed Roles:", teacherRoles);
//                 if (!teacherRoles.includes(teacherRole)) {
//                     return res.status(403).json({ message: "Forbidden: You don't have permission to access this resource" });
//                 }
//                 next();
//             }
//             catch (error) {
//                 next(error);
//             }
//         }
// }

// // const authMiddleware = {
// //     authenticateToken: exports.authenticateToken,
// //     authorizeRoles: exports.authorizeRoles

// // }
// const authMiddleware2 = {
//     authenticateToken,
//     authorizeRoles
// };
// // exports.module = authMiddleware;
// export default authMiddleware2;


/**************************common js  ******/

// // const jwt = require('jsonwebtoken');
// // const User = require('../db/models/user.js');
const jwt = require('jsonwebtoken');
const Teacher = require('../db/models/teacher.js');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, teacher) => {
            if (err) {
                return res.status(403).json({ message: "Invalid access token" });
            }
            req.teacher = teacher;
            next();
        })
    }
    catch (error) {
        next(error);
    }
}

const authorizeRoles = (...teacherRoles) => {
    return (req, res, next) => {
        try {
            const teacherRole = req.teacher.role;
            console.log("Teacher Role:", teacherRole);
            console.log("Allowed Roles:", teacherRoles);
            if (!teacherRoles.includes(teacherRole)) {
                return res.status(403).json({ message: "Forbidden: You don't have permission to access this resource" });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
}

// // const authMiddleware = {
// //     authenticateToken: exports.authenticateToken,
// //     authorizeRoles: exports.authorizeRoles

// // }
const authMiddleware2 = {
    authenticateToken,
    authorizeRoles
};
// // exports.module = authMiddleware;
module.exports = authMiddleware2;