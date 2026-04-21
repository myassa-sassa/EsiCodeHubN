// // const jwt = require('jsonwebtoken');
// // const User = require('../db/models/user.js');

// import jwt from 'jsonwebtoken';
// import Admin from  '../db/models/admin.js';
// import User from '../db/models/user.js';
// import Stuent from '../db/models/student.js';
// import Teacher from '../db/models/teacher.js';


// export const authenticateToken = (req, res, next) => {
//     try {
//          const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: "Access token missing" });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: "Invalid access token" });
//         }
//         req.user = user;
//         next();
//     })
//     }
//     catch (error) {
//         next(error);
//     }
// }



// export const authorizeRoles = (...userRoles) => {
//         return (req, res, next) => {

//             try {

//                 const userRole = req.user.role;
//                 console.log("User Role:", userRole);
//                 console.log("Allowed Roles:", userRoles);
//                 if (!userRoles.includes(userRole)) {
//                     return res.status(403).json({ message: "Forbidden: You don't have permission to access this resource" });
//                 }
//                 next();
//             }
//             catch (error) {
//                 next(error);
//             }
//         }
// }

// /***************************************ADMIN ROLES****************************/

// export const authenticateTokenAdmin = (req, res, next) => {
//     try {
//          const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: "Access token missing" });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
//         if (err) {
//             return res.status(403).json({ message: "Invalid access token" });
//         }
//         req.admin= admin;
//         next();
//     })
//     }
//     catch (error) {
//         next(error);
//     }
// }



// export const authorizeRolesAdmin = (...adminRoles) => {
//         return (req, res, next) => {

//             try {

//                 const adminRole = req.admin.role;
//                 console.log("Admin Role:", adminRole);
//                 console.log("Allowed Roles:", adminRoles);
//                 if (!adminRoles.includes(adminRole)) {
//                     return res.status(403).json({ message: "Forbidden: You don't have permission to access this resource" });
//                 }
//                 next();
//             }
//             catch (error) {
//                 next(error);
//             }
//         }
// }
// /******************************************************************************/

// // const authMiddleware = {
// //     authenticateToken: exports.authenticateToken,
// //     authorizeRoles: exports.authorizeRoles

// // }
// /*-------------------------------*/
// export const authenticateToken1 = (req, res, next) => {
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



// export const authorizeRoles1 = (...teacherRoles) => {
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
// /********************************************************** */







// export const authenticateToken2 = (req, res, next) => {
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



// export const authorizeRoles2 = (...StudentRoles) => {
//         return (req, res, next) => {

//             try {

//                 const studentRole = req.student.role;
//                 console.log("Student Role:", studentRole);
//                 console.log("Allowed Roles:", studentRoles);
//                 if (!studentRoles.includes(studentRole)) {
//                     return res.status(403).json({ message: "Forbidden: You don't have permission to access this resource" });
//                 }
//                 next();
//             }
//             catch (error) {
//                 next(error);
//             }
//         }
// }
















// /********************************************************* */
// const authMiddleware = {
//     authenticateToken,
//     authorizeRoles,
//      authenticateToken1,
//     authorizeRoles1,
//      authenticateToken2,
//     authorizeRoles2,
// };
// // exports.module = authMiddleware;
// export default authMiddleware;



/******common js  ******/

// const jwt = require('jsonwebtoken');
// const User = require('../db/models/user.js');
const jwt = require('jsonwebtoken');
const Admin = require('../db/models/admin.js');
const User = require('../db/models/user.js');
const Student = require('../db/models/student.js');  // ← Correction: Stuent → Student
const Teacher = require('../db/models/teacher.js');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid access token" });
            }
            req.user = user;
            next();
        })
    }
    catch (error) {
        next(error);
    }
}

const authorizeRoles = (...userRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role;
            console.log("User Role:", userRole);
            console.log("Allowed Roles:", userRoles);
            if (!userRoles.includes(userRole)) {
                return res.status(403).json({ message: "Forbidden: You don't have permission to access this resource" });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
}

/***************************************ADMIN ROLES****************************/

const authenticateTokenAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
            if (err) {
                return res.status(403).json({ message: "Invalid access token" });
            }
            req.admin = admin;
            next();
        })
    }
    catch (error) {
        next(error);
    }
}

const authorizeRolesAdmin = (...adminRoles) => {
    return (req, res, next) => {
        try {
            const adminRole = req.admin.role;
            console.log("Admin Role:", adminRole);
            console.log("Allowed Roles:", adminRoles);
            if (!adminRoles.includes(adminRole)) {
                return res.status(403).json({ message: "Forbidden: You don't have permission to access this resource" });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
/******************************************************************************/

// const authMiddleware = {
//     authenticateToken: exports.authenticateToken,
//     authorizeRoles: exports.authorizeRoles

// }
/*-------------------------------*/
const authenticateToken1 = (req, res, next) => {
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

const authorizeRoles1 = (...teacherRoles) => {
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
/********************************************************** */

const authenticateToken2 = (req, res, next) => {
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

const authorizeRoles2 = (...studentRoles) => {  // ← Correction: StudentRoles → studentRoles
    return (req, res, next) => {
        try {
            const studentRole = req.student.role;
            console.log("Student Role:", studentRole);
            console.log("Allowed Roles:", studentRoles);
            if (!studentRoles.includes(studentRole)) {  // ← Correction: studentRoles → studentRoles
                return res.status(403).json({ message: "Forbidden: You don't have permission to access this resource" });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
}

/********************************************************* */
const authMiddleware = {
    authenticateToken,
    authorizeRoles,
    authenticateTokenAdmin,
    authorizeRolesAdmin,
    authenticateToken1,
    authorizeRoles1,
    authenticateToken2,
    authorizeRoles2,
};
// exports.module = authMiddleware;
module.exports = authMiddleware;