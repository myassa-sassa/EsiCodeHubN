// import { useEffect, useState } from "react";
// import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const C = {
//   cardBg: "#FFFFFF",
//   titleDark: "#111827",
//   textGrey: "#4B5563",
//   inputBg: "#F9FAFB",
//   inputBorder: "#E5E7EB",
//   labelColor: "#111827",
//   esiBlue: "#131439",
//   codeOrange: "#FF7512",
//   btnFrom: "#BC790E",
//   btnTo: "#FFC533",
//   btnText: "#FFFFFF",
//   blueLink: "#2563EB",
//   dividerLine: "#E5E7EB",
//   tabBg: "#DBEAFE",
//   tabText: "#2563EB",
// };

// export default function RegisterFormStudent() {
//   const navigate = useNavigate(); 
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [studentId, setstudentId] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [academicYear, setAcademicYear] = useState('');
//     // const [academicyear, setAcademicYear] = useState(false);

//   // const [academicyearerror,setAcademicYearError] = useState(false);
//     const [academicYearError,setAcademicYearError] = useState(false);

//   const [studentIdError, setstudentIdError] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [agreed, setAgreed] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [firstNameError, setFirstNameError] = useState(false);
//   const [lastNameError, setLastNameError] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => setError(''), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

// function validate() {
//   setEmailError(false);
//   setPasswordError(false);
//   setFirstNameError(false);
//   setLastNameError(false);
//   setstudentIdError(false);
//   setAcademicYearError(false);


//   // Form validation
//   let hasError = false;
//   if (!firstName) { setFirstNameError(true); hasError = true; }
//   if (!lastName) { setLastNameError(true); hasError = true; }
//   if (!email) { setEmailError(true); hasError = true; }
//   if (!studentId) { setstudentIdError(true); hasError = true; }
//   if (!academicYear) { setAcademicYearError(true); hasError = true; }
//   if (!password) { setPasswordError(true); hasError = true; }

//   if (hasError) {
//     if (!firstName && !lastName && !email && !studentId && !academicyear && !password) {
//       setError('Please fill in all your credentials');
//     } else {
//       setError('Please fill in all required fields');
//     }
//     return false;
//   }


//   if (!email.endsWith('@esi.dz')) {
//     setEmailError(true);
//     setError('Please use your ESI email (@esi.dz)');
//     return false;
//   }

//   if (password.length < 8) {
//     setPasswordError(true);
//     setError('Password must be at least 8 characters');
//     return false;
//   }

//   if (password !== confirmPassword) {
//     setPasswordError(true);
//     setError('Passwords do not match');
//     return false;
//   }

//   if (!agreed) {
//     setError('Please agree to the Terms of Service and privacy policy ');
//     return false;
//   }

//   return true;
// }

//   const handleSubmit = async () => {
//     setError('');
//     if (!validate()) return;
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:3000/api/auth/registerStudent', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           // name: firstName + ' ' + lastName,
//           first_name: firstName,      // ← change name en first_name
//         last_name: lastName,        // ← ajoute last_name
//           email: email,
//         esi_id: studentId,      // ← change studentId en student_id
//         academic_year: academicYear, // ← ajoute academic_year
//         password: password,
//         }),
//       });
//       if (response.ok) {
//         alert('Account created! Welcome ' + firstName);
//        navigate('/');
//       } else {
//         setError('Registration failed. Please try again.');
//       }
//     } catch (err) {
//       setError('Connection error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputStyle = {
//     width: "100%", padding: "10px 12px 10px 36px",
//     background: C.inputBg, border: "1px solid " + C.inputBorder,
//     borderRadius: "8px", fontSize: "14px", outline: "none",
//     boxSizing: "border-box", color: C.titleDark,
//   };

//   const labelStyle = {
//     fontSize: "13px", fontWeight: 600, color: C.labelColor,
//     display: "block", marginBottom: "6px"
//   };
//   return (
//     <div style={{
//       background: "transparent",
//       padding: "24px 32px 24px 48px",
//       display: "flex", flexDirection: "column",
//       minHeight: "100%", boxSizing: "border-box",
//       overflowY: "auto",
//     }}>
//       <div style={{ width: "100%", maxWidth: "480px", margin: "auto 0" }}>

//         {/* Badge */}
//         <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
//           <span style={{
//             background: C.tabBg, color: C.tabText, padding: "6px 16px",
//             borderRadius: "100px", fontSize: "13px", fontWeight: 600,
//           }}>
//             student Portal
//           </span>
//         </div>

