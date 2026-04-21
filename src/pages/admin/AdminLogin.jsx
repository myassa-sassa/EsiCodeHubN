




// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { Shield, Lock, Key, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

// export default function AdminLoginForm() {
//   const [adminId, setAdminId] = useState('');
//   const [adminCode, setAdminCode] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const ADMIN_CREDENTIALS = {
//     id: 'ADMIN001',
//     code: 'ESI2024'
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!adminId.trim()) {
//       setError('Admin ID is required');
//       setIsLoading(false);
//       return;
//     }
    
//     if (!adminCode.trim()) {
//       setError('Password is required');
//       setIsLoading(false);
//       return;
//     }

//     setTimeout(() => {
//       if (adminId === ADMIN_CREDENTIALS.id && adminCode === ADMIN_CREDENTIALS.code) {
//         login({
//           id: adminId,
//           name: 'Administrator',
//           role: 'admin',
//           avatar: 'AD',
//           email: 'admin@esicodehub.dz'
//         });
//         navigate('/admin');
//       } else {
//         setError('Invalid Admin ID or Password');
//       }
//       setIsLoading(false);
//     }, 800);
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '12px 16px',
//     border: '1.5px solid #E5E7EB',
//     borderRadius: '12px',
//     fontSize: '14px',
//     transition: 'all 0.2s',
//     outline: 'none',
//     background: '#FAFAFA',
//     fontFamily: 'inherit'
//   };

//   const labelStyle = {
//     display: 'block',
//     marginBottom: '8px',
//     fontSize: '13px',
//     fontWeight: 600,
//     color: '#374151'
//   };

//   return (
//     <div style={{
//       padding: '48px 40px',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       background: 'white',
//       height: '100%'
//     }}>
//       {/* Header */}
//       <div style={{ textAlign: 'center', marginBottom: '32px' }}>
//         <div style={{
//           width: '64px',
//           height: '64px',
//           background: 'linear-gradient(135deg, #0F172A, #1E293B)',
//           borderRadius: '18px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           margin: '0 auto 16px',
//           boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
//         }}>
//           <Shield size={28} color="#FFC533" />
//         </div>
//         <h3 style={{
//           fontSize: '24px',
//           fontWeight: 800,
//           marginBottom: '6px',
//           color: '#1F2937',
//           letterSpacing: '-0.02em'
//         }}>
//           Admin Portal
//         </h3>
//         <p style={{
//           fontSize: '13px',
//           color: '#6B7280'
//         }}>
//           Enter your credentials to access the dashboard
//         </p>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div style={{
//           background: '#FEF2F2',
//           color: '#DC2626',
//           padding: '12px 16px',
//           borderRadius: '12px',
//           marginBottom: '24px',
//           fontSize: '13px',
//           fontWeight: 500,
//           display: 'flex',
//           alignItems: 'center',
//           gap: '10px',
//           borderLeft: '3px solid #DC2626'
//         }}>
//           <AlertCircle size={16} />
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '20px' }}>
//           <label style={labelStyle}>Admin ID</label>
//           <input
//             type="text"
//             value={adminId}
//             onChange={(e) => setAdminId(e.target.value)}
//             placeholder="Enter your Admin ID"
//             style={{
//               ...inputStyle,
//               borderColor: error && !adminId ? '#DC2626' : '#E5E7EB'
//             }}
//             onFocus={(e) => {
//               e.target.style.borderColor = '#3B5BDB';
//               e.target.style.background = 'white';
//               setError('');
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = '#E5E7EB';
//               e.target.style.background = '#FAFAFA';
//             }}
//             required
//           />
//         </div>

//         <div style={{ marginBottom: '24px' }}>
//           <label style={labelStyle}>Password</label>
//           <div style={{ position: 'relative' }}>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={adminCode}
//               onChange={(e) => setAdminCode(e.target.value)}
//               placeholder="Enter your password"
//               style={{
//                 ...inputStyle,
//                 paddingRight: '45px',
//                 borderColor: error && !adminCode ? '#DC2626' : '#E5E7EB'
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = '#3B5BDB';
//                 e.target.style.background = 'white';
//                 setError('');
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = '#E5E7EB';
//                 e.target.style.background = '#FAFAFA';
//               }}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               style={{
//                 position: 'absolute',
//                 right: '14px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 color: '#9CA3AF',
//                 padding: 0
//               }}
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           style={{
//             width: '100%',
//             padding: '12px',
//             background: 'linear-gradient(90deg, #3B5BDB, #5E7AE6)',
//             color: 'white',
//             border: 'none',
//             borderRadius: '12px',
//             fontSize: '14px',
//             fontWeight: 600,
//             cursor: isLoading ? 'not-allowed' : 'pointer',
//             transition: 'all 0.3s',
//             opacity: isLoading ? 0.7 : 1,
//             marginBottom: '20px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '8px'
//           }}
//           onMouseEnter={(e) => {
//             if (!isLoading) {
//               e.currentTarget.style.transform = 'translateY(-2px)';
//               e.currentTarget.style.boxShadow = '0 8px 20px rgba(59,91,219,0.3)';
//             }
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = 'translateY(0)';
//             e.currentTarget.style.boxShadow = 'none';
//           }}
//         >
//           {isLoading ? 'Connecting...' : 'Sign In'}
//           {!isLoading && <ArrowRight size={14} />}
//         </button>

//         {/* Demo Credentials */}
//         <div style={{
//           textAlign: 'center',
//           padding: '14px',
//           background: '#F9FAFB',
//           borderRadius: '12px',
//           border: '1px solid #E5E7EB'
//         }}>
//           <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//             Demo Credentials
//           </p>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '12px', flexWrap: 'wrap' }}>
//             <code style={{ background: '#E5E7EB', padding: '4px 10px', borderRadius: '8px', fontSize: '11px' }}>
//               ID: ADMIN001
//             </code>
//             <code style={{ background: '#E5E7EB', padding: '4px 10px', borderRadius: '8px', fontSize: '11px' }}>
//               Password: ESI2024
//             </code>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

import AdminLoginForm from '../../components/AdminLoginForm';

export default function AdminLogin() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "1100px",
        background: "#FFFFFF",
        borderRadius: "24px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        minHeight: "600px",
        background: "linear-gradient(135deg, #F0F4F8 0%, #D9E2EC 100%)",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          padding: "48px 32px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>
            Admin <span style={{ color: "#FFC533" }}>Portal</span>
          </h1>
          <p style={{ fontSize: "16px", opacity: 0.9, lineHeight: 1.6 }}>
            Secure access for administrators only.
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}