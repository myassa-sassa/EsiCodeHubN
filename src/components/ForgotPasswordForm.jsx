// import  { useState } from 'react';
// import { Mail } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const C = {
//   cardBg: "#FFFFFF",
//   titleDark: "#001246",
//   textGrey: "#4B5563",
//   inputBg: "#FFFFFF",
//   inputBorder: "#94A3B8",
//   errorColor: "#EF4444",
//   successBg: "#F0FDF4",
//   successText: "#16A34A",
//   iconColor: "#5D5FEF",
//   btnFrom: "#D97706",
//   btnTo: "#FBBF24",
//   btnText: "#FFFFFF",
// };

// export default function ForgotPasswordForm({ userType = "student" }) {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');

//   const validate = () => {
//     if (!email) {
//       setError("Email address is required");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }
//     if (!email.toLowerCase().endsWith("@esi.dz")) {
//       setError("Please use your ESI email address (@esi.dz)");
//       return false;
//     }
//     setError('');
//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const sentPath = userType === "student" 
//         // ? "/student/forgot-password/sent" 
//         // : "/forgot-password/sent";
//  ? 'http://localhost:3000/api/auth/forgot-password-student'
//         : 'http://localhost:3000/api/auth/forgot-password-teacher';

//          const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         // Navigation vers la page de confirmation
//         const sentPath = userType === "student" 
//           ? "/student/forgot-password/sent" 
//           : "/forgot-password/sent";
//         navigate(sentPath);
//     }
//   };

//   const loginPath = userType === "student" ? "/student" : "/";

//   return (
//     <div style={{
//       background: "transparent",
//       padding: "40px 60px", 
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center", 
//       minHeight: "100%",
//       boxSizing: "border-box",
//     }}>
//       <div style={{ width: "100%", maxWidth: "400px" }}>
        
//         <h2 style={{ 
//           fontSize: "36px", 
//           fontWeight: 700, 
//           color: C.titleDark, 
//           margin: "0 0 16px 0", 
//           letterSpacing: "-0.5px" 
//         }}>
//           Forgot Password?
//         </h2>
        
//         <p style={{ 
//           fontSize: "15px", 
//           color: "#6B7280", 
//           margin: "0 0 40px 0", 
//           lineHeight: "1.6" 
//         }}>
//           Enter your email address and we'll send you a reset link
//         </p>

//         <form onSubmit={handleSubmit}>
          
//           <div style={{ marginBottom: "32px" }}>
//             <label style={{ 
//               fontSize: "14px", 
//               fontWeight: 500, 
//               color: C.textGrey, 
//               display: "block", 
//               marginBottom: "8px" 
//             }}>
//               ESI Mail <span style={{ color: C.errorColor }}>*</span>
//             </label>
            
//             <div style={{ position: "relative" }}>
//               <Mail size={16} color={error ? C.errorColor : C.iconColor} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
//               <input
//                 type="text"
//                 placeholder="@esi.dz"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   if (error) setError('');
//                 }}
//                 style={{
//                   width: "100%", 
//                   padding: "14px 14px 14px 44px",
//                   background: C.inputBg, 
//                   border: `1px solid ${error ? C.errorColor : C.inputBorder}`,
//                   borderRadius: "8px", 
//                   fontSize: "15px", 
//                   outline: "none",
//                   boxSizing: "border-box", 
//                   color: "#111827",
//                   transition: "all 0.2s ease"
//                 }}
//                 onFocus={(e) => {
//                   if (!error) e.target.style.border = `1px solid ${C.iconColor}`;
//                 }}
//                 onBlur={(e) => {
//                   if (!error) e.target.style.border = `1px solid ${C.inputBorder}`;
//                 }}
//               />
//             </div>
//             {error && (
//               <p style={{ color: C.errorColor, fontSize: "12px", marginTop: "6px", margin: 0 }}>
//                 {error}
//               </p>
//             )}
//           </div>

//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <button
//               type="submit"
//               style={{
//                 width: "220px", 
//                 padding: "12px",
//                 background: `linear-gradient(to right, ${C.btnFrom}, ${C.btnTo})`,
//                 color: "#FFFFFF", 
//                 border: "none", 
//                 borderRadius: "8px",
//                 fontSize: "16px", 
//                 fontWeight: 600, 
//                 cursor: "pointer", 
//                 boxShadow: "0 4px 12px rgba(217, 119, 6, 0.2)",
//                 transition: "all 0.2s ease"
//               }}
//               onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
//               onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
//             >
//               Send Reset Link
//             </button>
//           </div>
//         </form>

