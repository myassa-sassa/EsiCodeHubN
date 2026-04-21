import { useNavigate } from "react-router-dom";

export function ContactPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)', padding: '60px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '24px', padding: '48px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px' }}>Contact Us</h1>
        <p style={{ marginBottom: '16px' }}>Email: support@esicodehub.dz</p>
        <p style={{ marginBottom: '16px' }}>Phone: +213 (0) 123 456 789</p>
        <p style={{ marginBottom: '24px' }}>Address: ESI, Oued Smar, Algiers, Algeria</p>
        <button onClick={() => navigate(-1)} style={{ padding: '12px 32px', background: '#3B5BDB', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>← Back</button>
      </div>
    </div>
  );
}