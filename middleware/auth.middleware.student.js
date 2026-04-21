// // const jwt = require('jsonwebtoken');
// // const User = require('../db/models/user.js');

// import jwt from 'jsonwebtoken';
// import Student from '../db/models/student.js';

// export const authenticateToken = (req, res, next) => {
//     try {
//          const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: "Access token missing" });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, student) => {
//         if (err) {
//             return res.status(403).json({ message: "Invalid access token" });
//         }
//         req.student = student;
//         next();
//     })
//     }
//     catch (error) {
//         next(error);
//     }
// }



// export const authorizeRoles = (...StudentRoles) => {
//         return (req, res, next) => {

//             try {

//                 const studentRole = req.student.role;
//                 console.log("Student Role:", studentRole);
//                 console.log("Allowed Roles:", studentRoles);
//                 if (!stuentRoles.includes(studentRole)) {
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
// const authMiddleware1 = {
//     authenticateToken,
//     authorizeRoles
// };
// // exports.module = authMiddleware;
// export default authMiddleware1;
/*****************common js  ****/


// // const jwt = require('jsonwebtoken');
// // const User = require('../db/models/user.js');
const jwt = require('jsonwebtoken');
const Student = require('../db/models/student.js');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, student) => {
            if (err) {
                return res.status(403).json({ message: "Invalid access token" });
            }
            req.student = student;
            next();
        })
    }
    catch (error) {
        next(error);
    }
}

const authorizeRoles = (...studentRoles) => {  // ← Correction: StudentRoles → studentRoles
    return (req, res, next) => {
        try {
            const studentRole = req.student.role;
            console.log("Student Role:", studentRole);
            console.log("Allowed Roles:", studentRoles);
            if (!studentRoles.includes(studentRole)) {  // ← Correction: stuentRoles → studentRoles
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
const authMiddleware1 = {
    authenticateToken,
    authorizeRoles
};
// // exports.module = authMiddleware;
module.exports = authMiddleware1;