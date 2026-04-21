// import { useState } from "react";
// import "../../styles/global.css";  // 2 niveaux plus haut

// export function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [users, setUsers] = useState([
//     { id: 1, name: 'Dr. Achour Dalila', email: 'achour@esi.dz', role: 'teacher', status: 'active', joined: '2024-09-01' },
//     { id: 2, name: 'Prof. Amrani', email: 'amrani@esi.dz', role: 'teacher', status: 'active', joined: '2024-09-01' },
//     { id: 3, name: 'Yacine Benali', email: 'yacine@esi.dz', role: 'student', status: 'active', joined: '2024-09-15' },
//     { id: 4, name: 'Sara Moussaoui', email: 'sara@esi.dz', role: 'student', status: 'active', joined: '2024-09-15' },
//   ]);
//   const [modules, setModules] = useState([
//     { id: 1, name: 'POO', code: 'POO-2CP', year: '2CP', teacher: 'Dr. Achour Dalila', students: 45 },
//     { id: 2, name: 'SFSD', code: 'SFSD-2CP', year: '2CP', teacher: 'Prof. Amrani', students: 42 },
//   ]);
//   const [showUserModal, setShowUserModal] = useState(false);
//   const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' });

//   const stats = {
//     totalUsers: users.length,
//     totalTeachers: users.filter(u => u.role === 'teacher').length,
//     totalStudents: users.filter(u => u.role === 'student').length,
//     totalModules: modules.length,
//     activeUsers: users.filter(u => u.status === 'active').length,
//   };

//   const handleAddUser = () => {
//     if (!newUser.name || !newUser.email) {
//       alert('Please fill all fields');
//       return;
//     }
//     const newId = users.length + 1;
//     setUsers([...users, { 
//       id: newId, 
//       name: newUser.name, 
//       email: newUser.email, 
//       role: newUser.role, 
//       status: 'active', 
//       joined: new Date().toISOString().slice(0,10) 
//     }]);
//     setShowUserModal(false);
//     setNewUser({ name: '', email: '', role: 'student' });
//     alert('✅ User added successfully!');
//   };

//   return (
//     <div className="admin-container" style={{ padding: '28px 32px', maxWidth: '1400px', margin: '0 auto' }}>
//       {/* Header */}
//       <div className="admin-header" style={{ background: 'white', borderRadius: '24px', padding: '24px 32px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E5E7EB' }}>
//         <div>
//           <h1 style={{ fontSize: '28px', fontWeight: 800, background: 'linear-gradient(135deg, #0F172A, #3B5BDB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>👑 System Administration</h1>
//           <p style={{ color: '#6B7280' }}>Manage users, modules, and monitor system activity</p>
//         </div>
//         <div className="admin-avatar" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #FFC533, #5E7AE6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '18px', color: '#0F172A' }}>AD</div>
//       </div>

//       {/* Stats Cards */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '28px' }}>
//         <div className="stat-card" style={{ background: 'white', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
//           <div style={{ fontSize: '42px' }}>👥</div>
//           <div><div style={{ fontSize: '32px', fontWeight: 800 }}>{stats.totalUsers}</div><div style={{ fontSize: '13px', color: '#6B7280' }}>Total Users</div></div>
//         </div>
//         <div className="stat-card" style={{ background: 'white', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
//           <div style={{ fontSize: '42px' }}>📚</div>
//           <div><div style={{ fontSize: '32px', fontWeight: 800 }}>{stats.totalModules}</div><div style={{ fontSize: '13px', color: '#6B7280' }}>Active Modules</div></div>
//         </div>
//         <div className="stat-card" style={{ background: 'white', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
//           <div style={{ fontSize: '42px' }}>👨‍🏫</div>
//           <div><div style={{ fontSize: '32px', fontWeight: 800 }}>{stats.totalTeachers}</div><div style={{ fontSize: '13px', color: '#6B7280' }}>Teachers</div></div>
//         </div>
//         <div className="stat-card" style={{ background: 'white', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
//           <div style={{ fontSize: '42px' }}>👨‍🎓</div>
//           <div><div style={{ fontSize: '32px', fontWeight: 800 }}>{stats.totalStudents}</div><div style={{ fontSize: '13px', color: '#6B7280' }}>Students</div></div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', background: 'white', padding: '8px 16px', borderRadius: '24px', border: '1px solid #E5E7EB' }}>
//         {['overview', 'users', 'modules'].map(tab => (
//           <button key={tab} className={`admin-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)} style={{ padding: '10px 24px', background: activeTab === tab ? '#3B5BDB' : 'none', color: activeTab === tab ? 'white' : '#6B7280', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>
//             {tab === 'overview' && '📊 Overview'}
//             {tab === 'users' && '👥 Users'}
//             {tab === 'modules' && '📖 Modules'}
//           </button>
//         ))}
//       </div>

