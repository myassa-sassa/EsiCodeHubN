// import TeacherLeftPanel from '../components/LeftPanelTeacher';
// import TeacherLoginForm from '../components/LoginFormTeacher';
// import { useState } from 'react';  // ← 1. AJOUTER CET IMPORT

// export default function TeacherLoginPage() {
//    const [showMagicLink, setShowMagicLink] = useState(false);
//   const [magicLinkEmail, setMagicLinkEmail] = useState('');
//   const [magicLinkStatus, setMagicLinkStatus] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//  // ← 3. AJOUTER CETTE FONCTION
//   const sendMagicLink = async () => {
//     if (!magicLinkEmail) {
//       setMagicLinkStatus('Veuillez entrer votre email');
//       return;
//     }

//     setIsLoading(true);
//     setMagicLinkStatus('');

//     try {
//       const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
//       const response = await fetch(`${API_URL}/api/auth/teacher/send-magic-link`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: magicLinkEmail })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMagicLinkStatus('✅ Lien magique envoyé ! Vérifiez votre boîte mail.');
//         setMagicLinkEmail('');
//         setTimeout(() => setShowMagicLink(false), 3000);
//       } else {
//         setMagicLinkStatus('❌ ' + (data.message || 'Email non trouvé'));
//       }
//     } catch (error) {
//       setMagicLinkStatus('❌ Erreur de connexion au serveur');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",  
//       background:"#ffff",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "24px",
//       fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       boxSizing: "border-box",
//     }}>
//       <div style={{
//         width: "100%",
//         maxWidth: "1100px",
//         background: "#FFFFFF",
//         borderRadius: "24px",
//         boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
//         overflow: "hidden",
//         display: "grid",
//         gridTemplateColumns: "1fr 1.1fr",
//         minHeight: "600px",
//         background: "linear-gradient(135deg, #F0F4F8 0%, #D9E2EC 100%)",
//       }}>
//         <TeacherLeftPanel />
//          <div style={{ padding: "40px", background: "white" }}>
//           <TeacherLoginForm />
          
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <button
//               onClick={() => setShowMagicLink(!showMagicLink)}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#4F46E5",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 fontWeight: "500",
//                 textDecoration: "underline"
//               }}
//             >
//               {showMagicLink ? "← Retour au formulaire" : "🔗 Connexion sans mot de passe"}
//             </button>
//           </div>
          
//           {showMagicLink && (
//             <div style={{
//               marginTop: "20px",
//               padding: "20px",
//               background: "#F9FAFB",
//               borderRadius: "12px",
//               border: "1px solid #E5E7EB"
//             }}>
//               <input
//                 type="email"
//                 placeholder="votre.email@esi.dz"
//                 value={magicLinkEmail}
//                 onChange={(e) => setMagicLinkEmail(e.target.value)}
//                 disabled={isLoading}
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   border: "1px solid #D1D5DB",
//                   borderRadius: "8px",
//                   fontSize: "14px",
//                   marginBottom: "12px",
//                   boxSizing: "border-box"
//                 }}
//               />
//               <button
//                 onClick={sendMagicLink}
//                 disabled={isLoading}
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   background: "#4F46E5",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontSize: "14px",
//                   cursor: isLoading ? "not-allowed" : "pointer"
//                 }}
//               >
//                 {isLoading ? "Envoi..." : "📧 M'envoyer le lien magique"}
//               </button>
//               {magicLinkStatus && (
//                 <p style={{
//                   marginTop: "12px",
//                   fontSize: "13px",
//                   textAlign: "center",
//                   color: magicLinkStatus.includes("✅") ? "green" : "red"
//                 }}>
//                   {magicLinkStatus}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//         <TeacherLoginForm />
//       </div>
//     </div>
//   );
// }

import TeacherLeftPanel from '../components/LeftPanelTeacher';
import TeacherLoginForm from '../components/LoginFormTeacher';
import { useState } from 'react';

export default function TeacherLoginPage() {
  const [showMagicLink, setShowMagicLink] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [magicLinkStatus, setMagicLinkStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMagicLink = async () => {
    if (!magicLinkEmail) {
      setMagicLinkStatus('Veuillez entrer votre email');
      return;
    }

    setIsLoading(true);
    setMagicLinkStatus('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${API_URL}/api/auth/teacher/send-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: magicLinkEmail })
      });

      const data = await response.json();

      if (response.ok) {
        setMagicLinkStatus('✅ Lien magique envoyé ! Vérifiez votre boîte mail.');
        setMagicLinkEmail('');
        setTimeout(() => setShowMagicLink(false), 3000);
      } else {
        setMagicLinkStatus('❌ ' + (data.message || 'Email non trouvé'));
      }
    } catch (error) {
      setMagicLinkStatus('❌ Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",  
      background:"#ffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      boxSizing: "border-box",
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
        <TeacherLeftPanel />
        
        <div style={{ padding: "40px", background: "white" }}>
          
          {/* ========== UN SEUL FORMULAIRE À LA FOIS ========== */}
          {!showMagicLink ? (
            // Cas 1: Formulaire normal (connexion par mot de passe)
            <>
              <TeacherLoginForm />
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                  onClick={() => setShowMagicLink(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#4F46E5",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    textDecoration: "underline"
                  }}
                >
                  🔗 Connexion sans mot de passe
                </button>
              </div>
            </>
          ) : (
            // Cas 2: Formulaire magic link
            <div>
              <h2 style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}>
                Connexion par lien magique
              </h2>
              <div style={{
                background: "#F9FAFB",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #E5E7EB"
              }}>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px", textAlign: "center" }}>
                  Recevez un lien de connexion par email (sans mot de passe)
                </p>
                
                <input
                  type="email"
                  placeholder="votre.email@esi.dz"
                  value={magicLinkEmail}
                  onChange={(e) => setMagicLinkEmail(e.target.value)}
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "14px",
                    marginBottom: "12px",
                    boxSizing: "border-box"
                  }}
                />
                
                <button
                  onClick={sendMagicLink}
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "linear-gradient(to right, #BC790E, #FFC533)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: isLoading ? "not-allowed" : "pointer"
                  }}
                >
                  {isLoading ? "Envoi en cours..." : "📧 M'envoyer le lien magique"}
                </button>
                
                {magicLinkStatus && (
                  <p style={{
                    marginTop: "12px",
                    fontSize: "13px",
                    textAlign: "center",
                    color: magicLinkStatus.includes("✅") ? "#10B981" : "#EF4444"
                  }}>
                    {magicLinkStatus}
                  </p>
                )}
                
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button
                    onClick={() => setShowMagicLink(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#666",
                      cursor: "pointer",
                      fontSize: "13px",
                      textDecoration: "underline"
                    }}
                  >
                    ← Retour au formulaire de connexion
                  </button>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}