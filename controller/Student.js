// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// // import User from '../models/user.model.js';

// import Student from '../db/models/student.js';
// // import Question from '../db/models/question.js';

// import bcrypt from 'bcrypt';

// // Importer le modèle Question (version Sequelize)
// import Question from '../db/models/question.js';  // Assure-toi que le chemin est correct
// import Answer from '../db/models/answer.js';
// export const addQuestionSimple = async (req, res) => {
//     try {
//         const { esi_id,module_name, course_name, title, body, is_resolved } = req.body;
        
//         // Validation des champs requis
//         if (!esi_id || !module_name ||!course_name || !title || !body) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Les champs esi_id,module_name, course_name et title sont requis"
//             });
//         }

//         // Création avec Sequelize (2 façons)
        
//         // FAÇON 1: create() - recommandée
//         const question = await Question.create({
//             esi_id,
//             // course_id,
//             module_name,
//             course_name,
//             title,
//             body,
//             is_resolved: is_resolved || false  // Valeur par défaut si non fournie
//         });

//         // FAÇON 2: build() + save()
//         // const question = Question.build({
//         //     student_id,
//         //     course_id,
//         //     title,
//         //     body,
//         //     is_resolved
//         // });
//         // await question.save();

//         res.status(201).json({
//             success: true,
//             message: "Question créée avec succès",
//             data: question
//         });

//     } catch (error) {
//         console.error("Erreur dans addQuestionSimple:", error);
        
//         // Gestion des erreurs de validation Sequelize
//         if (error.name === 'SequelizeValidationError') {
//             return res.status(400).json({
//                 success: false,
//                 message: "Erreur de validation",
//                 errors: error.errors.map(e => e.message)
//             });
//         }
        
//         // Gestion des erreurs de contrainte unique
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             return res.status(409).json({
//                 success: false,
//                 message: "Cette question existe déjà"
//             });
//         }

//         res.status(500).json({
//             success: false,
//             message: "Erreur lors de la création de la question",
//             error: error.message
//         });
//     }
// };


// export const getQuestionByTitle = async (req, res) => {
//     try{
//         const {title}=req.body;
//         const question = await Question.findOne(
//            {where : {
// title:title
//            } 
//            }); // Exclude password field

//    if (!question) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Question non trouvée avec ce titre"
//             });
//         }


//          res.status(200).json({
//             success: true,
//             data: question
//         });

//     } catch (error) {
//         console.error("Erreur dans getQuestionByTitle:", error);
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };


// export const getQuestionByModule = async (req, res) => {
//     try{
//         const {module_name}=req.body;
//         const question = await Question.findAll(
//            {where : {
// module_name:module_name
//            } 
//            }); // Exclude password field

//     if (question.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: `Aucune question trouvée pour le module ${module_name}`
//             });
//         }


//          res.status(200).json({
//             success: true,
//             data: question
//         });

//     } catch (error) {
//         console.error("Erreur dans getQuestionByTitle:", error);
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };



// export const getQuestionByLanguage = async (req, res) => {
//     try{
//         const {language}=req.body;
//          if (!language) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Le langage est requis"
//             });
//         }
//         const question = await Question.findAll(
//            {where : {
// language:language
//            } 
//            }); // Exclude password field

//     if (question.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: `Aucune question trouvée par ce language ${language}`
//             });
//         }


//          res.status(200).json({
//             success: true,
//              count: question.length,
//             data: question
//         });

//     } catch (error) {
//         console.error("Erreur dans getQuestionByLanguage:", error);
//         res.status(500).json({ 
//             success: false,
//             message: error.message 
//         });
//     }
// };


// export const addAnswer = async (req, res) => {
//     try {
//         // 1️⃣ Récupérer TOUS les champs du body
//         const { title, language, module_name, esi_id, body } = req.body;

//         // 2️⃣ Vérifier les champs obligatoires
//         if (!esi_id || !body) {
//             return res.status(400).json({ 
//                 message: "L'ID de l'étudiant qui répond et le body sont requis" 
//             });
//         }

