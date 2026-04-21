import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [TeacherEmail, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [rememberMe, setRememberMe] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); 
  const [passwordError, setPasswordError] = useState(false); 
  const [emailError, setEmailError]=useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
  if (!TeacherEmail && !password) {
    setEmailError(true);
    setPasswordError(true);
    setError('Please enter your ESI email and password first');
    return false;
  }

  // Email check
  if (!TeacherEmail) {
    setEmailError(true);
    setError('Please enter your ESI email');
    return false;
  }

  if (!TeacherEmail.endsWith('@esi.dz')) {
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

const handleSubmit = async () => {
  setError('');
  if (!validate()) return;
  setLoading(true);
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/loginTeacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TeacherEmail,
        password: password
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert('Login successful! Welcome ' + (data.teacher?.first_name || 'Teacher'));
      // Stocker le token si besoin
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      // navigate('/teacher'); // Rediriger vers la page teacher
   navigate('/teacher/dashboard');  } else {
      setError(data.message || 'Invalid email or password');
      setEmailError(true);
      setPasswordError(true);
    }
  } catch (err) {
    console.error('Erreur:', err);
    setError('Connection error. Please try again.');
  } finally {
    setLoading(false);
  }
};
//   const handleSubmit = async () => {
//   setError('');
//   if (!validate()) return;
//   setLoading(true);
  
//   try {
//     const response = await fetch("https://69b53ac4be587338e7155b4b.mockapi.io/teacher");
//     const teachers = await response.json();
//     const teacher = teachers.find(
//       (s) => s.email === TeacherEmail && s.password === password
//     );

//     if (teacher) {
//       alert('Login successful! Welcome ' + teacher.name);
//     } else {
//       setError('Invalid email or password');
//       setEmailError(true);
//       setPasswordError(true);
//     }
//   } catch (err) {
//     setError('Connection error. Please try again.');
//   }finally {
//     setLoading(false);
//   }
// };

  const handleSocialLogin = (provider) => {
    alert(provider + ' login');
  };

  return (
    <div style={{
      background: "transparent",
      padding: "24px",
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
            Teacher Login
          </span>
        </div>

        <h2 style={{ fontSize: "28px", fontWeight: 700, color: C.titleDark, margin: "0 0 12px 0", textAlign: "center" }}>
          Teacher login
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
          {/* Email */}
          <label style={{ fontSize: "13px", fontWeight: 600, color: C.labelColor, display: "block", marginBottom: "6px" }}>
            Teacher Email <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative", marginBottom: "18px" }}>
            <Mail size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="email"
              placeholder="your.name@esi.dz"
              value={TeacherEmail}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%", padding: "10px 12px 10px 36px",
                background: C.inputBg, border: emailError ? "1px solid #DC2626" : "1px solid " + C.inputBorder,
                borderRadius: "8px", fontSize: "14px", outline: "none",
                boxSizing: "border-box", color: C.titleDark,
              }}
            />
          </div>

          {/* Password */}
          <label style={{ fontSize: "13px", fontWeight: 600, color: C.labelColor, display: "block", marginBottom: "6px" }}>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative", marginBottom: "14px" }}>
            <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%", padding: "10px 40px 10px 36px",
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

          {/* Remember me & Forgot password */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: C.textGrey, cursor: "pointer" }}>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Remember me
            </label>
            <span 
              onClick={() => navigate('/forgot-password')}
              style={{ fontSize: "13px", color: C.blueLink, cursor: "pointer", fontWeight: 500 }}
            >
              Forgot password?
            </span>
          </div>
          
          <div style={{ display: "flex",  alignItems: "flex-start", gap:"10px",background:"#EFF6FF",border:"1px solid#DBEAFE",borderRadius:"10px",padding:"14px 16px",marginBottom:"20px"}}>
             <Shield size={18} color="#2563EB" style={{ flexShrink: 0, marginTop: "2px" }} />
  
              <p style={{fontSize :"13px",color:"#2563EB",margin:0, lineHeight: 1.6,}}>
                This is a secure teacher portal. Your credentials are encrypted and protected.
              </p>
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
           disabled={loading}
            style={{
              width: "100%", padding: "12px",
              background: "linear-gradient(to right, " + C.btnFrom + ", " + C.btnTo + ")",
              color: C.btnText, border: "none", borderRadius: "8px",
              fontSize: "15px", fontWeight: 600, cursor: "pointer", marginBottom: "18px",opacity: loading ? 0.7 : 1,

            }}
            >{loading ? "Signing in..." : "Sign In"}
          </button>
          <div style={{ textAlign: "center", marginBottom: "18px" }}>
  <button
    onClick={() => navigate('/teacher/magic-link')}
    style={{
      background: "none",
      border: "none",
      color: "#4F46E5",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500",
      textDecoration: "underline"
    }}
  >
    🔗 Connexion sans mot de passe
  </button>
</div>

          {/* OR divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ flex: 1, height: "1px", background: C.dividerLine }} />
            <span style={{ fontSize: "11px", color: C.dividerText, whiteSpace: "nowrap" }}>
              OR Login with 
            </span>
            <div style={{ flex: 1, height: "1px", background: C.dividerLine }} />
          </div>

          {/* Social buttons */}
          <div style={{ width:"100%", marginBottom: "18px" }}>
            <button style={{
              width: "100%", padding: "10px",
               border: "1px solid " + C.inputBorder,
               borderRadius: "8px", background: C.cardBg,
               cursor: "pointer", fontSize: "14px", fontWeight: 500,
               color: C.titleDark, display: "flex",
               alignItems: "center", justifyContent: "center", gap: "8px",whiteSpace: "nowrap",
               }}>
                <span style={{ fontSize: "15px",fontWeight: 700, color: "#000000", }}>
                  G
                </span>
                ESI Google Workspace
            </button>
          </div>

          {/* Register link */}
          <p style={{ textAlign: "center", fontSize: "13px", color: C.textGrey, margin: 0 }}>
            First Time here ?{" "}
            <span
            onClick={() => navigate('/teacher/register')
}
            style={{ color: C.blueLink, fontWeight: 600, cursor: "pointer" }}>
              Register as a Teacher
            </span>
          </p>
        </div>

        {/* Need Help card */}
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