//         <div style={{ textAlign: "center", marginTop: "24px" }}>
//           <button 
//             type="button"
//             onClick={() => navigate(loginPath)}
//             style={{ 
//               background: "none", 
//               border: "none", 
//               color: "#111827", 
//               fontSize: "14px", 
//               fontWeight: 600, 
//               cursor: "pointer", 
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "8px"
//             }}
//           >
//             Back to Login <span style={{ fontSize: "16px" }}>→</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const C = {
  cardBg: "#FFFFFF",
  titleDark: "#001246",
  textGrey: "#4B5563",
  inputBg: "#FFFFFF",
  inputBorder: "#94A3B8",
  errorColor: "#EF4444",
  successBg: "#F0FDF4",
  successText: "#16A34A",
  iconColor: "#5D5FEF",
  btnFrom: "#D97706",
  btnTo: "#FBBF24",
  btnText: "#FFFFFF",
};

export default function ForgotPasswordForm({ userType = "student" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ← AJOUTER CETTE LIGNE

  const validate = () => {
    if (!email) {
      setError("Email address is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!email.toLowerCase().endsWith("@esi.dz")) {
      setError("Please use your ESI email address (@esi.dz)");
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {  // ← AJOUTER "async"
    e.preventDefault();
    if (validate()) {
      setLoading(true);  // ← AJOUTER
      setError('');      // ← AJOUTER
      
      try {  // ← AJOUTER try/catch
        // Choisir l'URL selon le type d'utilisateur
        const url = userType === "student" 
          ? 'http://localhost:3000/api/auth/forgotpasswordStudent'
          : 'http://localhost:3000/api/auth/forgotpasswordTeacher';
        
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Navigation vers la page de confirmation
          const sentPath = userType === "student" 
            ? "/student/forgot-password/sent" 
            : "/forgot-password/sent";
          navigate(sentPath);
        } else {
          setError(data.message || "Une erreur est survenue");
        }
      } catch (err) {
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);  // ← AJOUTER
      }
    }
  };

  const loginPath = userType === "student" ? "/student" : "/";

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
          Forgot Password?
        </h2>
        
        <p style={{ 
          fontSize: "15px", 
          color: "#6B7280", 
          margin: "0 0 40px 0", 
          lineHeight: "1.6" 
        }}>
          Enter your email address and we'll send you a reset link
        </p>

        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: "32px" }}>
            <label style={{ 
              fontSize: "14px", 
              fontWeight: 500, 
              color: C.textGrey, 
              display: "block", 
              marginBottom: "8px" 
            }}>
              ESI Mail <span style={{ color: C.errorColor }}>*</span>
            </label>
            
            <div style={{ position: "relative" }}>
              <Mail size={16} color={error ? C.errorColor : C.iconColor} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="@esi.dz"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                style={{
                  width: "100%", 
                  padding: "14px 14px 14px 44px",
                  background: C.inputBg, 
                  border: `1px solid ${error ? C.errorColor : C.inputBorder}`,
                  borderRadius: "8px", 
                  fontSize: "15px", 
                  outline: "none",
                  boxSizing: "border-box", 
                  color: "#111827",
                  transition: "all 0.2s ease"
                }}
                onFocus={(e) => {
                  if (!error) e.target.style.border = `1px solid ${C.iconColor}`;
                }}
                onBlur={(e) => {
                  if (!error) e.target.style.border = `1px solid ${C.inputBorder}`;
                }}
              />
            </div>
            {error && !loading && (  // ← MODIFIER pour ne pas afficher l'erreur pendant le chargement
              <p style={{ color: C.errorColor, fontSize: "12px", marginTop: "6px", margin: 0 }}>
                {error}
              </p>
            )}
          </div>

          {/* Afficher les erreurs API */}
          {error && error !== "Email address is required" && error !== "Please enter a valid email address" && error !== "Please use your ESI email address (@esi.dz)" && (
            <div style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "8px",
              padding: "10px 14px",
              color: "#DC2626",
              fontSize: "13px",
              marginBottom: "16px"
            }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              disabled={loading}  // ← AJOUTER disabled
              style={{
                width: "220px", 
                padding: "12px",
                background: `linear-gradient(to right, ${C.btnFrom}, ${C.btnTo})`,
                color: "#FFFFFF", 
                border: "none", 
                borderRadius: "8px",
                fontSize: "16px", 
                fontWeight: 600, 
                cursor: loading ? "not-allowed" : "pointer",  // ← MODIFIER
                boxShadow: "0 4px 12px rgba(217, 119, 6, 0.2)",
                opacity: loading ? 0.7 : 1,  // ← AJOUTER
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => {
                if (!loading) e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseOut={(e) => {
                if (!loading) e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {loading ? "Envoi en cours..." : "Send Reset Link"}  {/* ← MODIFIER */}
            </button>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button 
            type="button"
            onClick={() => navigate(loginPath)}
            style={{ 
              background: "none", 
              border: "none", 
              color: "#111827", 
              fontSize: "14px", 
              fontWeight: 600, 
              cursor: "pointer", 
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            Back to Login <span style={{ fontSize: "16px" }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}