//         // 3️⃣ Définir les critères de recherche
//         let searchCriteria = {};
//         if (title) {
//             searchCriteria = { title: title };
//         } else if (language) {
//             searchCriteria = { language: language };
//         } else if (module_name) {
//             searchCriteria = { module_name: module_name };
//         } else {
//             return res.status(400).json({
//                 message: "Veuillez fournir un critère de recherche (title, language ou module_name)"
//             });
//         }

//         // 4️⃣ RECHERCHER la question (findOne, pas findByPk !)
//         const question = await Question.findOne({ 
//             where: searchCriteria 
//         });

//         if (!question) {
//             return res.status(404).json({ 
//                 message: "Question non trouvée avec ces critères" 
//             });
//         }

//         // 5️⃣ Vérifier que l'étudiant existe
//         const student = await Student.findOne(
//            { 
//     where: { esi_id: esi_id }  // Cherche par esi_id
// });
//         if (!student) {
//             return res.status(404).json({ 
//                 message: "Étudiant non trouvé" 
//             });
//         }

//         // 6️⃣ CRÉER la réponse (avec question.id, pas questionId)
//         const answer = await Answer.create({ 
//             question_id: question.id,  // ← CORRECTION
//           esi_id: esi_id, 
//             body: body 
//         });

//         // 7️⃣ MARQUER la question comme résolue
//         await question.update({ is_resolved: true });

//         // 8️⃣ RÉPONDRE
//         res.status(201).json({
//             success: true,
//             message: "Réponse ajoutée avec succès",
//             data: {
//                 answer: answer,
//                 question: {
//                     id: question.id,
//                     title: question.title,
//                     is_resolved: question.is_resolved
//                 }
//             }
//         });

//     } catch (error) {
//         console.error("❌ Erreur:", error);
//         res.status(500).json({ 
//             success: false,
//             error: error.message 
//         });
//     }
// };



// const studentController = {
//    addQuestionSimple,
//    getQuestionByTitle,
//    getQuestionByModule,
//    getQuestionByLanguage,
//    addAnswer

//     // addquestion,
//     // searchby....
// };

// // ✅ Export par défaut de l'objet
// export default studentController;

/***************************common js  ******/
// // const User = require('../models/user.model');
// // const bcrypt = require('bcrypt');
// // import User from '../models/user.model.js';
const Student = require('../db/models/student.js');
// // import Question from '../db/models/question.js';
const bcrypt = require('bcrypt');
const pool = require('../config/database');  // ou require('../config/db') selon votre fichier

// Importer le modèle Question (version Sequelize)
const Question = require('../db/models/question.js');  // Assure-toi que le chemin est correct
const Answer = require('../db/models/answer.js');
const Submission = require('../db/models/submission'); // Votre modèle submission

const addQuestionSimple = async (req, res) => {
    try {
        const { esi_id, module_name, course_name, title, body, is_resolved, language } = req.body;
        
        // Validation des champs requis
        if (!esi_id || !module_name || !course_name || !title || !body) {
            return res.status(400).json({
                success: false,
                message: "Les champs esi_id, module_name, course_name et title sont requis"
            });
        }

        // Création avec Sequelize (2 façons)
        
        // FAÇON 1: create() - recommandée
        const question = await Question.create({
            esi_id,
            // course_id,
            module_name,
            course_name,
            title,
            body,
                        language: language,  // ← AJOUTE CETTE LIGNE

            is_resolved: is_resolved || false  // Valeur par défaut si non fournie
        });

        // FAÇON 2: build() + save()
        // const question = Question.build({
        //     student_id,
        //     course_id,
        //     title,
        //     body,
        //     is_resolved
        // });
        // await question.save();

        res.status(201).json({
            success: true,
            message: "Question créée avec succès",
            data: question
        });

    } catch (error) {
        console.error("Erreur dans addQuestionSimple:", error);
        
        // Gestion des erreurs de validation Sequelize
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: "Erreur de validation",
                errors: error.errors.map(e => e.message)
            });
        }
        
        // Gestion des erreurs de contrainte unique
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                message: "Cette question existe déjà"
            });
        }

        res.status(500).json({
            success: false,
            message: "Erreur lors de la création de la question",
            error: error.message
        });
    }
};


/******** question with code  ******/

