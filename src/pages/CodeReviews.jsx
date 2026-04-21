import { useState, useEffect } from "react";
import { ReviewModal } from '../components/ReviewModal';
import { SUBS, statusStyle, modColor } from "../data/data";

export default function CodeReviews() {
  const [modal, setModal]   = useState(null);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    const r = localStorage.getItem('reviewingCode');
    const v = localStorage.getItem('viewingCode');
    if (r) { setModal(JSON.parse(r)); setIsView(false); localStorage.removeItem('reviewingCode'); }
    else if (v) { setModal(JSON.parse(v)); setIsView(true); localStorage.removeItem('viewingCode'); }
  }, []);

  const reviews = SUBS.map(s => ({
    ...s,
    student: s.studentName,
    submitted: s.id === 1 ? '2 days ago' : s.id === 2 ? '1 day ago' : s.id === 3 ? '3 days ago' : 'Today',
  }));

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🔍 Code Reviews</h1>
        <button className="filter-btn">📌 Filter</button>
      </div>

      <div className="stats-cards">
        {[['⏳','pending','Pending'],['✓','reviewed','Reviewed'],['🚩','flagged','Flagged']].map(([icon, st, label]) => (
          <div key={label} className="stat-card">
            <div className="stat-icon">{icon}</div>
            <div>
              <div className="stat-value">{reviews.filter(r => r.status === st).length}</div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>👨‍🎓 STUDENT</th><th>📝 TITLE</th><th>📖 MODULE</th>
            <th>📌 STATUS</th><th>📅 SUBMITTED</th><th>⚡ ACTION</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(r => {
            const ss = statusStyle(r.status);
            return (
              <tr key={r.id}>
                <td>{r.studentName}</td>
                <td>{r.title}</td>
                <td><span style={{ ...modColor(r.module), padding:'4px 10px', borderRadius:20, fontSize:12, fontWeight:600 }}>{r.module}</span></td>
                <td><span className="status" style={{ background: ss.bg, color: ss.color }}>{ss.icon} {r.status}</span></td>
                <td>{r.submitted}</td>
                <td>
                  <button className="review-btn" onClick={() => { setModal(r); setIsView(false); }}>
                    📖 Review
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modal && <ReviewModal sub={modal} isView={isView} onClose={() => setModal(null)} />}
    </div>
  );
}