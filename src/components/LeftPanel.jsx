import { ShieldCheck, Users, Zap } from 'lucide-react';
import classroomImage from '../assets/classroom.jpg';

function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "12px",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      border: "1px solid #E5E7EB",
      boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
      marginBottom: "16px"
    }}>
      <div style={{
        width: "48px", height: "48px", borderRadius: "50%",
        background: "#EEF2FF",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#111827", margin: "0 0 4px 0" }}>
          {title}
        </h3>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function LeftPanel() {
  return (
    <div style={{
      padding: "32px 32px 32px 48px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      boxSizing: "border-box",
      background: "transparent",
    }}>
      <div style={{
        width: "100%",
        height: "440px",
        borderRadius: "28px",
        overflow: "hidden",
        position: "relative",
        marginBottom: "32px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        flexShrink: 0,
      }}>
        <img 
          src={classroomImage} 
          alt="Classroom"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Gradient overlay to make text readable */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 80%)",
        }} />
        {/* Text over image */}
        <div style={{
          position: "absolute",
          bottom: "32px",
          left: "32px",
          right: "32px",
          color: "white"
        }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 12px 0" }}>
            Welcome to ESIcodeHub
          </h2>
          <p style={{ fontSize: "15px", opacity: 0.9, margin: 0, lineHeight: 1.5 }}>
            The academic platform built for ESI students. Upload code, receive peer feedback, and collaborate honestly.
          </p>
        </div>
      </div>

      {/* Features */}
      <div style={{ flex: 1 }}>
        <FeatureCard
          icon={<ShieldCheck size={24} color="#3B82F6" />}
          title="Secure Authentication"
          description="Login with your ESI.dz email for secure access to your account"
        />
        <FeatureCard
          icon={<Users size={24} color="#3B82F6" />}
          title="Join the Community"
          description="Connect with 500+ ESI students and collaborate on code"
        />
        <FeatureCard
          icon={<Zap size={24} color="#3B82F6" />}
          title="Instant Access"
          description="Start uploading code and receiving feedback immediately"
        />
      </div>
    </div>
  );
}