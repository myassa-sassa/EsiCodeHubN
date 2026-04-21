import { ClipboardList, BarChart2, Lock } from 'lucide-react';
import Container from '../assets/Container.jpg';

function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      alignItems: "flex-start",
      gap: "14px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      marginBottom: "12px"
    }}>
      <div style={{
        width: "42px", height: "42px", borderRadius: "50%",
        background: "#EEF2FF",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 4px 0" }}>
          {title}
        </h3>
        <p style={{ fontSize: "12px", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>
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
      {/* Image Banner */}
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
          src={Container} 
          alt="Classroom"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 80%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "32px",
          left: "32px",
          right: "32px",
          color: "white"
        }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 12px 0" }}>
            Manage your students
          </h2>
          <p style={{ fontSize: "15px", opacity: 0.9, margin: 0, lineHeight: 1.5 }}>
            Access ESIcodeHub's teacher dashboard to review submissions, provide feedback, and monitor student progress.
          </p>
        </div>
      </div>

      {/* Features */}
      <div style={{ flex: 1 }}>
        <FeatureCard
          icon={<ClipboardList size={20} color="#3B82F6" />}
          title="Review Submissions"
          description="Access all student code submissions and provide detailed feedback"
        />
        <FeatureCard
          icon={<BarChart2 size={20} color="#3B82F6" />}
          title="Track Progress"
          description="Monitor student performance and plagiarism detection results"
        />
        <FeatureCard
          icon={<Lock size={20} color="#3B82F6" />}
          title="Secure Access"
          description="Enhanced security and privacy controls for teacher accounts"
        />
      </div>
    </div>
  );
}