//       {/* Users Tab */}
//       {activeTab === 'users' && (
//         <div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
//             <h2 style={{ fontSize: '20px', fontWeight: 700 }}>👥 User Management</h2>
//             <button className="btn-primary" onClick={() => setShowUserModal(true)} style={{ background: '#3B5BDB', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>+ Add New User</button>
//           </div>
//           <table className="admin-table" style={{ width: '100%', background: 'white', borderRadius: '24px', borderCollapse: 'collapse', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
//             <thead>
//               <tr style={{ background: '#F9FAFB' }}>
//                 <th style={{ padding: '16px 20px', textAlign: 'left' }}>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//                 <tr key={user.id}>
//                   <td style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB' }}><strong>{user.name}</strong></td>
//                   <td>{user.email}</td>
//                   <td><span style={{ background: user.role === 'teacher' ? '#E8F0FE' : '#ECFDF5', color: user.role === 'teacher' ? '#3B5BDB' : '#10B981', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>{user.role === 'teacher' ? '👩‍🏫 Teacher' : '👨‍🎓 Student'}</span></td>
//                   <td><span style={{ background: user.status === 'active' ? '#ECFDF5' : '#FEF3F2', color: user.status === 'active' ? '#10B981' : '#EF4444', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>{user.status === 'active' ? '🟢 Active' : '🔴 Inactive'}</span></td>
//                   <td>{user.joined}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Modules Tab */}
//       {activeTab === 'modules' && (
//         <div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
//             <h2 style={{ fontSize: '20px', fontWeight: 700 }}>📖 Module Management</h2>
//             <button className="btn-primary" onClick={() => alert('Add module')} style={{ background: '#3B5BDB', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>+ Add Module</button>
//           </div>
//           <table className="admin-table" style={{ width: '100%', background: 'white', borderRadius: '24px', borderCollapse: 'collapse', overflow: 'hidden' }}>
//             <thead>
//               <tr style={{ background: '#F9FAFB' }}>
//                 <th style={{ padding: '16px 20px', textAlign: 'left' }}>Code</th><th>Module</th><th>Year</th><th>Teacher</th><th>Students</th>
//               </tr>
//             </thead>
//             <tbody>
//               {modules.map(module => (
//                 <tr key={module.id}>
//                   <td style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB' }}><code>{module.code}</code></td>
//                   <td><strong>{module.name}</strong></td>
//                   <td><span style={{ background: '#EEF3FD', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{module.year}</span></td>
//                   <td>{module.teacher}</td>
//                   <td>{module.students}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Add User Modal */}
//       {showUserModal && (
//         <div className="modal" onClick={() => setShowUserModal(false)}>
//           <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
//             <button className="close" onClick={() => setShowUserModal(false)}>✕</button>
//             <h2 style={{ marginBottom: 20 }}>➕ Add New User</h2>
//             <div style={{ marginBottom: 16 }}>
//               <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Full Name</label>
//               <input type="text" className="edit-input" placeholder="Enter full name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
//             </div>
//             <div style={{ marginBottom: 16 }}>
//               <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Email</label>
//               <input type="email" className="edit-input" placeholder="Enter email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
//             </div>
//             <div style={{ marginBottom: 20 }}>
//               <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Role</label>
//               <select className="edit-input" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
//                 <option value="student">Student</option>
//                 <option value="teacher">Teacher</option>
//               </select>
//             </div>
//             <div className="modal-buttons" style={{ display: 'flex', gap: 12 }}>
//               <button className="filter-btn" onClick={() => setShowUserModal(false)}>Cancel</button>
//               <button className="approve" onClick={handleAddUser}>Add User</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState,useEffect } from "react";
import { 
  Users, BookOpen, Activity, Shield, Search, Plus, 
  Edit2, Trash2, X, CheckCircle, AlertCircle, 
  UserPlus, BookPlus, TrendingUp, Clock, Calendar,
  Mail, UserCheck, UserX, Award, Zap, BarChart3
} from 'lucide-react';

