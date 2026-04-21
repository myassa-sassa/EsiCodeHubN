import { useNavigate } from "react-router-dom";

export function PrivacyPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)', padding: '60px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '24px', padding: '48px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px' }}>Privacy Policy</h1>
        <p style={{ marginBottom: '16px' }}>Last updated: April 2026</p>
        <p style={{ marginBottom: '24px' }}>Your data helps us provide the platform, evaluate academic progress, detect plagiarism, and improve our services. We never sell your personal data to third parties.</p>
        <button onClick={() => navigate(-1)} style={{ padding: '12px 32px', background: '#3B5BDB', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>← Back</button>
      </div>
    </div>
  );
}