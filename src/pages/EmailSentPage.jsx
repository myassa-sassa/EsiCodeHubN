import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmailSentPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#EEF2F7", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      boxSizing: "border-box",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "960px",
        height: "600px",
        background: "#FFFFFF",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        overflow: "hidden",
        display: "flex",
        position: "relative"
      }}>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 0
          }}
        >
          <polygon points="0,0 65,0 35,100 0,100" fill="url(#splitBgGrad)" />
          <line x1="65" y1="0" x2="35" y2="100" stroke="#909CB4" strokeWidth="0.12" />

          <defs>
            <linearGradient id="splitBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EFF2FD" />
              <stop offset="100%" stopColor="#D5DFFF" />
            </linearGradient>
          </defs>
        </svg>

        <div style={{
          flex: "0 0 50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          padding: "20px" 
        }}>
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: "280px",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              position: "absolute",
              width: "240px",
              height: "240px",
              background: "radial-gradient(circle, rgba(93, 95, 239, 0.35) 0%, rgba(93, 95, 239, 0) 70%)",
              filter: "blur(25px)",
              zIndex: -1
            }} />
            
            <div style={{
              width: "100%",
              maxWidth: "260px",
              height: "190px",
              background: "#FFFFFF",
              borderRadius: "24px",
              position: "relative",
              boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              overflow: "hidden"
            }}>
              <div style={{
                width: "100%",
                height: "105px",
                background: "#181E41", 
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                position: "absolute",
                top: 0
              }} />
              <div style={{
                position: "absolute",
                top: "1px",
                width: "100%",
                height: "102px",
                background: "linear-gradient(to bottom, #2A3362 0%, #181E41 100%)",
                clipPath: "polygon(2px 0, 98% 0, 50% 98%)",
                zIndex: 2
              }} />
            </div>
          </div>
        </div>

        <div style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px", 
          position: "relative",
          zIndex: 2,
          textAlign: "center"
        }}>
          
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            width: "100%",
            gap: "12px", 
            marginBottom: "60px" 
          }}>
            <h2 style={{ 
              fontSize: "24px", 
              fontWeight: 700, 
              color: "#140760", 
              margin: 0,
              letterSpacing: "-0.5px"
            }}>
              Check your Gmail !
            </h2>
            <div style={{ 
              color: "#0435E8", 
              display: "flex", 
              alignItems: "center" 
            }}>
              <CheckCircle size={28} strokeWidth={2.5} />
            </div>
          </div>

          <div style={{ 
            width: "100%",
            maxWidth: "340px", 
            marginBottom: "40px"
          }}>
            <p style={{ 
              fontSize: "14px", 
              color: "#000000", 
              fontWeight: 500, 
              lineHeight: "1.6",
              margin: "0 0 10px 0"
            }}>
              we have sent a <br />
              password reset link to your <br />
              address gmail :
            </p>
            <p style={{ 
              fontSize: "14px", 
              color: "#111827", 
              fontWeight: 600,
              margin: 0
            }}>
              check your inbox and click the link
            </p>
          </div>

          <button
            onClick={() => navigate('/student')}
            style={{
              width: "100%",
              maxWidth: "220px", 
              padding: "12px",
              background: "linear-gradient(to right, #D97706, #FBBF24)",
              color: "#FFFFFF", 
              border: "none", 
              borderRadius: "8px",
              fontSize: "15px", 
              fontWeight: 600, 
              cursor: "pointer", 
              boxShadow: "0 4px 12px rgba(217, 119, 6, 0.2)",
              marginBottom: "30px",
              transition: "transform 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Back to log in &rarr;
          </button>

          <p style={{ 
            fontSize: "13px", 
            color: "#6B7280" 
          }}>
            Didn't receive anything? <span style={{ color: "#140760", fontWeight: 700, cursor: "pointer" }}>Resend .</span>
          </p>
          
        </div>

      </div>
    </div>
  );
}