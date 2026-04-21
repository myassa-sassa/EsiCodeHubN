import ChangePassordForm from '../components/ChangePassordForm';
import lockImage from '../assets/lock.jpg';

export default function ChangePaswordPage() {
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
          <polygon points="40,100 100,100 100,0 72,0" fill="url(#splitBgGrad)" />
          <line x1="40" y1="100" x2="72" y2="0" stroke="#909CB4" strokeWidth="0.12" />

          <defs>
            <linearGradient id="splitBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EFF2FD" />
              <stop offset="100%" stopColor="#D5DFFF" />
            </linearGradient>
          </defs>
        </svg>

        <div style={{ flex: "0 0 55%", background: "transparent", position: "relative", zIndex: 10, display: "flex", alignItems: "center" }}>
          <ChangePassordForm />
        </div>

        <div style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>

          <img
            src={lockImage}
            alt="Figma Lock Graphic"
            style={{
              width: "100%",
              maxWidth: "260px", 
              height: "auto",
              objectFit: "contain",
              marginLeft: "60px",
              mixBlendMode: "darken"
            }}
          />
        </div>
      </div>
    </div>
  );
}