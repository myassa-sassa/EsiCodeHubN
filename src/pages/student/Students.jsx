import { useState } from "react";
import { STUDENTS } from "../data/data";

export default function Students() {
  const [q, setQ] = useState('');
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) || s.id.includes(q)
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👥 Students</h1>
        <input className="search-input" placeholder="🔍 Search..." value={q} onChange={e => setQ(e.target.value)} />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>🆔 ID</th><th>👨‍🎓 STUDENT</th><th>📚 YEAR</th>
            <th>📖 MODULE</th><th>📝 SUBMISSIONS</th><th>📊 PROGRESS</th><th>⚡ ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id}>
              <td><span style={{ fontFamily:'monospace', fontSize:12 }}>{s.id}</span></td>
              <td>
                <div className="student">
                  <div className="initials">{s.initials}</div>
                  <div>
                    <div>{s.name}</div>
                    <div className="student-id">{s.email}</div>
                  </div>
                </div>
              </td>
              <td>{s.year}</td>
              <td>{s.module}</td>
              <td>{s.submissions}</td>
              <td>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ flex:1, height:6, background:'#E5E7EB', borderRadius:10, overflow:'hidden' }}>
                    <div style={{ width:`${s.progress}%`, height:'100%', background:'#3B5BDB', borderRadius:10 }} />
                  </div>
                  <span style={{ fontSize:12, color:'#6B7280' }}>{s.progress}%</span>
                </div>
              </td>
              <td>
                <button className="review-btn" onClick={() => alert(`ID: ${s.id}\nName: ${s.name}\nYear: ${s.year}`)}>
                  👤 View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}