import { useNavigate } from "react-router-dom";

function BackBtn() {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop:48, textAlign:'center' }}>
      <button onClick={()=>navigate(-1)} style={{ padding:'12px 32px', background:'white', border:'1px solid var(--gray-200)', borderRadius:12, fontSize:14, fontWeight:600, color:'var(--primary)', cursor:'pointer' }}>
        ← Back
      </button>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#F8FAFC,#EEF2FF)', padding:'60px 24px' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <div style={{ background:'#cde6f760', borderRadius:24, padding:48, boxShadow:'0 20px 35px -10px rgba(0,0,0,0.1)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
            <div style={{ width:60, height:60, background:'linear-gradient(135deg,var(--primary),var(--primary-light))', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:30 }}>🔒</div>
            <div>
              <h1 style={{ fontSize:36, fontWeight:800, background:'linear-gradient(135deg,var(--dark),var(--primary))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Privacy Policy</h1>
              <p style={{ color:'var(--gray-500)', marginTop:8 }}>Last updated: April 2026</p>
            </div>
          </div>
          <div style={{ height:4, background:'linear-gradient(90deg,var(--primary),var(--secondary))', marginBottom:32, borderRadius:2 }} />
          {[
            ['📋 Information We Collect', <ul style={{ color:'var(--gray-600)', lineHeight:1.8, paddingLeft:24 }}><li>Name, email address, student/teacher ID</li><li>Code submissions and feedback</li><li>Usage data (logins, page visits, interactions)</li></ul>],
            ['⚙️ How We Use Your Information', <p style={{ color:'var(--gray-600)', lineHeight:1.7 }}>Your data helps us provide the platform, evaluate academic progress, detect plagiarism, and improve our services. We never sell your personal data to third parties.</p>],
            ['🔐 Data Security', <p style={{ color:'var(--gray-600)', lineHeight:1.7 }}>We use industry-standard encryption and secure servers. Only authorised ESI staff have access to academic records. Your passwords are hashed and never stored in plain text.</p>],
            ['📧 Your Rights', <p style={{ color:'var(--gray-600)', lineHeight:1.7 }}>You can request access, correction, or deletion of your personal data. For any privacy concerns, email <a href="mailto:privacy@esicodehub.dz" style={{ color:'var(--primary)', fontWeight:600 }}>privacy@esicodehub.dz</a>.</p>],
          ].map(([title, content]) => (
            <div key={title} style={{ marginBottom:32 }}>
              <h2 style={{ fontSize:22, fontWeight:700, color:'var(--primary)', marginBottom:12 }}>{title}</h2>
              {content}
            </div>
          ))}
          <BackBtn />
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#F8FAFC,#EEF2FF)', padding:'60px 24px' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <div style={{ background:'#cde6f760', borderRadius:24, padding:48, boxShadow:'0 20px 35px -10px rgba(0,0,0,0.1)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
            <div style={{ width:60, height:60, background:'linear-gradient(135deg,var(--primary),var(--primary-light))', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:30 }}>📞</div>
            <div>
              <h1 style={{ fontSize:36, fontWeight:800, background:'linear-gradient(135deg,var(--dark),var(--primary))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Contact Us</h1>
              <p style={{ color:'var(--gray-500)', marginTop:8 }}>We're here to help</p>
            </div>
          </div>
          <div style={{ height:4, background:'linear-gradient(90deg,var(--primary),var(--secondary))', marginBottom:32, borderRadius:2 }} />

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:24, marginBottom:40 }}>
            {[['✉️','Email','support@esicodehub.dz'],['📱','Phone','+213 (0) 123 456 789'],['📍','Address','ESI, Oued Smar, Algiers, Algeria']].map(([icon,title,val])=>(
              <div key={title} style={{ background:'var(--gray-50)', padding:24, borderRadius:20, textAlign:'center', border:'1px solid var(--gray-200)' }}>
                <div style={{ fontSize:40, marginBottom:12 }}>{icon}</div>
                <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>{title}</h3>
                <p style={{ color:'var(--gray-600)' }}>{val}</p>
              </div>
            ))}
          </div>

          <div style={{ background:'linear-gradient(135deg,var(--gray-50),white)', padding:24, borderRadius:20, marginBottom:24, border:'1px solid var(--gray-200)' }}>
            <h3 style={{ fontSize:18, fontWeight:700, marginBottom:12 }}>🕒 Office Hours</h3>
            <p style={{ color:'var(--gray-600)' }}>Sunday – Thursday: <strong>9:00 – 16:00</strong> (UTC+1)</p>
          </div>

          <div style={{ background:'#FEF3F2', padding:20, borderRadius:20, borderLeft:'4px solid var(--danger)', marginBottom:40 }}>
            <h3 style={{ fontSize:16, fontWeight:700, marginBottom:8, color:'var(--danger)' }}>⚠️ Emergency / Urgent Academic Issues</h3>
            <p style={{ color:'var(--gray-600)' }}>For urgent matters regarding your courses, please contact your instructor directly via Moodle or email.</p>
          </div>

          <BackBtn />
        </div>
      </div>
    </div>
  );
}