//         {/* Title */}
//         <h2 style={{ fontSize: "28px", fontWeight: 700, color: C.titleDark, margin: "0 0 8px 0", textAlign: "center" }}>
//           student Registration
//         </h2>
//         <p style={{ fontSize: "14px", color: C.textGrey, margin: "0 0 24px 0", textAlign: "center", lineHeight: "1.5" }}>
//           Join{" "}
//           <span style={{ color: C.esiBlue, fontWeight: 700 }}>ESI</span>
//           <span style={{ color: C.codeOrange, fontWeight: 700 }}>code</span>
//           <span style={{ color: C.codeOrange, fontWeight: 700 }}>Hub</span>
//           {" "}and start your coding journey today"
//         </p>

//         {/* Form card */}
//         {/* Registration Form */}
//         <div style={{
//           background: C.cardBg, borderRadius: "12px", padding: "24px",
//           boxShadow: "0 2px 16px rgba(0,0,0,0.08)", marginBottom: "14px",
//         }}>

//         {/* First Name + Last Name */}
//   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
//     <div>
//       <label style={labelStyle}>First Name</label>
//       <div style={{ position: "relative" }}>
//         <input
//           type="text"
//           placeholder="Enter your first name"
//           value={firstName}
//           onChange={(e) => { setFirstName(e.target.value); setFirstNameError(false); }}
//           style={{ ...inputStyle,padding: "10px 12px", border: firstNameError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
//         />
//       </div>
//     </div>
//     <div>
//       <label style={labelStyle}>Last Name</label>
//       <div style={{ position: "relative" }}>
//         <input
//           type="text"
//           placeholder="Enter your last name"
//           value={lastName}
//           onChange={(e) => { setLastName(e.target.value); setLastNameError(false); }}
//           style={{ ...inputStyle,padding: "10px 12px", border: lastNameError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
//         />
//       </div>
//     </div>
//   </div>

//   {/* Email */}
//   <label style={labelStyle}>student Email</label>
//   <div style={{ position: "relative", marginBottom: "16px" }}>
//     <Mail size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
//     <input
//       type="email"
//       placeholder="@esi.dz"
//       value={email}
//       onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
//       style={{ ...inputStyle, border: emailError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
//     />
//   </div>

//   {/* student ID  */}
//   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
//     <div>
//       <label style={labelStyle}>student ID</label>
//       <div style={{ position: "relative" }}>
//          <input
//           type="text"
//           placeholder="eg:ESI-S-12345"
//           value={studentId}
//           onChange={(e) => { setstudentId(e.target.value); setstudentIdError(false); }}
//            style={{ ...inputStyle,padding: "10px 12px", border: studentIdError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
//            />
//       </div>
//     </div>   
//   </div>

// {/* Academic Year */}
// <label style={labelStyle}>Academic Year</label>
// <div style={{ position: "relative", marginBottom: "16px" }}>
//   <select
//     value={academicYear}
//     onChange={(e) => {
//       setAcademicYear(e.target.value);
//       setAcademicYearError(false);
//     }}
//     style={{
//       width: "100%",
//       padding: "10px 36px 10px 12px",
//       background: C.inputBg,
//       border: academicYearError ? "1px solid #DC2626" : "1px solid " + C.inputBorder,
//       borderRadius: "8px",
//       fontSize: "14px",
//       outline: "none",
//       boxSizing: "border-box",
//       color: academicYear ? C.titleDark : "#9CA3AF",
//       cursor: "pointer",
//       appearance: "none",
//       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "right 12px center",
//       backgroundSize: "16px",
//       transition: "border-color 0.2s ease, box-shadow 0.2s ease",
//     }}
//     onFocus={(e) => {
//       e.currentTarget.style.borderColor = C.blueLink;
//       e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
//     }}
//     onBlur={(e) => {
//       e.currentTarget.style.borderColor = academicYearError ? "#DC2626" : C.inputBorder;
//       e.currentTarget.style.boxShadow = "none";
//     }}
//   >
//     <option value="" disabled>Select your year</option>
//     <option value="1cp">1CP</option>
//     <option value="2cp">2CP</option>
//     <option value="1cs">1CS</option>
//     <optgroup label="2CS">
//       <option value="2cs siq">SIQ</option>
//       <option value="2cs sil">SIL</option>
//       <option value="2cs sid">SID</option>
//       <option value="2cs sit">SIT</option>
//     </optgroup>
//     <optgroup label="3CS">
//       <option value="3cs master">MASTER</option>
//       <option value="3cs doctorat">Doctorat</option>
//     </optgroup>
//   </select>
// </div>

