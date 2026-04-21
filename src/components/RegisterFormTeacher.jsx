import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
  dividerLine: "#E5E7EB",
  tabBg: "#DBEAFE",
  tabText: "#2563EB",
};

export default function RegisterForm() {
  const navigate = useNavigate(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [teacherIdError, setTeacherIdError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  function validate() {
    setEmailError(false);
    setPasswordError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setTeacherIdError(false);

  if (!firstName && !lastName && !email && !password  && !teacherId) {
    setFirstNameError(true);
    setLastNameError(true);
    setEmailError(true);
    setPasswordError(true);
    setTeacherIdError(true);
    setError('Please fill in all your coordinates');
    return false;
  }

    if (!firstName) {
      setFirstNameError(true);
      setError('Please enter your first name');
      return false;
    }
    if (!lastName) {
      setLastNameError(true);
      setError('Please enter your last name');
      return false;
    }
    if (!email || !email.endsWith('@esi.dz')) {
      setEmailError(true);
      setError('Please use your ESI email (@esi.dz)');
      return false;
    }
    if (!password || password.length < 8) {
      setPasswordError(true);
      setError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
      setError('Passwords do not match');
      return false;
    }
    if (!agreed) {
      setError('Please agree to the Terms of Service');
      return false;
    }
     if (!teacherId) { 
        setTeacherIdError(true);
         setError('Please enter your  ID'); 
         return false; 
        }
    return true;
  }

  const handleSubmit = async () => {
    setError('');
    if (!validate()) return;
    setLoading(true);
    const dataToSend = {
    first_name: firstName,
    last_name: lastName,
    teacher_id: teacherId,
    email: email,
    password: password
  };
  console.log('📝 [FRONTEND] Données envoyées:', dataToSend);
    try {
    //   const response = await fetch('https://69b53ac4be587338e7155b4b.mockapi.io/teacher', {
        const response = await fetch('http://localhost:3000/api/auth/registerTeacher', {
   
    method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        //   name: firstName + ' ' + lastName,
                first_name: firstName,     // ← changé : envoie first_name
            last_name: lastName,      // ← changé : envoie last_name
          email,
        //   teacherId,
                teacher_id: teacherId,     // ← changé : teacher_id au lieu de teacherId

          password,
        }  
      ),
      });
      if (response.ok) {
        alert('Account created! Welcome ' + firstName);
      //  navigate('/teacher');
      navigate('/teacher/login');

      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px 10px 36px",
    background: C.inputBg, border: "1px solid " + C.inputBorder,
    borderRadius: "8px", fontSize: "14px", outline: "none",
    boxSizing: "border-box", color: C.titleDark,
  };

  const labelStyle = {
    fontSize: "13px", fontWeight: 600, color: C.labelColor,
    display: "block", marginBottom: "6px"
  };
  return (
    <div style={{
      background: "transparent",
      padding: "24px 32px 24px 48px",
      display: "flex", flexDirection: "column",
      minHeight: "100%", boxSizing: "border-box",
      overflowY: "auto",
    }}>
      <div style={{ width: "100%", maxWidth: "480px", margin: "auto 0" }}>

        {/* Badge */}
        <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
          <span style={{
            background: C.tabBg, color: C.tabText, padding: "6px 16px",
            borderRadius: "100px", fontSize: "13px", fontWeight: 600,
          }}>
            Teacher Portal
          </span>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: C.titleDark, margin: "0 0 8px 0", textAlign: "center" }}>
          Teacher Registration
        </h2>
        <p style={{ fontSize: "14px", color: C.textGrey, margin: "0 0 24px 0", textAlign: "center", lineHeight: "1.5" }}>
          Join{" "}
          <span style={{ color: C.esiBlue, fontWeight: 700 }}>ESI</span>
          <span style={{ color: C.codeOrange, fontWeight: 700 }}>code</span>
          <span style={{ color: C.codeOrange, fontWeight: 700 }}>Hub</span>
          {" "}and start managing your courses
        </p>

        {/* Form card */}
        <div style={{
          background: C.cardBg, borderRadius: "12px", padding: "24px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)", marginBottom: "14px",
        }}>

        {/* First Name + Last Name */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
    <div>
      <label style={labelStyle}>First Name</label>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value); setFirstNameError(false); }}
          style={{ ...inputStyle,padding: "10px 12px", border: firstNameError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
        />
      </div>
    </div>
    <div>
      <label style={labelStyle}>Last Name</label>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => { setLastName(e.target.value); setLastNameError(false); }}
          style={{ ...inputStyle,padding: "10px 12px", border: lastNameError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
        />
      </div>
    </div>
  </div>

  {/* Email */}
  <label style={labelStyle}>Teacher Email</label>
  <div style={{ position: "relative", marginBottom: "16px" }}>
    <Mail size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
    <input
      type="email"
      placeholder="teacher@esi.dz"
      value={email}
      onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
      style={{ ...inputStyle, border: emailError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
    />
  </div>

  {/* teacher ID  */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
    <div>
      <label style={labelStyle}>Teacher ID</label>
      <div style={{ position: "relative" }}>
         <input
          type="text"
          placeholder="ESI-T-12345"
          value={teacherId}
          onChange={(e) => { setTeacherId(e.target.value); setTeacherIdError(false); }}
  style={{ ...inputStyle,padding: "10px 12px", border: teacherIdError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
/>
      </div>
    </div>
    
  </div>

  

  {/* Password */}
  <label style={labelStyle}>Password</label>
  <div style={{ position: "relative", marginBottom: "16px" }}>
    <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Create a strong password"
      value={password}
      onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
      style={{ ...inputStyle, padding: "10px 40px 10px 36px", border: passwordError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
    />
    <button onClick={() => setShowPassword(!showPassword)}
      style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
      {showPassword ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
    </button>
  </div>

  {/* Confirm Password */}
  <label style={labelStyle}>Confirm Password</label>
  <div style={{ position: "relative", marginBottom: "20px" }}>
    <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
    <input
      type={showConfirm ? "text" : "password"}
      placeholder="Re-enter your password"
      value={confirmPassword}
      onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(false); }}
      style={{ ...inputStyle, padding: "10px 40px 10px 36px", border: passwordError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
    />
    <button onClick={() => setShowConfirm(!showConfirm)}
      style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
      {showConfirm ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
    </button>
  </div>

          {/* Terms */}
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: C.textGrey, cursor: "pointer", marginBottom: "20px" }}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            I agree to the{" "}
            <span style={{ color: C.blueLink }}>Terms of Service</span>
            {" "}and{" "}
            <span style={{ color: C.blueLink }}>Privacy Policy</span>
          </label>

          {/* Error */}
          {error && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px",
              padding: "10px 14px", color: "#DC2626", fontSize: "13px", marginBottom: "16px",
            }}>
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "12px",
              background: "linear-gradient(to right, " + C.btnFrom + ", " + C.btnTo + ")",
              color: C.btnText, border: "none", borderRadius: "8px",
              fontSize: "15px", fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "16px", opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Creating Account..." : "Create Teacher Account"}
          </button>

          {/* Sign in link */}
          <p style={{ textAlign: "center", fontSize: "13px", color: C.textGrey, margin: 0 }}>
            Already have an account?{" "}
            <span 
             onClick={() => navigate('/')}
             style={{ color: C.blueLink, fontWeight: 600, cursor: "pointer" }}>
              Sign in
            </span>
          </p>
        </div>

        {/* Need Help */}
        <div style={{ background: "#F0F6FF", borderRadius: "12px", padding: "16px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 6px 0" }}>Need Help?</h4>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "0 0 12px 0", lineHeight: 1.5 }}>
            Having trouble? Contact ESI IT support for assistance.
          </p>
          <button 
           onClick={() => window.location.href = 'mailto:support@esi.dz'}
           style={{
            width: "100%", padding: "10px", background: "white",
            border: "1px solid #D1D5DB", borderRadius: "8px",
            fontSize: "13px", fontWeight: 600, color: "#3B82F6", cursor: "pointer",
          }}>
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
}