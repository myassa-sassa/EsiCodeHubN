import "../../styles/global.css";  // 2 niveaux plus haut

import { useState } from "react";
import { SUBS, STUDENTS } from "../../data/mockData";
import { Toast } from "../../components/Toast";
import { simColor, statusStyle, langStyle, modColor } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [yr, setYr] = useState('all');
  const [mod, setMod] = useState('all');
  const [toast, setToast] = useState('');

  const showToast = m => { setToast(m); setTimeout(() => setToast(''), 3000); };
  
  const handleReview = s => { localStorage.setItem('reviewingCode', JSON.stringify(s)); navigate('/code-reviews'); };
  const handleView = s => { localStorage.setItem('viewingCode', JSON.stringify(s)); navigate('/code-reviews'); };
  const handleReport = (s) => {
    const reportData = { studentName: s.studentName, studentId: s.studentId, title: s.title, code: s.code, similarity: s.similarity, date: s.date, language: s.language, module: s.module };
    localStorage.setItem('plagiarismReport', JSON.stringify(reportData));
    navigate('/plagiarism');
  };
  
  const handleCSV = () => {
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([`ID,Student,Module,Title,Status,Similarity\n`+SUBS.map(s=>`${s.studentId},${s.studentName},${s.module},${s.title},${s.status},${s.similarity}%`).join('\n')], { type: 'text/csv' })), download: 'submissions.csv' });
    a.click(); showToast(`📎 Exported ${SUBS.length} rows`);
  };
  
  const filtered = SUBS.filter(s => {
    const sq = q.toLowerCase();
    return (s.studentName.toLowerCase().includes(sq) || s.studentId.includes(sq) || s.title.toLowerCase().includes(sq)) && (yr === 'all' || s.year === yr) && (mod === 'all' || s.module === mod);
  });
  
  const ACTIVITIES = [
    { id: 1, user: 'Yacine Benali', module: 'ALSDD', action: '📤 uploaded a submission', time: '2 min ago', type: 'upload' },
    { id: 2, user: 'Sara Moussaoui', module: 'ALSDS', action: '🚨 code flagged (87%)', time: '15 min ago', type: 'alert', urgent: true },
    { id: 3, user: 'Karim Amari', module: 'POO', action: '✓ received feedback', time: '1 hour ago', type: 'feedback' },
    { id: 4, user: 'Riad Boudiaf', module: 'ALSDD', action: '🔄 submitted version 2', time: '2 hours ago', type: 'upload' },
  ];
  
  return (
    <div className="dashboard-container">
      {toast && <Toast msg={toast} />}
      <div className="topbar">
        <div><h1>📊 Teacher Dashboard</h1><p>Good morning, Dr. Achour 👋 | ESIcodeHub</p></div>
        <div className="topbar-right">
          <div className="search-wrapper"><span className="search-icon">🔍</span><input className="search" placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} /></div>
          <button className="icon-btn" onClick={() => showToast('✓ All notifications read')}>🔔</button>
          <button className="icon-btn" onClick={handleCSV}>📎</button>
          <div className="avatar-small">DA</div>
        </div>
      </div>
      <div className="filters-bar">
        <div className="filter-group"><span className="filter-label">📚 Year:</span><div className="filter-buttons">{['all', '1CP', '2CP'].map(y => <button key={y} className={`filter-chip ${yr === y ? 'active' : ''}`} onClick={() => setYr(y)}>{y === 'all' ? 'All' : y}</button>)}</div></div>
        <div className="filter-group"><span className="filter-label">📖 Module:</span><div className="filter-buttons">{['all', 'POO', 'SFSD', 'ALSDD', 'ALSDS'].map(m => <button key={m} className={`filter-chip ${mod === m ? 'active' : ''}`} onClick={() => setMod(m)}>{m === 'all' ? 'All' : m}</button>)}</div></div>
      </div>
      <div className="stats">
        <div className="stat-card"><div>Total Submissions 📁</div><div className="big-number blue">{SUBS.length}</div><div className="green">↑ 12 this week</div></div>
        <div className="stat-card"><div>Pending ⏳</div><div className="big-number orange">{SUBS.filter(s => s.status === 'pending').length}</div><div>Need review</div></div>
        <div className="stat-card"><div>Flagged 🚩</div><div className="big-number red">{SUBS.filter(s => s.status === 'flagged').length}</div><div>High similarity</div></div>
        <div className="stat-card"><div>Active Students 👥</div><div className="big-number green">{STUDENTS.length}</div><div className="green">↑ 5 vs last week</div></div>
      </div>
      <div className="white-card">
        <div className="card-header"><h3>📋 Recent Submissions</h3><button className="link" onClick={handleCSV}>Export CSV →</button></div>
        <table className="table">
          <thead><tr><th>👨‍🎓 STUDENT</th><th>📝 TITLE</th><th>📖 MODULE</th><th>💻 LANG</th><th>📌 STATUS</th><th>⚠️ SIMILARITY</th><th>📖</th><th>👁️</th><th>📄</th></tr></thead>
          <tbody>
            {filtered.map(s => {
              const ss = statusStyle(s.status);
              return (
                <tr key={s.id}>
                  <td><div className="student"><div className="initials">{s.initials}</div><div><div>{s.studentName}</div><div className="student-id">{s.studentId}</div></div></div></td>
                  <td className="gray">{s.title}</td>
                  <td><span className="module-badge" style={modColor(s.module)}>{s.module}</span></td>
                  <td><span className="lang" style={langStyle(s.language)}>{s.language}</span></td>
                  <td><span className="status" style={{ background: ss.bg, color: ss.color }}>{ss.icon} {s.status}</span></td>
                  <td><div className="similarity"><div className="bar"><div className="fill" style={{ width: `${s.similarity}%`, background: simColor(s.similarity) }} /></div><span>{s.similarity}%</span></div></td>
                  <td><button className="review-btn" onClick={() => handleReview(s)}>📖</button></td>
                  <td><button className="view-btn" onClick={() => handleView(s)}>👁️</button></td>
                  <td><button className="report-btn" onClick={() => handleReport(s)}>📄</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="activity-feed-section">
        <h3>⚡ Recent Activity</h3>
        {ACTIVITIES.map(a => (
          <div key={a.id} className={`activity-item ${a.urgent ? 'urgent' : ''}`}>
            <div className="activity-dot" style={{ background: a.type === 'alert' ? '#EF4444' : '#3B5BDB' }} />
            <div className="activity-content"><strong>{a.user}</strong> ({a.module}) — {a.action}<div className="activity-time">{a.time}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}