//   {/* Password */}
//   <label style={labelStyle}>Password</label>
//   <div style={{ position: "relative", marginBottom: "16px" }}>
//     <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
//     <input
//       type={showPassword ? "text" : "password"}
//       placeholder="Create a strong password"
//       value={password}
//       onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
//       style={{ ...inputStyle, padding: "10px 40px 10px 36px", border: passwordError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
//     />
//     <button onClick={() => setShowPassword(!showPassword)}
//       style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
//       {showPassword ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
//     </button>
//   </div>

//   {/* Confirm Password */}
//   <label style={labelStyle}>Confirm Password</label>
//   <div style={{ position: "relative", marginBottom: "20px" }}>
//     <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
//     <input
//       type={showConfirm ? "text" : "password"}
//       placeholder="Re-enter your password"
//       value={confirmPassword}
//       onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(false); }}
//       style={{ ...inputStyle, padding: "10px 40px 10px 36px", border: passwordError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
//     />
//     <button onClick={() => setShowConfirm(!showConfirm)}
//       style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
//       {showConfirm ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
//     </button>
//   </div>

//           {/* Terms */}
//           <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: C.textGrey, cursor: "pointer", marginBottom: "20px" }}>
//             <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
//             I agree to the{" "}
//             <span style={{ color: C.blueLink }}>Terms of Service</span>
//             {" "}and{" "}
//             <span style={{ color: C.blueLink }}>Privacy Policy</span>
//           </label>

//           {/* Error */}
//           {error && (
//             <div style={{
//               background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px",
//               padding: "10px 14px", color: "#DC2626", fontSize: "13px", marginBottom: "16px",
//             }}>
//               {error}
//             </div>
//           )}

//           {/* Submit button */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             style={{
//               width: "100%", padding: "12px",
//               background: "linear-gradient(to right, " + C.btnFrom + ", " + C.btnTo + ")",
//               color: C.btnText, border: "none", borderRadius: "8px",
//               fontSize: "15px", fontWeight: 600,
//               cursor: loading ? "not-allowed" : "pointer",
//               marginBottom: "16px", opacity: loading ? 0.7 : 1,
//             }}
//           >
//             {loading ? "Creating Account..." : "Create student Account"}
//           </button>

//           {/* Sign in link */}
//           <p style={{ textAlign: "center", fontSize: "13px", color: C.textGrey, margin: 0 }}>
//             Already have an account?{" "}
//             <span 
//              onClick={() => navigate('/student')}
//              style={{ color: C.blueLink, fontWeight: 600, cursor: "pointer" }}>
//               Sign in
//             </span>
//           </p>
//         </div>

//         {/* Need Help */}
//         <div style={{ background: "#F0F6FF", borderRadius: "12px", padding: "16px" }}>
//           <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 6px 0" }}>Need Help?</h4>
//           <p style={{ fontSize: "13px", color: "#6B7280", margin: "0 0 12px 0", lineHeight: 1.5 }}>
//             Having trouble? Contact ESI IT support for assistance.
//           </p>
//           <button 
//            onClick={() => window.location.href = 'mailto:support@esi.dz'}
//            style={{
//             width: "100%", padding: "10px", background: "white",
//             border: "1px solid #D1D5DB", borderRadius: "8px",
//             fontSize: "13px", fontWeight: 600, color: "#3B82F6", cursor: "pointer",
//           }}>
//             Contact Support
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }



/*********************/
// import { Navigate } from 'react-router-dom';
// // import { useAuth } from '../AuthContext';
// import { useAuth } from '../contexts/AuthContext';

// function ProtectedRoute({ children, allowedRoles }) {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/" replace />;
//   if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
//   return children;
// }
// export default ProtectedRoute;

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