const INITIAL_USERS = [
  { id:1, name:'Dr. Achour Dalila', email:'achour@esi.dz', role:'teacher', status:'active', joined:'2024-09-01' },
  { id:2, name:'Prof. Amrani',       email:'amrani@esi.dz', role:'teacher', status:'active', joined:'2024-09-01' },
  { id:3, name:'Yacine Benali',      email:'yacine@esi.dz', role:'student', status:'active', joined:'2024-09-15' },
  { id:4, name:'Sara Moussaoui',     email:'sara@esi.dz',   role:'student', status:'active', joined:'2024-09-15' },
  { id:5, name:'Karim Amari',        email:'karim@esi.dz',  role:'student', status:'inactive', joined:'2024-09-20' },
];

const INITIAL_MODULES = [
  { id:1, name:'POO',   code:'POO-2CP',   year:'2CP', teacher:'Dr. Achour Dalila', students:45 },
  { id:2, name:'SFSD',  code:'SFSD-2CP',  year:'2CP', teacher:'Prof. Amrani',      students:42 },
  { id:3, name:'ALSDD', code:'ALSDD-1CP', year:'1CP', teacher:'Dr. Benali',        students:38 },
  { id:4, name:'ALSDS', code:'ALSDS-1CP', year:'1CP', teacher:'Dr. Khelifi',       students:40 },
];

