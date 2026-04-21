
// import React, { useEffect, useState } from 'react';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import TeacherLoginPage from './pages/TeacherPage';
// import TeacherRegisterPage from './pages/RegisterTeacher';
// import StudentRegisterPage from './pages/RegisterStudent';
// import LoginPage from './pages/LoginPage';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import ForgotPasswordSent from "./pages/ForgotPasswordSent";
// import MagicLinkLogin from './components/MagicLinkLogin'; // ← AJOUTEZ CETTE LIGNE

// // import UploadCode from './pages/UploadCode'; 
// export default function App() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Utilise la variable VITE_API_URL
//     fetch(`${import.meta.env.VITE_API_URL}/api/test`)
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error('Erreur:', error));
//   }, []);
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<TeacherLoginPage />} />
//         <Route path="/register" element={<TeacherRegisterPage />} />
//         <Route path="/student" element={<LoginPage />} />
//         <Route path="/student/register" element={<StudentRegisterPage />} />
//         <Route path="/student/forgot-password" element={<ForgotPasswordPage userType="student" />} />
//          <Route path="/forgot-password" element={<ForgotPasswordPage userType="teacher" />} /> 

//          <Route path="/forgot-password/sent" element={<ForgotPasswordSent />} />
//  {/* ← AJOUTEZ CETTE LIGNE POUR MAGIC LINK */}
//         <Route path="/verify-magic-link" element={<MagicLinkLogin />} />
        
//       {/* <Route path="/upload" element={<UploadCode/>} />  */}
//       {/* <Route path="/forgot-password/sent" element={<ForgotPasswordSent />} /> */}
//       {/* <Route path="/student/forgot-password/sent" element={<ForgotPasswordSent />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }


/*********with rania  **************/
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
// import { DashboardLayout } from './components/DashboardLayout';
import './styles/global.css';
// Import des pages AUTH existantes
import TeacherLoginPage from './pages/TeacherPage';
import TeacherRegisterPage from './pages/RegisterTeacher';
import StudentRegisterPage from './pages/RegisterStudent';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ForgotPasswordSent from "./pages/ForgotPasswordSent";
import MagicLinkLogin from './components/MagicLinkLogin';

// Import des nouvelles pages DASHBOARD
// import { Dashboard } from './pages/teacher/Dashboard';
import { Submissions } from './pages/teacher/Submissions';
import { Students } from './pages/teacher/Students';
import { CodeReviews } from './pages/teacher/CodeReviews';
import { Feedback } from './pages/teacher/Feedback';
import { Plagiarism } from './pages/teacher/Plagiarism';
import { VersionHistory } from './pages/teacher/VersionHistory';
// import { MyProfile } from './pages/teacher/Profile';
import { StudentDashboard } from './pages/student/StudentDashboard';
import AdminDashboard  from './pages/admin/AdminDashboard';
import LandingPage from "./pages/landing/LandingPage.jsx";  // ← Sans les {}
import { PrivacyPage } from './pages/PrivacyPage';
import { ContactPage } from './pages/ContactPage';
import TeacherMagicLinkLogin from './components/TeacherMagicLinkLogin';
import TeacherMagicLink from './pages/TeacherMagicLink';
import { Dashboard } from "./pages/teacher/Dashboard";
// import CodeReviews      from './pages/CodeReviews';
// import Feedback         from './pages/Feedback';
// import Plagiarism       from './pages/Plagiarism';
// import VersionHistory   from './pages/VersionHistory';
import MyProfile        from './pages/MyProfile';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import DashboardLayout from './components/DashboardLayout';


function AppContent() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/test`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Erreur:', error));
}, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/teacher/login" element={<TeacherLoginPage />} />
      <Route path="/teacher/register" element={<TeacherRegisterPage />} />
      <Route path="/student" element={<LoginPage />} />
      <Route path="/student/register" element={<StudentRegisterPage />} />
      <Route path="/student/forgot-password" element={<ForgotPasswordPage userType="student" />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage userType="teacher" />} />
      <Route path="/forgot-password/sent" element={<ForgotPasswordSent />} />
      <Route path="/verify-magic-link" element={<MagicLinkLogin />} />
           <Route path="/admin-login" element={<AdminLogin />} />

      {/* <Route path="/admin" element={<AdminDashboard />} /> */}
<Route path="/admin" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminDashboard />
  </ProtectedRoute>
} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
<Route path="/teacher/magic-link" element={<TeacherMagicLink />} />

<Route path="/teacher/verify-magic-link" element={<TeacherMagicLinkLogin />} />
<Route path="/teacher/dashboard" element={<Dashboard />} />

      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['teacher', 'student']}>
          <DashboardLayout>
            {user?.role === 'teacher' ? <Dashboard /> : <StudentDashboard />}
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/submissions" element={ <ProtectedRoute allowedRoles={['teacher']}><DashboardLayout><Submissions /></DashboardLayout> </ProtectedRoute>} />
      <Route path="/students" element={ <ProtectedRoute allowedRoles={['teacher']}>  <DashboardLayout><Students /></DashboardLayout> </ProtectedRoute> } />
      <Route path="/code-reviews" element={ <ProtectedRoute allowedRoles={['teacher']}> <DashboardLayout><CodeReviews /></DashboardLayout></ProtectedRoute>} />
      <Route path="/feedback" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <DashboardLayout><Feedback /></DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/plagiarism" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <DashboardLayout><Plagiarism /></DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/version-history" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <DashboardLayout><VersionHistory /></DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={['teacher', 'student']}>
          <DashboardLayout><MyProfile /></DashboardLayout>
        </ProtectedRoute>
      } />

/**********************/


      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <style>{globalStyles}</style> */}
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;  // ← CECI EST CRUCIAL !