// controller/Student.js - Version complète avec sauvegarde du code
// controller/Student.js - Version avec recherche automatique du module_id
const addQuestionWithCode = async (req, res) => {
    try {
        const {
            // Données de la question
            esi_id,
            module_name,
            course_name,
            title,
            body,
            is_resolved,
            
            // Données du code
            language,
            submission_type,
            topic_tag,
            code_content,
            description
        } = req.body;
        
        // Validation des champs requis pour la question
        if (!esi_id || !module_name || !course_name || !title || !body) {
            return res.status(400).json({
                success: false,
                message: "Les champs esi_id, module_name, course_name, title et body sont requis"
            });
        }
        
        // Validation des champs requis pour le code
        if (code_content && !language) {
            return res.status(400).json({
                success: false,
                message: "Le langage est requis si vous fournissez du code"
            });
        }
        
        // 1. Créer la question
        const question = await Question.create({
            esi_id,
            module_name,
            course_name,
            title,
            body,
                language: language,  // ← AJOUTE CETTE LIGNE !

            is_resolved: is_resolved || false
        });
          // ⬇️ AJOUTE CES LIGNES DE DEBUG ICI ⬇️
        console.log('=== DÉBOGUE QUESTION ===');
        console.log('Question créée:', JSON.stringify(question, null, 2));
        console.log('question.id:', question.id);
        console.log('question.question_id:', question.question_id);
        console.log('question.dataValues:', question.dataValues);
        console.log('========================');

        // 2. Si du code est fourni, créer la soumission de code
        let submission = null;
        if (code_content) {
            // Chercher l'ID du module à partir du nom du module
            let module_id = null;
            try {
                // Vérifier si le modèle Module existe
                let Module;
                try {
                    Module = require('../db/models/module');
                } catch (err) {
                    console.log('Modèle Module non trouvé, continuation sans module_id');
                }
                
                if (Module) {
                    const module = await Module.findOne({ 
                        where: { name: module_name } 
                    });
                    if (module) {
                        module_id = module.id;
                        console.log(`Module trouvé: ${module_name} -> ID ${module_id}`);
                    } else {
                        console.log(`Module non trouvé: ${module_name}`);
                    }
                }
            } catch (err) {
                console.log('Erreur lors de la recherche du module:', err.message);
            }

             if (!module_id) {
        try {
            const moduleResult = await pool.query(
                'SELECT id FROM module WHERE module_name = $1',
                [module_name]
            );
            if (moduleResult.rows.length > 0) {
                module_id = moduleResult.rows[0].id;
                console.log(`Module trouvé avec pool.query: ${module_name} -> ID ${module_id}`);
            }
        } catch (err) {
            console.log('Erreur recherche module avec pool:', err.message);
        }
    }
                console.log('question.id utilisé pour question_id:', question.id);

            
            // Créer la soumission
            const submissionData = {
                esi_id: esi_id,
                titre: title,
                content: code_content,
                description: description || body,
                language: language,
                course_name: course_name,
                topic_tag: topic_tag || module_name,
                submission_type: submission_type || 'help_request',
                // question_id: question.id,
                question_id: question.question_id,  // ← CHANGEMENT ICI
                status: 'pending',
                submitted_at: new Date(),
                file_urls: []
            };
            
            // Ajouter module_id seulement s'il a été trouvé
            if (module_id) {
                submissionData.module_id = module_id;
            }
            
            submission = await Submission.create(submissionData);
            
            // Créer la première version du code si le modèle existe
            try {
                const CodeVersion = require('../db/models/codeVersion');
                await CodeVersion.create({
                    submission_id: submission.submission_id,
                    version_number: 1,
                    code_content: code_content,
                    language: language,
                    version_notes: `Version initiale pour la question: ${title}`,
                    created_at: new Date()
                });
            } catch (err) {
                console.log('CodeVersion non créé:', err.message);
            }
        }
        
        res.status(201).json({
            success: true,
            message: code_content ? "Question et code créés avec succès" : "Question créée avec succès",
            data: {
                question: {
                    // id: question.id,
                            id: question.question_id,  // ← CHANGE ICI AUSSI (au lieu de question.id)

                    esi_id: question.esi_id,
                    module_name: question.module_name,
                    course_name: question.course_name,
                    title: question.title,
                    body: question.body,
                    is_resolved: question.is_resolved,
                    createdAt: question.createdAt
                },
                submission: submission ? {
                    id: submission.submission_id,
                    title: submission.titre,
                    language: submission.language,
                    description: submission.description,
                    submitted_at: submission.submitted_at
                } : null
            }
        });
        
    } catch (error) {
        console.error("Erreur dans addQuestionWithCode:", error);
        
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: "Erreur de validation",
                errors: error.errors.map(e => e.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: "Erreur lors de la création de la question avec le code",
            error: error.message
        });
    }
};








