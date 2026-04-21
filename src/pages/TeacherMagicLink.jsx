// // src/pages/TeacherMagicLink.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function TeacherMagicLink() {
//   const [email, setEmail] = useState('');
//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const sendMagicLink = async () => {
//     if (!email) {
//       setStatus('Veuillez entrer votre email');
//       return;
//     }

//     setLoading(true);
//     setStatus('');

//     try {
//       const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
//       const response = await fetch(`${API_URL}/api/auth/teacher/send-magic-link`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatus('✅ Lien magique envoyé ! Vérifiez votre boîte mail.');
//         setEmail('');
//       } else {
//         setStatus('❌ ' + (data.message || 'Email non trouvé'));
//       }
//     } catch (error) {
//       setStatus('❌ Erreur de connexion au serveur');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '100px' }}>
//       <h2>Connexion enseignant par lien magique</h2>
//       <div style={{ marginTop: '20px' }}>
//         <input
//           type="email"
//           placeholder="votre.email@esi.dz"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ padding: '10px', width: '300px', marginRight: '10px' }}
//         />
//         <button
//           onClick={sendMagicLink}
//           disabled={loading}
//           style={{ padding: '10px 20px', cursor: 'pointer' }}
//         >
//           {loading ? 'Envoi...' : '📧 Envoyer le lien magique'}
//         </button>
//       </div>
//       {status && <p style={{ marginTop: '20px', color: status.includes('✅') ? 'green' : 'red' }}>{status}</p>}
//       <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>← Retour</button>
//     </div>
//   );
// }

// src/pages/TeacherMagicLink.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherMagicLink() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendMagicLink = async () => {
    if (!email) {
      setStatus('Veuillez entrer votre email');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${API_URL}/api/auth/teacher/send-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('✅ Lien magique envoyé ! Vérifiez votre boîte mail.');
        setEmail('');
      } else {
        setStatus('❌ ' + (data.message || 'Email non trouvé'));
      }
    } catch (error) {
      setStatus('❌ Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffff",
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
        {/* Panneau gauche - identique au student */}
        <div style={{
          background: "linear-gradient(135deg, #131439 0%, #1a1f4e 100%)",
          padding: "48px 32px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>
            Welcome to <span style={{ color: "#FF7512" }}>ESI</span>codeHub
          </h1>
          <p style={{ fontSize: "16px", opacity: 0.9, marginBottom: "40px", lineHeight: 1.6 }}>
            The academic platform built for ESI students. Upload code, receive peer feedback, and collaborate honestly.
          </p>
          
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{ fontSize: "24px" }}>🔗</div>
              <div>
                <h3 style={{ fontSize: "18px", marginBottom: "4px" }}>Connexion par lien magique</h3>
                <p style={{ fontSize: "14px", opacity: 0.8 }}>Recevez un lien par email pour vous connecter instantanément</p>
              </div>
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "20px",
            marginTop: "20px"
          }}>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>🔒 Secure Authentication</h4>
            <p style={{ fontSize: "13px", opacity: 0.8, marginBottom: "16px" }}>
              Login with your ESI.dz email for secure access to your account
            </p>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>👥 Join the Community</h4>
            <p style={{ fontSize: "13px", opacity: 0.8, marginBottom: "16px" }}>
              Connect with 500+ ESI students and collaborate on code
            </p>
            <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>❓ Need Help?</h4>
            <p style={{ fontSize: "13px", opacity: 0.8 }}>
              Having trouble signing in? Contact our support team for assistance.
            </p>
          </div>
        </div>

        {/* Panneau droit - formulaire magic link */}
        <div style={{
          background: "white",
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <div style={{ maxWidth: "420px", margin: "0 auto", width: "100%" }}>
            <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
              <span style={{
                background: "#DBEAFE",
                color: "#2563EB",
                padding: "6px 16px",
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 600,
              }}>
                Teacher Magic Link
              </span>
            </div>

            <h2 style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 12px 0",
              textAlign: "center"
            }}>
              Connexion par lien magique
            </h2>

            <p style={{
              fontSize: "14px",
              color: "#4B5563",
              margin: "0 0 32px 0",
              textAlign: "center",
              lineHeight: "1.5"
            }}>
              Recevez un lien de connexion par email (sans mot de passe)
            </p>

            <div style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            }}>
              <label style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#111827",
                display: "block",
                marginBottom: "6px"
              }}>
                Teacher Email <span style={{ color: "red" }}>*</span>
              </label>
              
              <input
                type="email"
                placeholder="your.name@esi.dz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "14px",
                  marginBottom: "20px",
                  boxSizing: "border-box",
                  background: "#F9FAFB"
                }}
              />

              <button
                onClick={sendMagicLink}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "linear-gradient(to right, #BC790E, #FFC533)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  marginBottom: "18px"
                }}
              >
                {loading ? "Envoi en cours..." : "📧 M'envoyer le lien magique"}
              </button>

              {status && (
                <p style={{
                  marginTop: "12px",
                  fontSize: "13px",
                  textAlign: "center",
                  color: status.includes("✅") ? "#10B981" : "#EF4444"
                }}>
                  {status}
                </p>
              )}

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                  onClick={() => navigate('/')}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#4B5563",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 500,
                    textDecoration: "underline"
                  }}
                >
                  ← Retour à l'accueil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}