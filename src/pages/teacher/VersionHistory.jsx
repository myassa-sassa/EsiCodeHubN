import { useState } from "react";
import { SUBS } from "../../data/mockData";

export function VersionHistory() {
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const versions = SUBS.map(s => ({
    ...s,
    version: s.id === 2 ? 'v3' : 'v' + (s.id === 3 ? 1 : 2),
    changes: ['Fixed edge cases, added comments', 'Added error handling, optimized code', 'Initial submission', 'Added try-catch blocks, fixed file path'][s.id - 1]
  }));
  
  const toggle = id => {
    if (selected.includes(id)) setSelected(selected.filter(x => x !== id));
    else if (selected.length < 3) setSelected([...selected, id]);
    else alert('Max 3 versions');
  };
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📜 Version History</h1>
        <button className="filter-btn" onClick={() => { if (selected.length < 2) alert('Select at least 2 versions'); else setShowModal(true); }}>
          🔄 Compare Selected ({selected.length})
        </button>
      </div>
      <div className="stats-cards">
        {[
          ['📊', versions.length, 'Total Versions'],
          ['👨‍🎓', 4, 'Students'],
          ['🔄', '2.5', 'Avg Versions']
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
            <th style={{ width: 50 }}>🔘</th>
            <th>👨‍🎓 STUDENT</th>
            <th>📝 TITLE</th>
            <th>🔢 VERSION</th>
            <th>📝 CHANGES</th>
            <th>📅 DATE</th>
            <th>⚡ ACTION</th>
          </tr>
        </thead>
        <tbody>
          {versions.map(v => (
            <tr key={v.id}>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" checked={selected.includes(v.id)} onChange={() => toggle(v.id)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
              </td>
              <td><strong>{v.studentName}</strong></td>
              <td>{v.title}</td>
              <td><span className="version-badge">{v.version}</span></td>
              <td style={{ color: '#6B7280', fontSize: 13 }}>{v.changes}</td>
              <td>{v.date}</td>
              <td><button className="review-btn" onClick={() => alert(`Viewing ${v.studentName} — ${v.version}`)}>📖 View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" style={{ width: 900 }} onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setShowModal(false)}>✕</button>
            <h2 style={{ marginBottom: 16 }}>🔄 Compare Versions</h2>
            <div className="compare-container">
              {versions.filter(v => selected.includes(v.id)).map(v => (
                <div key={v.id} className="compare-version">
                  <h3>{v.studentName} — {v.version}</h3>
                  <p><strong>Title:</strong> {v.title}</p>
                  <p><strong>Date:</strong> {v.date}</p>
                  <p><strong>Changes:</strong> {v.changes}</p>
                  <div className="compare-code">
                    <strong>Code:</strong>
                    <pre>{v.code.slice(0, 200)}...</pre>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-buttons">
              <button className="approve" onClick={() => setShowModal(false)}>Close</button>
              <button className="changes" onClick={() => { alert('Report downloaded!'); setShowModal(false); }}>📥 Download Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}