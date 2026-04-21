import LeftPanel from '../components/leftPanel';
import RegisterFormStudent from '../components/RegisterFormStudent';

export default function StudentRegisterPage() {
  return (
    <div style={{
      minHeight: "100vh",  
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
        <LeftPanel />
        <RegisterFormStudent />
      </div>
    </div>
  );
}