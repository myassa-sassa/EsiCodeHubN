// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// // import User from '../models/user.model.js';

// import User from '../db/models/user.js';

// import bcrypt from 'bcrypt';

// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find({}, '-password'); // Exclude password field
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getUserById = async (req, res) => {
//     try{
//         const user = await User.findById(req.params.id, '-password'); // Exclude password field
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// export const updateUser = async (req, res) => {
//     try {
//         const {req_username, req_email, req_password} = req.body;
//         const hashedPassword = await bcrypt.hash(req_password, 10);
//         const user = await User.findByIdAndUpdate(req.params.id, {
//             username: req_username,
//             email: req_email,
//             password: hashedPassword
//         }, { new: true, fields: '-password' })

//         res.status(200).json({
//             messege: "User updated successfully",
//             user
//         });
//     }catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// export const updateUserRole = async (req, res) => {
//     try {
//         const { role } = req.body;
//         const idUser = req.params.id;

//         const user = await User.findByIdAndUpdate(idUser, { role: role }, { new: true, fields: '-password' });
//         res.status(200).json({
//             message: "User role updated successfully",
//             user
//         });
//     }catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// export const deleteUser = async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         res.status(200).json({
//             message: "User deleted successfully", 
//             user
//         });
//     }catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// // const userController = {
// //     getAllUsers: exports.getAllUsers,
// //     getUserById: exports.getUserById,
// //     updateUser: exports.updateUser,
// //     updateUserRole: exports.updateUserRole,
// //     deleteUser: exports.deleteUser
// // }

// // module.exports = userController;
// const userController = {
//     getAllUsers,
//     getUserById,
//     updateUser,
//     updateUserRole,
//     deleteUser
// };

// // ✅ Export par défaut de l'objet
// export default userController;

/******common js  *****/
// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// // import User from '../models/user.model.js';
const User = require('../db/models/user.js');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id, '-password'); // Exclude password field
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const {req_username, req_email, req_password} = req.body;
        const hashedPassword = await bcrypt.hash(req_password, 10);
        const user = await User.findByIdAndUpdate(req.params.id, {
            username: req_username,
            email: req_email,
            password: hashedPassword
        }, { new: true, fields: '-password' })

        res.status(200).json({
            messege: "User updated successfully",
            user
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const idUser = req.params.id;

        const user = await User.findByIdAndUpdate(idUser, { role: role }, { new: true, fields: '-password' });
        res.status(200).json({
            message: "User role updated successfully",
            user
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "User deleted successfully", 
            user
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// // const userController = {
// //     getAllUsers: exports.getAllUsers,
// //     getUserById: exports.getUserById,
// //     updateUser: exports.updateUser,
// //     updateUserRole: exports.updateUserRole,
// //     deleteUser: exports.deleteUser
// // }

// // module.exports = userController;
const userController = {
    getAllUsers,
    getUserById,
    updateUser,
    updateUserRole,
    deleteUser
};

// ✅ Export par défaut de l'objet
module.exports = userController;