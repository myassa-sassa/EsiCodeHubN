const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const middleware = require('./middleware/middleware');
const studentRoutes = require('./routes/student.route');
const authRoutes = require('./routes/auth.route');
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin.route');

const uploadController = require('./controller/uploadController');
const multer = require('multer');
const magicLinks = new Map();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('./db/models/teacher');

require('./db/models/student');
require('./db/models/submission');
require('./db/models/codeVersion');
require('./db/models/module');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' });

// ========== ROUTE MAGIC LINK DIRECTE ==========
app.post('/api/auth/send-magic-link', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('📨 Recherche étudiant avec email:', email);
    
    const { Student } = sequelize.models;
    const student = await Student.findOne({ where: { email: email } });
    
    if (!student) {
      return res.status(404).json({ message: 'Aucun compte associé à cet email' });
    }
    
    const token = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    
    magicLinks.set(token, {
      email: email,
      userId: student.esi_id,
      expiresAt: Date.now() + 15 * 60 * 1000
    });
    
    const magicLink = `http://localhost:5173/verify-magic-link?token=${token}&email=${encodeURIComponent(email)}`;
    
    const msg = {
      to: email,
      from: 'on_houali@esi.dz',
      subject: '🔗 Connexion ESIcodeHub',
      text: `Cliquez : ${magicLink}`,
      html: `<h2>Connexion</h2><a href="${magicLink}">Se connecter</a>`
    };
    
    await sgMail.send(msg);
    console.log('✅ Magic link envoyé à', email);
    res.json({ message: 'Magic link envoyé !', email });
    
  } catch (error) {
    console.error('❌ Erreur:', error.response?.body || error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi' });
  }
});

app.post('/api/auth/verify-magic-link', async (req, res) => {
  try {
    const { token, email } = req.body;
    console.log('🔐 Vérification pour:', email);
    
    const linkData = magicLinks.get(token);
    if (!linkData) return res.status(401).json({ message: 'Lien invalide' });
    if (Date.now() > linkData.expiresAt) return res.status(401).json({ message: 'Lien expiré' });
    if (linkData.email !== decodeURIComponent(email)) return res.status(401).json({ message: 'Lien invalide' });
    
    const { Student } = sequelize.models;
    const student = await Student.findOne({ where: { esi_id: linkData.userId } });
    if (!student) return res.status(401).json({ message: 'Utilisateur non trouvé' });
    
    magicLinks.delete(token);
    const sessionToken = Buffer.from(JSON.stringify({ 
      esi_id: student.esi_id, email: student.email, timestamp: Date.now() 
    })).toString('base64');
    
    res.json({
      success: true,
      token: sessionToken,
      user: { esi_id: student.esi_id, email: student.email, name: student.first_name || student.email, role: 'student' }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Erreur' });
  }
});
// ========== FIN ROUTES MAGIC LINK ==========


// ========== MAGIC LINK POUR TEACHERS ==========

// Envoyer magic link à un teacher
app.post('/api/auth/teacher/send-magic-link', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('📨 [TEACHER] Recherche teacher avec email:', email);
    
    const { Teacher } = sequelize.models;
    const teacher = await Teacher.findOne({ where: { email: email } });
    
    if (!teacher) {
      return res.status(404).json({ message: 'Aucun compte enseignant associé à cet email' });
    }
    
    const token = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    
    magicLinks.set(`teacher_${token}`, {
      email: email,
      userId: teacher.id,
      role: 'teacher',
      expiresAt: Date.now() + 15 * 60 * 1000
    });
    
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
    const magicLink = `${FRONTEND_URL}/teacher/verify-magic-link?token=${token}&email=${encodeURIComponent(email)}`;
    
    const msg = {
      to: email,
      from: 'on_houali@esi.dz',
      subject: '🔗 Connexion enseignant - ESIcodeHub',
      text: `Cliquez sur ce lien : ${magicLink}\n\nExpire dans 15 minutes.`,
      html: `<h2>Connexion enseignant</h2><a href="${magicLink}">Se connecter</a><p>Expire dans 15 min</p>`
    };
    
    await sgMail.send(msg);
    console.log('✅ Magic link envoyé au teacher:', email);
    res.json({ message: 'Magic link envoyé !', email });
    
  } catch (error) {
    console.error('❌ Erreur:', error.response?.body || error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi' });
  }
});

// Vérifier magic link pour teacher
app.post('/api/auth/teacher/verify-magic-link', async (req, res) => {
  try {
    const { token, email } = req.body;
    console.log('🔐 [TEACHER] Vérification pour:', email);
    
    const linkData = magicLinks.get(`teacher_${token}`);
    if (!linkData) return res.status(401).json({ message: 'Lien invalide' });
    if (Date.now() > linkData.expiresAt) return res.status(401).json({ message: 'Lien expiré' });
    if (linkData.email !== decodeURIComponent(email)) return res.status(401).json({ message: 'Lien invalide' });
    
    const { Teacher } = sequelize.models;
    const teacher = await Teacher.findByPk(linkData.userId);
    if (!teacher) return res.status(401).json({ message: 'Enseignant non trouvé' });
    
    magicLinks.delete(`teacher_${token}`);
    
    const sessionToken = Buffer.from(JSON.stringify({
      id: teacher.id,
      email: teacher.email,
      role: 'teacher',
      timestamp: Date.now()
    })).toString('base64');
    
    res.json({
      success: true,
      token: sessionToken,
      user: {
        id: teacher.id,
        email: teacher.email,
        name: teacher.name || teacher.email,
        role: 'teacher'
      }
    });
    
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur lors de la vérification' });
  }
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api', indexRoutes);
app.use('/api/admin', adminRoutes);

app.post('/api/upload/files', upload.array('codeFiles', 10), uploadController.uploadFiles);
app.post('/api/upload/online', uploadController.uploadOnline);

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend fonctionne parfaitement !' });
});

app.get('/', (req, res) => {
    res.send("Server is running well !");
});

app.get('/api/test-email', async (req, res) => {
  try {
    const msg = { to: 'on_houali@esi.dz', from: 'on_houali@esi.dz', subject: 'Test', text: 'Test' };
    await sgMail.send(msg);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ========== ROUTES POUR ADMIN DASHBOARD ==========

// Récupérer tous les teachers
app.get('/api/auth/teachers', async (req, res) => {
  try {
        const { Teacher } = sequelize.models;  // ✅ Récupère le modèle depuis sequelize

    const teachers = await Teacher.findAll();
    res.json(teachers);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: error.message });
  }
});

// Récupérer tous les étudiants
app.get('/api/auth/students', async (req, res) => {
  try {
        const { Student } = sequelize.models;

    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: error.message });
  }
});

// Récupérer tous les modules
app.get('/api/modules', async (req, res) => {
  try {
        const { Module } = sequelize.models;

    const modules = await Module.findAll();
    res.json(modules);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: error.message });
  }
});

// Récupérer toutes les soumissions
app.get('/api/submissions', async (req, res) => {
  try {
        const { Submission } = sequelize.models;

    const submissions = await Submission.findAll();
    res.json(submissions);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: error.message });
  }
});







app.use(middleware.notFound);
app.use(middleware.errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à PostgreSQL établie');
    console.log('📊 Modèles chargés:', Object.keys(sequelize.models).join(', '));
    await sequelize.sync({ alter: false });
    console.log('✅ Tables synchronisées');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

startServer();