export default function RegisterFormStudent() {
  const navigate = useNavigate(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [academicYearError, setAcademicYearError] = useState(false);
  const [studentIdError, setStudentIdError] = useState(false);
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
    setStudentIdError(false);
    setAcademicYearError(false);

    let hasError = false;
    if (!firstName) { setFirstNameError(true); hasError = true; }
    if (!lastName) { setLastNameError(true); hasError = true; }
    if (!email) { setEmailError(true); hasError = true; }
    if (!studentId) { setStudentIdError(true); hasError = true; }
    if (!academicYear) { setAcademicYearError(true); hasError = true; }
    if (!password) { setPasswordError(true); hasError = true; }

    if (hasError) {
      setError('Please fill in all required fields');
      return false;
    }

    if (!email.endsWith('@esi.dz')) {
      setEmailError(true);
      setError('Please use your ESI email (@esi.dz)');
      return false;
    }

    if (password.length < 8) {
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
      setError('Please agree to the Terms of Service and privacy policy');
      return false;
    }

    return true;
  }

  const handleSubmit = async () => {
    setError('');
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/registerStudent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          esi_id: studentId,
          academic_year: academicYear,
          password: password,
        }),
      });
      if (response.ok) {
        alert('Account created! Welcome ' + firstName);
        navigate('/student');
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
        <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
          <span style={{
            background: C.tabBg, color: C.tabText, padding: "6px 16px",
            borderRadius: "100px", fontSize: "13px", fontWeight: 600,
          }}>
            Student Portal
          </span>
        </div>

        <h2 style={{ fontSize: "28px", fontWeight: 700, color: C.titleDark, margin: "0 0 8px 0", textAlign: "center" }}>
          Student Registration
        </h2>
        <p style={{ fontSize: "14px", color: C.textGrey, margin: "0 0 24px 0", textAlign: "center", lineHeight: "1.5" }}>
          Join{" "}
          <span style={{ color: C.esiBlue, fontWeight: 700 }}>ESI</span>
          <span style={{ color: C.codeOrange, fontWeight: 700 }}>code</span>
          <span style={{ color: C.codeOrange, fontWeight: 700 }}>Hub</span>
          {" "}and start your coding journey today
        </p>

        <div style={{
          background: C.cardBg, borderRadius: "12px", padding: "24px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)", marginBottom: "14px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setFirstNameError(false); }}
                style={{ ...inputStyle, padding: "10px 12px", border: firstNameError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
              />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setLastNameError(false); }}
                style={{ ...inputStyle, padding: "10px 12px", border: lastNameError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
              />
            </div>
          </div>

          <label style={labelStyle}>Student Email</label>
          <div style={{ position: "relative", marginBottom: "16px" }}>
            <Mail size={16} color="#9CA3AF" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="email"
              placeholder="@esi.dz"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
              style={{ ...inputStyle, border: emailError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Student ID</label>
              <input
                type="text"
                placeholder="eg: ESI-S-12345"
                value={studentId}
                onChange={(e) => { setStudentId(e.target.value); setStudentIdError(false); }}
                style={{ ...inputStyle, padding: "10px 12px", border: studentIdError ? "1px solid #DC2626" : "1px solid " + C.inputBorder }}
              />
            </div>   
          </div>

          <label style={labelStyle}>Academic Year</label>
          <div style={{ position: "relative", marginBottom: "16px" }}>
            <select
              value={academicYear}
              onChange={(e) => {
                setAcademicYear(e.target.value);
                setAcademicYearError(false);
              }}
              style={{
                width: "100%",
                padding: "10px 36px 10px 12px",
                background: C.inputBg,
                border: academicYearError ? "1px solid #DC2626" : "1px solid " + C.inputBorder,
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                color: academicYear ? C.titleDark : "#9CA3AF",
                cursor: "pointer",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                backgroundSize: "16px",
              }}
            >
              <option value="" disabled>Select your year</option>
              <option value="1cp">1CP</option>
              <option value="2cp">2CP</option>
              <option value="1cs">1CS</option>
              <optgroup label="2CS">
                <option value="2cs siq">SIQ</option>
                <option value="2cs sil">SIL</option>
                <option value="2cs sid">SID</option>
                <option value="2cs sit">SIT</option>
              </optgroup>
              <optgroup label="3CS">
                <option value="3cs master">MASTER</option>
                <option value="3cs doctorat">Doctorat</option>
              </optgroup>
            </select>
          </div>

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

          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: C.textGrey, cursor: "pointer", marginBottom: "20px" }}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            I agree to the{" "}
            <span style={{ color: C.blueLink }}>Terms of Service</span>
            {" "}and{" "}
            <span style={{ color: C.blueLink }}>Privacy Policy</span>
          </label>

          {error && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px",
              padding: "10px 14px", color: "#DC2626", fontSize: "13px", marginBottom: "16px",
            }}>
              {error}
            </div>
          )}

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
            {loading ? "Creating Account..." : "Create Student Account"}
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", color: C.textGrey, margin: 0 }}>
            Already have an account?{" "}
            <span 
              onClick={() => navigate('/student')}
              style={{ color: C.blueLink, fontWeight: 600, cursor: "pointer" }}>
              Sign in
            </span>
          </p>
        </div>

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