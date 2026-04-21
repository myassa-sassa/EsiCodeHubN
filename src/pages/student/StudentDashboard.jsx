import "../../styles/global.css";  // 2 niveaux plus haut

import { useAuth } from "../../contexts/AuthContext";
import { SUBS } from "../../data/mockData";

export function StudentDashboard() {
  const { user } = useAuth();
  const mySubmissions = SUBS.filter(s => s.studentId === user?.studentId || s.studentName.toLowerCase() === user?.name?.toLowerCase());
  
  return (
    <div className="dashboard-container">
      <div className="topbar">
        <div>
          <h1>🎓 Student Dashboard</h1>
          <p>Welcome, {user?.name || 'Student'} 👋</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat-card"><div>📁 My Submissions</div><div className="big-number blue">{mySubmissions.length}</div></div>
        <div className="stat-card"><div>⏳ Pending</div><div className="big-number orange">{mySubmissions.filter(s => s.status === 'pending').length}</div></div>
        <div className="stat-card"><div>🚩 Flagged</div><div className="big-number red">{mySubmissions.filter(s => s.status === 'flagged').length}</div></div>
        <div className="stat-card"><div>✅ Reviewed</div><div className="big-number green">{mySubmissions.filter(s => s.status === 'reviewed').length}</div></div>
      </div>
      <div className="white-card">
        <div className="card-header"><h3>📋 My Submissions</h3></div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Module</th>
              <th>Status</th>
              <th>Similarity</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {mySubmissions.map(s => (
              <tr key={s.id}>
                <td>{s.title}</td>
                <td>{s.module}</td>
                <td>{s.status}</td>
                <td>{s.similarity}%</td>
                <td><button className="view-btn" onClick={() => alert(s.code)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}