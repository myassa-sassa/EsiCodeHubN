// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// // import User from '../models/user.model.js';

// import Module from '../db/models/module.js';


// import bcrypt from 'bcrypt';



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
// export const addModule= async (req,res)=>{
// try{
//     const { module_name, description } = req.body;
//    const module = new Module({
//      module_name,
//       description,
//     });

// await module.save();
// res.status(201).json({
//       success: true,
//       message: "module créé avec succès",
//       data: module
//     });


// }catch(error){


//   res.status(500).json({
//       success: false,
//       message: "Erreur lors de la création du cours",
//       error: error.message
//     });


// }
// }


// const moduleController = {
//     addModule,
  
// };

// // ✅ Export par défaut de l'objet
// export default moduleController;

/*****common js  *****/
// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// // import User from '../models/user.model.js';
const Module = require('../db/models/module.js');
const bcrypt = require('bcrypt');

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
const addModule = async (req, res) => {
    try {
        const { module_name, description } = req.body;
        const module = new Module({
            module_name,
            description,
        });

        await module.save();
        res.status(201).json({
            success: true,
            message: "module créé avec succès",
            data: module
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la création du cours",
            error: error.message
        });
    }
}

const moduleController = {
    addModule,
};

// ✅ Export par défaut de l'objet
module.exports = moduleController;