// const roleBadge = (role) => ({
//   teacher: { bg: '#EEF2FF', color: '#3B5BDB', icon: '👩‍🏫', label: 'Teacher' },
//   student: { bg: '#ECFDF5', color: '#10B981', icon: '👨‍🎓', label: 'Student' }
// }[role] || { bg: '#F3F4F6', color: '#6B7280', icon: '👤', label: role });
const roleBadge = (role) => {
  if (role === 'admin') return { bg: '#FEF3C7', color: '#D97706', icon: '👑', label: 'Admin' };
  if (role === 'teacher') return { bg: '#EEF2FF', color: '#3B5BDB', icon: '👩‍🏫', label: 'Teacher' };
  return { bg: '#ECFDF5', color: '#10B981', icon: '👨‍🎓', label: 'Student' };
};
const statusBadge = (status) => ({
  active: { bg: '#ECFDF5', color: '#10B981', icon: '🟢', label: 'Active' },
  inactive: { bg: '#FEF2F2', color: '#EF4444', icon: '🔴', label: 'Inactive' }
}[status] || { bg: '#F3F4F6', color: '#6B7280', icon: '⚪', label: status });

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState(INITIAL_USERS);
  // const [modules, setModules] = useState(INITIAL_MODULES);
    const [modules, setModules] = useState([]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
const [newUser, setNewUser] = useState({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    role: 'student',
    esi_id: '',
    teacher_id: ''
})
;const [newModule, setNewModule] = useState({ name: '', description: '', code: '', year: '1CP', teacher: '' });  const [searchUser, setSearchUser] = useState('');
  const [searchModule, setSearchModule] = useState('');
// const allUsers = [...users];

// const totalUsers = allUsers.length;
// {stats.totalTeachers} Teachers · {stats.totalStudents} Students

  const [stats, setStats] = useState({
    // totalUsers: users.length,
    // totalTeachers: users.filter(u => u.role === 'teacher').length,
    // totalStudents: users.filter(u => u.role === 'student').length,
    // totalModules: modules.length,
    // activeUsers: users.filter(u => u.status === 'active').length,
    // totalSubmissions: 148,
    // flaggedSubmissions: 5,
    // pendingReviews: 2,
       totalUsers: 0,
    totalTeachers: 0,
    totalStudents: 0,
    totalModules: 0,
    activeUsers: 0,
    totalSubmissions: 0,
    flaggedSubmissions: 0,
    pendingReviews: 0
  });
  const [loading, setLoading] = useState(true);
 useEffect(() => {
    fetchDashboardData();
  },[]);
const fetchDashboardData = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      // Récupérer les teachers (utilisateurs)
      const teachersRes = await fetch(`${API_URL}/api/auth/teachers`);
      const teachers = await teachersRes.json();
      
      // Récupérer les étudiants
      const studentsRes = await fetch(`${API_URL}/api/auth/students`);
      const students = await studentsRes.json();
      
      // Récupérer les modules
      const modulesRes = await fetch(`${API_URL}/api/modules`);
      const modulesData = await modulesRes.json();
      
      // Récupérer les soumissions
      const submissionsRes = await fetch(`${API_URL}/api/submissions`);
      const submissions = await submissionsRes.json();
     // Formater les teachers
    const formattedTeachers = teachers.map(t => ({
      id: t.teacher_id,
      displayId: t.teacher_id ,
      name: `${t.first_name || ''} ${t.last_name || ''}`.trim() || t.email,
      email: t.email,
      role: t.role === 'admin' ? 'admin' : 'teacher',
      status: 'active',
      joined: t.createdAt ? t.createdAt.slice(0,10) : new Date().toISOString().slice(0,10)
    }));
    
    // Formater les étudiants
    const formattedStudents = students.map(s => ({
      // id: s.id,
            id: s.esi_id,

      displayId: s.esi_id ,
      name: `${s.first_name || ''} ${s.last_name || ''}`.trim() || s.email,
      email: s.email,
      role: s.role === 'admin' ? 'admin' : 'student',
      status: 'active',
      joined: s.createdAt ? s.createdAt.slice(0,10) : new Date().toISOString().slice(0,10)
    }));
    
    console.log('Teachers formatés:', formattedTeachers);
    console.log('Students formatés:', formattedStudents);
      // Calculer les stats
const allUsers = [...formattedTeachers, ...formattedStudents];
      const activeUsers = allUsers.filter(u => u.status === 'active').length;
      const flagged = submissions.filter(s => s.similarity > 70).length;
      const pending = submissions.filter(s => s.status === 'pending').length;
      
      setUsers(allUsers);
      setModules(modulesData);
      console.log('✅ modules après setModules:', modulesData);

      setStats({
  totalUsers: allUsers.length,
  totalTeachers: teachers.length,
  totalStudents: students.length,
  totalModules: modulesData.length,
  activeUsers: activeUsers,
  totalSubmissions: submissions.length,
  flaggedSubmissions: flagged,
  pendingReviews: pending
});
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>Chargement des données...</div>;
  }


  // const filteredUsers = users.filter(u => 
  //   u.name.toLowerCase().includes(searchUser.toLowerCase()) || 
  //   u.email.includes(searchUser)
  // );
  const filteredUsers = users.filter(u => {
  if (!u) return false;
  const nameMatch = u.name && u.name.toLowerCase().includes(searchUser.toLowerCase());
  const emailMatch = u.email && u.email.toLowerCase().includes(searchUser.toLowerCase());
  return nameMatch || emailMatch;
});
  // const filteredModules = modules.filter(m => 
  //   m.name.toLowerCase().includes(searchModule.toLowerCase()) || 
  //   m.code.toLowerCase().includes(searchModule)
  // );
