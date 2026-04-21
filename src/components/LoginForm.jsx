
import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const C = {
  cardBg: "#FFFFFF",
  titleDark: "#111827",
  textGrey: "#4B5563",
  inputBg: "#F9FAFB",
  inputBorder: "#E5E7EB",
  labelColor: "#111827",
  esiBlue: "#131439",
  codeOrange: "#FF7512",
  btnFrom: "#BC790E",
  btnTo: "#FFC533",
  btnText: "#FFFFFF",
  blueLink: "#2563EB",
  dividerText: "#9CA3AF",
  dividerLine: "#E5E7EB",
  tabBg: "#DBEAFE",
  tabText: "#2563EB",
};

export default function LoginForm() {
  const navigate = useNavigate();
    const { login } = useAuth();  // ← AJOUTER CETTE LIGNE
  console.log('🔍 useAuth retourne:', { login });
  console.log('🔍 Type de login:', typeof login);  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [rememberMe, setRememberMe] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); 
  const [passwordError, setPasswordError] = useState(false); 
  const [emailError, setEmailError]=useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
// ========== ÉTATS POUR MAGIC LINK ==========
  const [showMagicLink, setShowMagicLink] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [magicLinkStatus, setMagicLinkStatus] = useState('');
  const [magicLinkLoading, setMagicLinkLoading] = useState(false);

  // ========== FONCTION MAGIC LINK ==========
  const sendMagicLink = async () => {
    if (!magicLinkEmail) {
      setMagicLinkStatus('Veuillez entrer votre email');
      return;
    }

    setMagicLinkLoading(true);
    setMagicLinkStatus('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
       // ========== AJOUTE CES 3 LIGNES ICI ==========
    console.log('🔗 1 - URL appelée:', `${API_URL}/api/auth/send-magic-link`);
    console.log('📧 2 - Email:', magicLinkEmail);
    console.log('🌍 3 - Environnement:', import.meta.env.MODE);
    // ============================================
      const response = await fetch(`${API_URL}/api/auth/send-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: magicLinkEmail })
      });
// ========== AJOUTE CETTE LIGNE ICI ==========
    console.log('📨 4 - Statut réponse:', response.status);
    // ============================================

      const data = await response.json();
 // ========== AJOUTE CETTE LIGNE ICI ==========
    console.log('📦 5 - Données reçues:', data);
    // ============================================
      if (response.ok) {
        setMagicLinkStatus('✅ Lien magique envoyé ! Vérifiez votre boîte mail.');
        setMagicLinkEmail('');
        setTimeout(() => setShowMagicLink(false), 3000);
      } else {
        setMagicLinkStatus('❌ ' + (data.message || 'Email non trouvé'));
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMagicLinkStatus('❌ Erreur de connexion au serveur');
    } finally {
      setMagicLinkLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  function validate() {
  setEmailError(false);
  setPasswordError(false);

  // Validation
  if (!email && !password) {
      
    setEmailError(true);
    setPasswordError(true);
    setError('Please enter your ESI email and password first');
    return false;
  }

  // Email check
  if (!email) {
    setEmailError(true);
    setError('Please enter your ESI email');
    return false;
  }

  if (!email.endsWith('@esi.dz')) {
    setEmailError(true);
    setError('Please use your ESI email (@esi.dz)');
    return false;
  }

  // Password check
  if (!password) {
    setPasswordError(true);
    setError('Please enter your password');
    return false;
  }

  if (password.length < 8) {
    setPasswordError(true);
    setError('Password must be at least 8 characters');
    return false;
  }

  return true;
}

//   const handleSubmit = async () => {
//   setError('');
//   if (!validate()) return;
//   setLoading(true);
//   try {
//     // const response = await fetch('https://69b53ac4be587338e7155b4b.mockapi.io/student');
//     // const students = await response.json();

//     const response = await fetch('http://localhost:3000/api/auth/loginStudent', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ email, password })
// });

//     const data = await response.json();

//     // const student = students.find(
//     //   (s) => s.email === email && s.password === password
//     // );

//     // if (student) {
//     //   alert('Login successful! Welcome ' + student.name);
//     // } else {
//     //   setError('Invalid email or password');
//     //   setEmailError(true);
//     //   setPasswordError(true);
//     // }
//     if (response.ok) {  // Au lieu de if (student)
//       alert('Login successful! Welcome ' + (data.name || 'Student'));
//       const realUserData = {
//           role: 'student',
//           id: data.user?.student_id || data.user?.esi_id,
//           // name: data.user.name,     
//              // ← Du backend
//  name: `${data.user?.first_name || ''} ${data.user?.last_name || ''}`.trim() || data.user?.email,
//              email: data.user.email,      // ← Du backend
//           avatar: data.user.initials || data.user.name?.charAt(0),
//           // toutes les autres données du backend
//         };
//          localStorage.setItem('user', JSON.stringify(realUserData));
//   localStorage.setItem('authToken', data.token || 'dummy');
//         login(realUserData);  // Stocke les vraies données
//         // navigate('/student/dashboard');
//  setTimeout(() => {
//     // navigate('/student/dashboard');
//     window.location.href = '/student/dashboard';

//   }, 100);
      
//     } else {
//       setError(data.message || 'Invalid email or password');
//       setEmailError(true);
//       setPasswordError(true);
//     }
  
//   } catch (err) {
//     setError('Connection error. Please try again.');
//   }
//   finally {
//     setLoading(false);
//   }
// };

//   const handleSocialLogin = (provider) => {
//     alert(provider + ' login');
//   };
const handleSubmit = async () => {
  setError('');
  if (!validate()) return;
  setLoading(true);
  
  console.log('🔐 1 - Début login');
  
  try {
    console.log('🔐 2 - Envoi requête...');
    const response = await fetch('http://localhost:3000/api/auth/loginStudent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    console.log('🔐 3 - Statut:', response.status);
    
    const data = await response.json();
    console.log('🔐 4 - Réponse data:', data);

    if (response.ok) {
      console.log('🔐 5 - Login OK');
      
      const realUserData = {
        role: 'student',
        id: data.user?.esi_id || data.user?.id,
        name: data.user?.first_name ? `${data.user.first_name} ${data.user.last_name || ''}` : (data.user?.name || email),
        email: data.user?.email || email,
      };
      
      console.log('🔐 6 - User data:', realUserData);
      
      localStorage.setItem('user', JSON.stringify(realUserData));
      localStorage.setItem('authToken', data.token || 'dummy');
      
      console.log('🔐 7 - Redirection...');
      window.location.href = '/student/dashboard';
      
    } else {
      console.log('🔐 8 - Login échoué:', data.message);
      setError(data.message || 'Invalid email or password');
      setEmailError(true);
      setPasswordError(true);
    }
  } catch (err) {
    console.error('🔐 9 - Erreur:', err);
    setError('Connection error. Please try again.');
  } finally {
    setLoading(false);
  }
};
  return (
    <div style={{
      background: "transparent",
      padding: "24px 32px 24px 64px",
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      boxSizing: "border-box",
    }}>
      <div style={{ width: "100%", maxWidth: "420px", margin: "auto 0" }}>
        
        <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
          <span style={{
            background: C.tabBg, color: C.tabText, padding: "6px 16px",
            borderRadius: "100px", fontSize: "13px", fontWeight: 600,
          }}>
            Student Login
          </span>
        </div>

        <h2 style={{ fontSize: "28px", fontWeight: 700, color: C.titleDark, margin: "0 0 12px 0", textAlign: "center" }}>
          Student login
        </h2>

        <p style={{ fontSize: "14px", color: C.textGrey, margin: "0 0 24px 0", textAlign: "center", lineHeight: "1.5" }}>
          Enter your credentials to access{" "}
          <span style={{ color: C.esiBlue, fontWeight: 700 }}>ESI</span>
          <span style={{ color: C.codeOrange, fontWeight: 700 }}>code</span>
          <span style={{ color: C.codeOrange, fontWeight: 700 }}>Hub</span>
        </p>

        <div style={{
          background: C.cardBg, borderRadius: "12px", padding: "24px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)", marginBottom: "14px",
        }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: C.labelColor, display: "block", marginBottom: "6px" }}>
            ESI Email <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative", marginBottom: "18px" }}>
            <Mail size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="email"
              placeholder="your.name@esi.dz"
              value={email}
             onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
              style={{
                width: "100%", padding: "10px 12px 10px 36px",
                background: C.inputBg, border: emailError ? "1px solid #DC2626" : "1px solid " + C.inputBorder,
                borderRadius: "8px", fontSize: "14px", outline: "none",
                boxSizing: "border-box", color: C.titleDark,
              }}
            />
          </div>

          <label style={{ fontSize: "13px", fontWeight: 600, color: C.labelColor, display: "block", marginBottom: "6px" }}>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative", marginBottom: "14px" }}>
            <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
              style={{
                width: "100%", padding: "10px 40px 10px 36px",background: C.inputBg,
                border: passwordError ? "1px solid #DC2626" : "1px solid " + C.inputBorder,
                borderRadius: "8px", fontSize: "14px", outline: "none",
                boxSizing: "border-box", color: C.titleDark,
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: 0,
              }}
            >
              {showPassword ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: C.textGrey, cursor: "pointer" }}>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Remember me
            </label>
            <span 
              onClick={() => navigate('/student/forgot-password')}
              style={{ fontSize: "13px", color: C.blueLink, cursor: "pointer", fontWeight: 500 }}
            >
              Forgot password?
            </span>
          </div>

          {error && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px",
              padding: "10px 14px", color: "#DC2626", fontSize: "13px", marginBottom: "16px",
            }}>
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <button
            onClick={handleSubmit} 
            style={{
              width: "100%", padding: "12px",
              background: "linear-gradient(to right, " + C.btnFrom + ", " + C.btnTo + ")",
              color: C.btnText, border: "none", borderRadius: "8px",
              fontSize: "15px", fontWeight: 600, cursor: "pointer", marginBottom: "18px",
            }}
          >
           {loading ? "Signing in..." : "Sign In"}
          </button>


{/* ========== SECTION MAGIC LINK ========== */}
        <div style={{ margin: "16px 0", textAlign: "center" }}>
          <button
            onClick={() => setShowMagicLink(!showMagicLink)}
            style={{
              background: "none",
              border: "none",
              color: "#4F46E5",
              cursor: "pointer",
              fontSize: "13px",
              textDecoration: "underline",
              fontWeight: 500
            }}
          >
            {showMagicLink ? "← Retour au formulaire" : "🔗 Connexion sans mot de passe"}
          </button>
        </div>

        {showMagicLink && (
          <div style={{
            background: "#F9FAFB",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            border: "1px solid #E5E7EB"
          }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 8px 0", color: "#111827" }}>
              Connexion par lien magique
            </h3>
            <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "16px" }}>
              Recevez un lien de connexion par email (sans mot de passe)
            </p>
            
            <input
              type="email"
              placeholder="Votre email @esi.dz"
              value={magicLinkEmail}
              onChange={(e) => setMagicLinkEmail(e.target.value)}
              disabled={magicLinkLoading}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: "14px",
                marginBottom: "12px",
                boxSizing: "border-box"
              }}
            />
            
            <button
              onClick={sendMagicLink}
              disabled={magicLinkLoading}
              style={{
                width: "100%",
                padding: "10px",
                background: "linear-gradient(to right, #BC790E, #FFC533)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: magicLinkLoading ? "not-allowed" : "pointer",
                opacity: magicLinkLoading ? 0.7 : 1
              }}
            >
              {magicLinkLoading ? "Envoi en cours..." : "📧 M'envoyer le lien magique"}
            </button>
            
            {magicLinkStatus && (
              <p style={{
                marginTop: "12px",
                fontSize: "12px",
                textAlign: "center",
                color: magicLinkStatus.includes("✅") ? "#10B981" : "#EF4444"
              }}>
                {magicLinkStatus}
              </p>
            )}
          </div>
        )}
        {/* ========== FIN MAGIC LINK ========== */}


          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ flex: 1, height: "1px", background: C.dividerLine }} />
            <span style={{ fontSize: "11px", color: C.dividerText, whiteSpace: "nowrap" }}>
              OR CONTINUE WITH
            </span>
            <div style={{ flex: 1, height: "1px", background: C.dividerLine }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" }}>
            <button onClick={() => handleSocialLogin('Google')} style={{ padding: "10px", border: "1px solid " + C.inputBorder, borderRadius: "8px", background: C.cardBg, cursor: "pointer", fontSize: "14px", fontWeight: 500, color: C.titleDark, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <FaGoogle size={18} />
              Google
            </button>
            <button onClick={() => handleSocialLogin('GitHub')} style={{ padding: "10px", border: "1px solid " + C.inputBorder, borderRadius: "8px", background: C.cardBg, cursor: "pointer", fontSize: "14px", fontWeight: 500, color: C.titleDark, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <FaGithub size={18} />
              GitHub
            </button>
          </div>

          <p style={{ textAlign: "center", fontSize: "13px", color: C.textGrey, margin: 0 }}>
            Don't have an account?{" "}
            <span 
            onClick={() => navigate('/student/register')}
            style={{ color: C.blueLink, fontWeight: 600, cursor: "pointer" }}>
              Register as a student
            </span>
          </p>
        </div>

        <div style={{
          background: "#F0F6FF",
          borderRadius: "12px",
          padding: "16px",
          marginTop: "16px",
        }}>
          <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 6px 0" }}>
            Need Help?
          </h4>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "0 0 16px 0", lineHeight: 1.5 }}>
            Having trouble signing in? Contact our support team for assistance.
          </p>
          <button style={{
            width: "100%", padding: "10px",
            background: "white", border: "1px solid #D1D5DB",
            borderRadius: "8px", fontSize: "13px", fontWeight: 600,
            color: "#3B82F6", cursor: "pointer",
          }}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
