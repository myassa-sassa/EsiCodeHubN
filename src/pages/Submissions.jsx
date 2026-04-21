import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SUBS, simColor, statusStyle, modColor } from "../data/data";

export default function Submissions() {
  const navigate = useNavigate();
  const [q, setQ]     = useState('');
  const [yr, setYr]   = useState('all');
  const [mod, setMod] = useState('all');
  const [st, setSt]   = useState('all');

  const filtered = SUBS.filter(s => {
    const sq = q.toLowerCase();
    return (
      (s.studentName.toLowerCase().includes(sq) || s.studentId.includes(sq)) &&
      (yr  === 'all' || s.year   === yr) &&
      (mod === 'all' || s.module === mod) &&
      (st  === 'all' || s.status === st)
    );
  });

  const handleReview = submission => {
    localStorage.setItem('reviewingCode', JSON.stringify(submission));
    navigate('/code-reviews');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📋 All Submissions</h1>
        <input className="search-input" placeholder="🔍 Search..." value={q} onChange={e => setQ(e.target.value)} />
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <span>📚 Year:</span>
          <div className="filter-buttons">
            {['all', '1CP', '2CP'].map(y => (
              <button key={y} className={`filter-chip ${yr === y ? 'active' : ''}`} onClick={() => setYr(y)}>
                {y === 'all' ? 'All' : y}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span>📖 Module:</span>
          <div className="filter-buttons">
            {['all', 'POO', 'SFSD', 'ALSDD', 'ALSDS'].map(m => (
              <button key={m} className={`filter-chip ${mod === m ? 'active' : ''}`} onClick={() => setMod(m)}>
                {m === 'all' ? 'All' : m}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span>📌 Status:</span>
          <div className="filter-buttons">
            {[['all','All'],['pending','⏳ Pending'],['flagged','🚩 Flagged'],['reviewed','✓ Reviewed']].map(([v, l]) => (
              <button key={v} className={`filter-chip ${st === v ? 'active' : ''}`} onClick={() => setSt(v)}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="stats-cards">
        {[
          ['📊', SUBS.length, 'Total'],
          ['⏳', SUBS.filter(s => s.status === 'pending').length,  'Pending'],
          ['🚩', SUBS.filter(s => s.status === 'flagged').length,  'Flagged'],
          ['✓',  SUBS.filter(s => s.status === 'reviewed').length, 'Reviewed'],
        ].map(([icon, val, label]) => (
          <div key={label} className="stat-card">
            <div className="stat-icon">{icon}</div>
            <div><div className="stat-value">{val}</div><div className="stat-label">{label}</div></div>
          </div>
        ))}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>👨‍🎓 STUDENT</th><th>📝 TITLE</th><th>📖 MODULE</th>
            <th>💻 LANG</th><th>📌 STATUS</th><th>⚠️ SIMILARITY</th><th>⚡ ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => {
            const ss = statusStyle(s.status);
            return (
              <tr key={s.id}>
                <td>
                  <div className="student">
                    <div className="initials">{s.initials}</div>
                    <div>
                      <div>{s.studentName}</div>
                      <div className="student-id">{s.studentId}</div>
                    </div>
                  </div>
                </td>
                <td>{s.title}</td>
                <td><span style={modColor(s.module)}>{s.module}</span></td>
                <td>{s.language}</td>
                <td><span className="status" style={{ background: ss.bg, color: ss.color }}>{ss.icon} {s.status}</span></td>
                <td>
                  <div className="similarity">
                    <div className="bar"><div className="fill" style={{ width: `${s.similarity}%`, background: simColor(s.similarity) }} /></div>
                    <span>{s.similarity}%</span>
                  </div>
                </td>
                <td><button className="review-btn" onClick={() => handleReview(s)}>📖 Review</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}