const getQuestionByTitle = async (req, res) => {
    try{
        const {title}=req.body;
        const question = await Question.findOne(
           {where : {
                title:title
           } 
        });

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question non trouvée avec ce titre"
            });
        }

        res.status(200).json({
            success: true,
            data: question
        });

    } catch (error) {
        console.error("Erreur dans getQuestionByTitle:", error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const getQuestionByModule = async (req, res) => {
    try{
        const {module_name}=req.body;
        const question = await Question.findAll(
           {where : {
                module_name:module_name
           } 
        });

        if (question.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Aucune question trouvée pour le module ${module_name}`
            });
        }

        res.status(200).json({
            success: true,
            data: question
        });

    } catch (error) {
        console.error("Erreur dans getQuestionByModule:", error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const getQuestionByLanguage = async (req, res) => {
    try{
        const {language}=req.body;
        if (!language) {
            return res.status(400).json({
                success: false,
                message: "Le langage est requis"
            });
        }
        const question = await Question.findAll(
           {where : {
                language:language
           } 
        });

        if (question.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Aucune question trouvée par ce language ${language}`
            });
        }

        res.status(200).json({
            success: true,
            count: question.length,
            data: question
        });

    } catch (error) {
        console.error("Erreur dans getQuestionByLanguage:", error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const addAnswer = async (req, res) => {
    try {
        // 1️⃣ Récupérer TOUS les champs du body
        const { title, language, module_name, esi_id, body } = req.body;

        // 2️⃣ Vérifier les champs obligatoires
        if (!esi_id || !body) {
            return res.status(400).json({ 
                message: "L'ID de l'étudiant qui répond et le body sont requis" 
            });
        }

        // 3️⃣ Définir les critères de recherche
        let searchCriteria = {};
        if (title) {
            searchCriteria = { title: title };
        } else if (language) {
            searchCriteria = { language: language };
        } else if (module_name) {
            searchCriteria = { module_name: module_name };
        } else {
            return res.status(400).json({
                message: "Veuillez fournir un critère de recherche (title, language ou module_name)"
            });
        }

        // 4️⃣ RECHERCHER la question (findOne, pas findByPk !)
        const question = await Question.findOne({ 
            where: searchCriteria 
        });

        if (!question) {
            return res.status(404).json({ 
                message: "Question non trouvée avec ces critères" 
            });
        }

        // 5️⃣ Vérifier que l'étudiant existe
        const student = await Student.findOne({ 
            where: { esi_id: esi_id }  // Cherche par esi_id
        });
        
        if (!student) {
            return res.status(404).json({ 
                message: "Étudiant non trouvé" 
            });
        }

        // 6️⃣ CRÉER la réponse (avec question.id, pas questionId)
        const answer = await Answer.create({ 
            question_id: question.id,  // ← CORRECTION
            esi_id: esi_id, 
            body: body 
        });

        // 7️⃣ MARQUER la question comme résolue
        await question.update({ is_resolved: true });

        // 8️⃣ RÉPONDRE
        res.status(201).json({
            success: true,
            message: "Réponse ajoutée avec succès",
            data: {
                answer: answer,
                question: {
                    id: question.id,
                    title: question.title,
                    is_resolved: question.is_resolved
                }
            }
        });

    } catch (error) {
        console.error("❌ Erreur:", error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};





const studentController = {
    addQuestionSimple,
    addQuestionWithCode,
    getQuestionByTitle,
    getQuestionByModule,
    getQuestionByLanguage,
    addAnswer
    // addquestion,
    // searchby....
};

// ✅ Export par défaut de l'objet
module.exports = studentController;