// const filteredModules = modules;
const filteredModules = modules.filter(m => {
  if (!m) return true;
  if (!searchModule || searchModule.trim() === '') return true;
  const nameMatch = m.module_name && m.module_name.toLowerCase().includes(searchModule.toLowerCase());
  const idMatch = m.id && m.id.toString().includes(searchModule);
  return nameMatch || idMatch;
});
  const addUser = () => {
    if (!newUser.name || !newUser.email) { alert('Please fill all fields'); return; }
    setUsers([...users, { 
      id: users.length + 1, 
      ...newUser, 
      status: 'active', 
      joined: new Date().toISOString().slice(0, 10) 
    }]);
    setShowUserModal(false);
    setNewUser({ name: '', email: '', role: 'student' });
    alert('✅ User added successfully!');
  };

  const toggleUser = (id) => setUsers(users.map(u => 
    u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
  ));
  
  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      alert('✅ User deleted!');
    }
  };

  const addModule = async () => {
    if (!newModule.name) {
        alert('Veuillez entrer le nom du module');
        return;
    }

    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await fetch(`${API_URL}/api/admin/modules/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                module_name: newModule.name,
                description: newModule.description || null,
                teacher_id: null
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ Module ajouté avec succès !');
            setShowModuleModal(false);
            setNewModule({ name: '', code: '', year: '1CP', teacher: '' });
            // Recharger la liste des modules
            fetchDashboardData();
        } else {
            alert('❌ Erreur: ' + (data.message || 'Erreur lors de l\'ajout'));
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('❌ Erreur de connexion');
    }
};

  const deleteModule = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce module ?')) {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${API_URL}/api/admin/modules/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('✅ Module supprimé avec succès !');
                // Recharger la liste des modules
                fetchDashboardData();
            } else {
                alert('❌ Erreur: ' + data.message);
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('❌ Erreur de connexion');
        }
    }
};

  const TABS = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
    { id: 'users', label: 'User Management', icon: <Users size={16} /> },
    { id: 'modules', label: 'Module Management', icon: <BookOpen size={16} /> },
  ];
console.log('📦 MODULES DATA:', modules);
console.log('🔍 searchModule:', searchModule);
console.log('📦 filteredModules:', filteredModules);
console.log('📦 modules complets:', modules);

console.log('🔍 modules state dans JSX:', modules);
console.log('🔍 filteredModules dans JSX:', filteredModules);
console.log('🔍 searchModule valeur:', searchModule);
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)', padding: '32px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '28px 32px', marginBottom: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #E9EDF3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={24} color="#FFC533" />
                </div>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1F2937', margin: 0 }}>System Administration</h1>
                  <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '4px' }}>Manage users, modules, and monitor platform activity</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: '#F3F4F6', padding: '8px 16px', borderRadius: '40px', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={14} color="#3B5BDB" /> System v2.0
              </div>
              <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #3B5BDB, #5E7AE6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '16px' }}>
                AD
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #E9EDF3', transition: 'transform 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', background: '#EEF2FF', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={24} color="#3B5BDB" />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#1F2937' }}>{stats.totalUsers}</div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>Total Users</div>
              </div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#9CA3AF' }}>
              {stats.totalTeachers} Teachers · {stats.totalStudents} Students
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #E9EDF3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', background: '#ECFDF5', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={24} color="#10B981" />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#1F2937' }}>{stats.totalModules}</div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>Active Modules</div>
              </div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#9CA3AF' }}>
              {modules.filter(m => m.year === '2CP').length} 2CP · {modules.filter(m => m.year === '1CP').length} 1CP
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #E9EDF3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', background: '#FEF2F2', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={24} color="#EF4444" />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#1F2937' }}>{stats.totalSubmissions}</div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>Submissions</div>
              </div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#EF4444' }}>
              {stats.flaggedSubmissions} flagged
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #E9EDF3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', background: '#FFFBEB', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={24} color="#F59E0B" />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#1F2937' }}>{stats.activeUsers}</div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>Active Users</div>
              </div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#9CA3AF' }}>
              Uptime: 99.9%
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '40px',
                border: 'none',
                background: activeTab === tab.id ? '#3B5BDB' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#6B7280',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #E9EDF3' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="#3B5BDB" /> Platform Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: '📈 Submissions this week', value: '+12', color: '#10B981' },
                  { label: '👥 New users', value: '+5', color: '#10B981' },
                  { label: '⚠️ Plagiarism alerts', value: '3', color: '#EF4444' },
                  { label: '✅ Reviews completed', value: '28', color: '#10B981' },
                  { label: '⏳ Pending reviews', value: stats.pendingReviews, color: '#F59E0B' },
                  { label: '⚡ Avg response time', value: '4.2h', color: '#6B7280' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
                    <span style={{ fontSize: '14px', color: '#6B7280' }}>{item.label}</span>
                    <strong style={{ fontSize: '16px', color: item.color }}>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #E9EDF3' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="#8B5CF6" /> Top Modules
              </h3>
              {modules.slice(0, 3).map(m => (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F3F4F6' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{m.code}</div>
                  </div>
                  <span style={{ background: '#EEF2FF', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: '#3B5BDB' }}>
                    {m.students} students
                  </span>
                </div>
              ))}
            </div>

            <div style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #E9EDF3' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#F59E0B" /> Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px' }}>👩‍🏫 Dr. Achour Dalila</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>2 min ago</span>
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '-8px', marginLeft: '20px' }}>Reviewed code #23</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px' }}>👨‍🎓 Yacine Benali</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>15 min ago</span>
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '-8px', marginLeft: '20px' }}>Submitted new code</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px' }}>⚠️ System Alert</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>1 hour ago</span>
                </div>
                <div style={{ fontSize: '12px', color: '#EF4444', marginTop: '-8px', marginLeft: '20px' }}>Plagiarism detected (87%)</div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E9EDF3', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} color="#3B5BDB" /> User Management
              </h2>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    className="search-input"
                    placeholder="Search users..."
                    value={searchUser}
                    onChange={e => setSearchUser(e.target.value)}
                    style={{ padding: '10px 12px 10px 36px', width: '250px', borderRadius: '40px', border: '1px solid #E5E7EB' }}
                  />
                </div>
                <button onClick={() => setShowUserModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#3B5BDB', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  <UserPlus size={16} /> Add User
                </button>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>ID</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>User</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Email</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Role</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Status</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Joined</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Actions</th>
                  </tr>
                </thead>
                
                <tbody>
                  {filteredUsers.map(u => {
                    const rs = roleBadge(u.role);
                    const ss = statusBadge(u.status);
                    console.log('🔍 filteredUsers:', filteredUsers);
console.log('🔍 users:', users);
console.log('🔍 loading:', loading);
                    return (
                      <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontFamily: 'monospace' }}>#{u.displayId}</td>
                        <td style={{ padding: '12px 16px' }}><strong>{u.name}</strong></td>
                        <td style={{ padding: '12px 16px', color: '#6B7280' }}>{u.email}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: rs.bg, color: rs.color, padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            {rs.icon} {rs.label}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: ss.bg, color: ss.color, padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            {ss.icon} {ss.label}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#6B7280' }}>{u.joined}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <button onClick={() => toggleUser(u.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '6px', marginRight: '4px' }}>
                            {u.status === 'active' ? <UserX size={16} color="#F59E0B" /> : <UserCheck size={16} color="#10B981" />}
                          </button>
                          <button onClick={() => deleteUser(u.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}>
                            <Trash2 size={16} color="#EF4444" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modules Tab */}
        {activeTab === 'modules' && (
  <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E9EDF3', overflow: 'hidden' }}>
    <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BookOpen size={20} color="#3B5BDB" /> Module Management
      </h2>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            className="search-input"
            placeholder="Search modules..."
            value={searchModule}
            onChange={e => setSearchModule(e.target.value)}
            style={{ padding: '10px 12px 10px 36px', width: '250px', borderRadius: '40px', border: '1px solid #E5E7EB' }}
          />
        </div>
        <button onClick={() => setShowModuleModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#3B5BDB', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          <BookPlus size={16} /> Add Module
        </button>
      </div>
    </div>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>ID</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Module Name</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Year</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Teacher</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Students</th>
            <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Actions</th>
           </tr>
        </thead>
        <tbody>
         {filteredModules.length === 0 ? (
  <tr>
    <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
      No Module Found
    </td>
  </tr>
) : (
  filteredModules.map(m => (
    <tr key={m.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px' }}>
        {m.id}
      </td>
      <td style={{ padding: '12px 16px' }}>
        <strong>{m.module_name}</strong>
      </td>
      <td style={{ padding: '12px 16px' }}>
        <span style={{ background: '#EEF2FF', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, color: '#3B5BDB' }}>
          N/A
        </span>
      </td>
      <td style={{ padding: '12px 16px', color: '#6B7280' }}>
        Not assigned
      </td>
      <td style={{ padding: '12px 16px', fontWeight: 600 }}>
        0
      </td>
      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
        <button onClick={() => alert(`Edit ${m.module_name}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '6px', marginRight: '4px' }}>
          <Edit2 size={16} color="#3B5BDB" />
        </button>
        <button onClick={() => deleteModule(m.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}>
          <Trash2 size={16} color="#EF4444" />
        </button>
      </td>
    </tr>
  ))
)}
        </tbody>
      </table>
    </div>
  </div>
)}

        {/* Add User Modal */}
        {/* Add User Modal */}
{/* Add User Modal */}
{showUserModal && (
  <div className="modal" onClick={() => setShowUserModal(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 500, borderRadius: '24px', padding: 0, overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UserPlus size={20} color="#FFC533" />
          <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 700, margin: 0 }}>Add New User</h2>
        </div>
        <button className="close" onClick={() => setShowUserModal(false)} style={{ position: 'relative', top: 'auto', right: 'auto', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
          <X size={18} />
        </button>
      </div>
      <div style={{ padding: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '13px' }}>First Name</label>
            <input
              type="text"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }}
              placeholder="First name"
              value={newUser.first_name}
              onChange={e => setNewUser({ ...newUser, first_name: e.target.value })}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '13px' }}>Last Name</label>
            <input
              type="text"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }}
              placeholder="Last name"
              value={newUser.last_name}
              onChange={e => setNewUser({ ...newUser, last_name: e.target.value })}
            />
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '13px' }}>Email</label>
          <input
            type="email"
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }}
            placeholder="Enter email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '13px' }}>
            {newUser.role === 'student' ? 'ESI ID' : 'Teacher ID'}
          </label>
          <input
            type="text"
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }}
            placeholder={newUser.role === 'student' ? 'Enter ESI ID' : 'Enter Teacher ID'}
            value={newUser.role === 'student' ? newUser.esi_id : newUser.teacher_id}
            onChange={e => {
                if (newUser.role === 'student') {
                    setNewUser({ ...newUser, esi_id: e.target.value });
                } else {
                    setNewUser({ ...newUser, teacher_id: e.target.value });
                }
            }}
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '13px' }}>Role</label>
          <select
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }}
            value={newUser.role}
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="filter-btn" onClick={() => setShowUserModal(false)} style={{ padding: '10px 20px' }}>Cancel</button>
          <button className="approve" onClick={addUser} style={{ padding: '10px 24px', background: '#10B981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
            Add User
          </button>
        </div>
      </div>
    </div>
  </div>
)}
        {/* Add Module Modal */}
     {/* Add Module Modal */}
{showModuleModal && (
  <div className="modal" onClick={() => setShowModuleModal(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 500, borderRadius: '24px', padding: 0, overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookPlus size={20} color="#FFC533" />
          <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 700, margin: 0 }}>Add New Module</h2>
        </div>
        <button className="close" onClick={() => setShowModuleModal(false)} style={{ position: 'relative', top: 'auto', right: 'auto', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
          <X size={18} />
        </button>
      </div>
      <div style={{ padding: '28px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '13px' }}>
            Module Name *
          </label>
          <input
            type="text"
            className="edit-input"
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB' }}
            placeholder="e.g., POO, Python, Java"
            value={newModule.name}
            onChange={e => setNewModule({ ...newModule, name: e.target.value })}
          />
        </div>
      <div style={{ marginBottom: '16px' }}>
  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '13px' }}>
    Description (Optionnel)
  </label>
  <textarea
    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB', minHeight: '80px' }}
    placeholder="Description du module"
    value={newModule.description}
    onChange={e => setNewModule({ ...newModule, description: e.target.value })}
  />
</div>
        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
          <button className="filter-btn" onClick={() => setShowModuleModal(false)} style={{ padding: '10px 20px' }}>Cancel</button>
          <button className="approve" onClick={addModule} style={{ padding: '10px 24px', background: '#10B981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
            Add Module
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}