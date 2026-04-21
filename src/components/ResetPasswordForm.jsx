// import ResetPasswordForm from '../components/ResetPasswordForm';
// import lockImage from '../assets/lock.jpg';

// export default function ResetPasswordPage({ userType = "student" }) {
//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "#EEF2F7", 
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "24px",
//       fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//       boxSizing: "border-box",
//     }}>
//       <div style={{
//         width: "100%",
//         maxWidth: "960px",
//         height: "600px",
//         background: "#FFFFFF",
//         borderRadius: "20px",
//         boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
//         overflow: "hidden",
//         display: "flex",
//         position: "relative"
//       }}>

//         <svg
//           viewBox="0 0 100 100"
//           preserveAspectRatio="none"
//           style={{
//             position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
//             pointerEvents: 'none', zIndex: 0
//           }}
//         >
//           <polygon points="40,100 100,100 100,0 72,0" fill="url(#splitBgGrad)" />
//           <line x1="40" y1="100" x2="72" y2="0" stroke="#909CB4" strokeWidth="0.12" />

//           <defs>
//             <linearGradient id="splitBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#EFF2FD" />
//               <stop offset="100%" stopColor="#D5DFFF" />
//             </linearGradient>
//           </defs>
//         </svg>

//         <div style={{ flex: "0 0 55%", background: "transparent", position: "relative", zIndex: 10, display: "flex", alignItems: "center" }}>
//           <ResetPasswordForm userType={userType} />
//         </div>

//         <div style={{
//           flex: "1",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "20px"
//         }}>

//           <img
//             src={lockImage}
//             alt="Figma Lock Graphic"
//             style={{
//               width: "100%",
//               maxWidth: "260px", 
//               height: "auto",
//               objectFit: "contain",
//               marginLeft: "60px",
//               mixBlendMode: "darken"
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';

const C = {
  cardBg: "#FFFFFF",
  titleDark: "#111827",
  textGrey: "#4B5563",
  inputBg: "#F9FAFB",
  inputBorder: "#E5E7EB",
  labelColor: "#111827",
  btnFrom: "#D97706",
  btnTo: "#FBBF24",
  btnText: "#FFFFFF",
  blueLink: "#2563EB",
};

export default function ResetPasswordForm({ userType = "student" }) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    
    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      const url = userType === "student"
        ? 'http://localhost:3000/api/auth/resetpasswordStudent'
        : 'http://localhost:3000/api/auth/resetpasswordTeacher';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: newPassword })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage("Mot de passe réinitialisé avec succès !");
        setTimeout(() => navigate(userType === "student" ? "/student" : "/"), 3000);
      } else {
        setError(data.message || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <div style={{ color: "#DC2626" }}>Token manquant ou invalide</div>
      </div>
    );
  }

  return (
    <div style={{
      background: "transparent",
      padding: "40px 60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "100%",
      boxSizing: "border-box",
    }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        
        <h2 style={{ 
          fontSize: "36px", 
          fontWeight: 700, 
          color: C.titleDark, 
          margin: "0 0 16px 0", 
          letterSpacing: "-0.5px" 
        }}>
          New Password
        </h2>
        
        <p style={{ 
          fontSize: "15px", 
          color: "#6B7280", 
          margin: "0 0 40px 0", 
          lineHeight: "1.6" 
        }}>
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              fontSize: "14px", 
              fontWeight: 500, 
              color: C.textGrey, 
              display: "block", 
              marginBottom: "8px" 
            }}>
              New Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%", 
                  padding: "14px 44px",
                  background: C.inputBg, 
                  border: `1px solid ${C.inputBorder}`,
                  borderRadius: "8px", 
                  fontSize: "15px", 
                  outline: "none",
                  boxSizing: "border-box", 
                  color: "#111827"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", padding: 0
                }}
              >
                {showPassword ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ 
              fontSize: "14px", 
              fontWeight: 500, 
              color: C.textGrey, 
              display: "block", 
              marginBottom: "8px" 
            }}>
              Confirm Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%", 
                  padding: "14px 44px",
                  background: C.inputBg, 
                  border: `1px solid ${C.inputBorder}`,
                  borderRadius: "8px", 
                  fontSize: "15px", 
                  outline: "none",
                  boxSizing: "border-box", 
                  color: "#111827"
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", padding: 0
                }}
              >
                {showConfirm ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
              </button>
            </div>
          </div>

          {message && (
            <div style={{
              background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "8px",
              padding: "10px 14px", color: "#16A34A", fontSize: "13px", marginBottom: "16px"
            }}>
              {message}
            </div>
          )}
          
          {error && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px",
              padding: "10px 14px", color: "#DC2626", fontSize: "13px", marginBottom: "16px"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", 
              padding: "14px",
              background: `linear-gradient(to right, ${C.btnFrom}, ${C.btnTo})`,
              color: "#FFFFFF", 
              border: "none", 
              borderRadius: "8px",
              fontSize: "16px", 
              fontWeight: 600, 
              cursor: loading ? "not-allowed" : "pointer", 
              boxShadow: "0 4px 12px rgba(217, 119, 6, 0.2)",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button 
            type="button"
            onClick={() => navigate(userType === "student" ? "/student" : "/")}
            style={{ 
              background: "none", 
              border: "none", 
              color: "#111827", 
              fontSize: "14px", 
              fontWeight: 600, 
              cursor: "pointer"
            }}
          >
            Back to Login →
          </button>
        </div>
      </div>
    </div>
  );
}