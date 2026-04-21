import { useState } from "react";

export function MyProfile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Achour Dalila',
    email: 'achour.dalila@esi.dz',
    role: 'Teacher',
    department: 'Software Engineering',
    joined: '2020-09-01',
    totalReviews: 124,
    studentsTaught: 156,
    phone: '+213 123 456 789',
    bio: 'Senior Software Engineering professor with 10+ years of experience.'
  });
  const [form, setForm] = useState({ ...profile });
  
  const ch = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  
  if (editing) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>✏️ Edit Profile</h1>
          <div className="header-actions">
            <button className="filter-btn" onClick={() => setEditing(false)}>Cancel</button>
            <button className="filter-btn" style={{ background: '#10B981', color: '#fff', border: 'none' }} onClick={() => { setProfile({ ...form }); setEditing(false); alert('✅ Profile updated!'); }}>💾 Save</button>
          </div>
        </div>
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-large">DA</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, flex: 1 }}>
              {[['name', 'Full Name', 'text'], ['email', 'Email', 'email'], ['role', 'Role', 'text']].map(([n, l, t]) => (
                <div key={n} className="edit-field">
                  <label>{l}</label>
                  <input type={t} name={n} value={form[n]} onChange={ch} className="edit-input" />
                </div>
              ))}
            </div>
          </div>
          <div className="edit-details">
            {[['department', 'Department', 'text'], ['phone', 'Phone', 'tel'], ['joined', 'Joined', 'date']].map(([n, l, t]) => (
              <div key={n} className="edit-field">
                <label>{l}</label>
                <input type={t} name={n} value={form[n]} onChange={ch} className="edit-input" />
              </div>
            ))}
            <div className="edit-field full-width">
              <label>Bio</label>
              <textarea name="bio" value={form.bio} onChange={ch} className="edit-textarea" rows="3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👤 My Profile</h1>
        <button className="filter-btn" onClick={() => { setForm({ ...profile }); setEditing(true); }}>✏️ Edit Profile</button>
      </div>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-large">DA</div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p className="profile-role">{profile.role}</p>
            <p className="profile-email">{profile.email}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-badge"><span>📊</span><span>{profile.totalReviews} Reviews</span></div>
          <div className="stat-badge"><span>👥</span><span>{profile.studentsTaught} Students</span></div>
          <div className="stat-badge"><span>📅</span><span>Joined {profile.joined}</span></div>
        </div>
        <div className="profile-details">
          {[['📞 Phone:', profile.phone], ['📚 Department:', profile.department]].map(([l, v]) => (
            <div key={l} className="detail-row"><span>{l}</span><span>{v}</span></div>
          ))}
          <div className="detail-row full-width"><span>📝 Bio:</span><span>{profile.bio}</span></div>
        </div>
      </div>
    </div>
  );
}