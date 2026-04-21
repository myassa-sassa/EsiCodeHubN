import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLoginForm() {
  const [adminId, setAdminId] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const ADMIN_CREDENTIALS = {
    id: '31731309',
    code: 'neila2006'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Vérification des champs vides
    if (!adminId.trim()) {
      setError('❌ Admin ID is required');
      setIsLoading(false);
      return;
    }
    
    if (!adminCode.trim()) {
      setError('❌ Password is required');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (adminId === ADMIN_CREDENTIALS.id && adminCode === ADMIN_CREDENTIALS.code) {
        login({
          id: adminId,
          name: 'Administrator',
          role: 'admin',
          avatar: 'AD',
          email: 'admin@esicodehub.dz'
        });
        navigate('/admin');
      } else {
        setError('❌ Invalid Admin ID or Password');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div style={{
      padding: "48px 40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      background: "white"
    }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          fontSize: "40px",
          boxShadow: "0 10px 25px rgba(102,126,234,0.3)"
        }}>
          👑
        </div>
        <h3 style={{
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "8px",
          color: "#1F2937"
        }}>
          Welcome Back
        </h3>
        <p style={{
          fontSize: "14px",
          color: "#6B7280"
        }}>
          Sign in to manage your platform
        </p>
      </div>

      {/* Message d'erreur en rouge et en anglais */}
      {error && (
        <div style={{
          background: "#FEE2E2",
          color: "#DC2626",
          padding: "14px 18px",
          borderRadius: "12px",
          marginBottom: "24px",
          fontSize: "13px",
          fontWeight: "500",
          textAlign: "center",
          borderLeft: "4px solid #DC2626",
          border: "1px solid #FECACA"
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151"
          }}>
            Admin ID
          </label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder="Enter your Admin ID"
            style={{
              width: "100%",
              padding: "14px 16px",
              border: error && !adminId ? "1px solid #DC2626" : "1px solid #E5E7EB",
              borderRadius: "12px",
              fontSize: "14px",
              transition: "all 0.2s",
              outline: "none",
              background: "#F9FAFB"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.background = "white";
              setError('');
            }}
            onBlur={(e) => {
              if (!adminId.trim()) {
                e.target.style.borderColor = "#E5E7EB";
              } else {
                e.target.style.borderColor = "#E5E7EB";
              }
              e.target.style.background = "#F9FAFB";
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151"
          }}>
            Password
          </label>
          <input
            type="password"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "14px 16px",
              border: error && !adminCode ? "1px solid #DC2626" : "1px solid #E5E7EB",
              borderRadius: "12px",
              fontSize: "14px",
              transition: "all 0.2s",
              outline: "none",
              background: "#F9FAFB"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.background = "white";
              setError('');
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#E5E7EB";
              e.target.style.background = "#F9FAFB";
            }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "all 0.3s",
            opacity: isLoading ? 0.7 : 1,
            marginBottom: "24px"
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(102,126,234,0.3)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {isLoading ? "Connecting..." : "Sign In"}
        </button>

        <div style={{
          textAlign: "center",
          padding: "16px",
          background: "#F9FAFB",
          borderRadius: "12px"
        }}>
          {/* <p style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "8px" }}>
            Demo Credentials
          </p> */}
          {/* <div style={{ display: "flex", justifyContent: "center", gap: "16px", fontSize: "12px" }}>
            <code style={{ background: "#E5E7EB", padding: "4px 10px", borderRadius: "8px" }}>ID: ADMIN001</code>
            <code style={{ background: "#E5E7EB", padding: "4px 10px", borderRadius: "8px" }}>Password: ESI2024</code>
          </div> */}
        </div>
      </form>
    </div>
  );
}