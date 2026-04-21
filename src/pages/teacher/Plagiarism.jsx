import { useState, useEffect } from "react";
import { SUBS } from "../../data/mockData";
import { modColor } from "../../utils/helpers";

export function Plagiarism() {
  const [reports, setReports] = useState([
    { id: 1, student1: 'Sara Moussaoui', student2: 'Amine Touati', similarity: 87, date: '2024-03-27' },
    { id: 2, student1: 'Lyna Haddad', student2: 'Nour Khelifi', similarity: 73, date: '2024-03-26' },
  ]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedReport = localStorage.getItem('plagiarismReport');
    if (savedReport) {
      const report = JSON.parse(savedReport);
      const submission = SUBS.find(s => s.studentName === report.studentName);
      if (submission) {
        report.code = submission.code;
        report.module = submission.module;
        report.title = submission.title;
      }
      setSelectedReport(report);
      setShowModal(true);
      localStorage.removeItem('plagiarismReport');
    }
  }, []);

  const getSubmissionDetails = (studentName) => {
    const submission = SUBS.find(s => s.studentName.toLowerCase() === studentName.toLowerCase());
    return {
      module: submission?.module || 'Unknown',
      title: submission?.title || 'Untitled',
      code: submission?.code || '',
    };
  };

  const escapeHtml = (text) => {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const getAiRisk = (similarity) => {
    if (similarity > 75) return { level: 'high', text: '🔴 Highly likely AI‑generated', color: '#EF4444' };
    if (similarity > 50) return { level: 'medium', text: '🟠 Possible AI assistance', color: '#F59E0B' };
    return { level: 'low', text: '🟢 Likely human‑written', color: '#10B981' };
  };

  const downloadReport = (report) => {
    const studentName = report.studentName || report.student1;
    const studentId = report.studentId || 'N/A';
    const similarity = report.similarity;
    const { module: moduleName, title, code: originalCode } = getSubmissionDetails(studentName);
    const code = report.code || originalCode || 'No code available';
    const submissionTitle = report.title || title;
    const date = report.date || new Date().toISOString().slice(0, 10);
    const aiRisk = getAiRisk(similarity);
    const similarityColor = similarity > 70 ? '#EF4444' : similarity > 30 ? '#F59E0B' : '#10B981';

    const reportHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Plagiarism Report - ${escapeHtml(studentName)}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; background: #F8FAFC; padding: 40px 20px; }
          .container { max-width: 900px; margin: 0 auto; background: white; border-radius: 24px; box-shadow: 0 20px 35px -10px rgba(0,0,0,0.1); overflow: hidden; }
          .header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: white; padding: 32px 40px; border-bottom: 4px solid #FFC533; }
          .header h1 { font-size: 28px; font-weight: 800; }
          .content { padding: 40px; }
          .similarity-section { background: #FEF3F2; padding: 24px; border-radius: 16px; border-left: 4px solid ${similarityColor}; margin-bottom: 32px; }
          .similarity-value { font-size: 48px; font-weight: 800; color: ${similarityColor}; }
          .code-section { margin-bottom: 32px; }
          pre { background: #1E1E2E; color: #E0E0E0; padding: 20px; border-radius: 12px; overflow-x: auto; font-family: monospace; }
          button { background: #3B5BDB; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; margin-top: 20px; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>📋 Plagiarism & AI Detection Report</h1></div>
          <div class="content">
            <div class="similarity-section">
              <div>⚠️ Similarity Score</div>
              <div class="similarity-value">${similarity}%</div>
              <div class="similarity-bar" style="margin-top:12px;height:8px;background:#E5E7EB;border-radius:10px;overflow:hidden">
                <div style="width:${similarity}%;height:100%;background:${similarityColor};border-radius:10px"></div>
              </div>
            </div>
            <div class="code-section">
              <div style="font-weight:700;margin-bottom:12px">📄 Code Snippet</div>
              <pre><code>${escapeHtml(code)}</code></pre>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-top:20px">
          <button onclick="window.print()">🖨️ Print Report</button>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Plagiarism_Report_${studentName.replace(/\s/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(`📄 Report downloaded for ${studentName}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>⚠️ Plagiarism Reports</h1>
        <button className="filter-btn" onClick={() => alert('Generate new report')}>📄 Generate Report</button>
      </div>
      <div className="stats-cards">
        {[
          ['🔴', reports.filter(r => r.similarity > 70).length, 'High Risk'],
          ['🟠', reports.filter(r => r.similarity > 30 && r.similarity <= 70).length, 'Medium Risk'],
          ['🟢', reports.filter(r => r.similarity <= 30).length, 'Low Risk'],
          ['📊', reports.length, 'Total Reports']
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
            <th>📄 STUDENT</th>
            <th>📖 MODULE</th>
            <th>📄 COMPARED WITH</th>
            <th>⚠️ SIMILARITY</th>
            <th>📅 DATE</th>
            <th>⚡ ACTION</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => {
            const { module: studentModule } = getSubmissionDetails(r.student1);
            return (
              <tr key={r.id}>
                <td><strong>{r.student1}</strong></td>
                <td><span className="module-badge" style={modColor(studentModule)}>{studentModule}</span></td>
                <td>{r.student2}</td>
                <td>
                  <div className="similarity">
                    <div className="bar">
                      <div className="fill" style={{ width: `${r.similarity}%`, background: r.similarity > 70 ? '#EF4444' : r.similarity > 30 ? '#F59E0B' : '#10B981' }} />
                    </div>
                    <span>{r.similarity}%</span>
                  </div>
                </td>
                <td>{r.date}</td>
                <td><button className="review-btn" onClick={() => downloadReport(r)}>📥 Download</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && selectedReport && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <button className="close" onClick={() => setShowModal(false)}>✕</button>
            <h2 style={{ marginBottom: 20 }}>📋 Plagiarism Report</h2>
            <div className="review-info">
              <p><strong>Student:</strong> {selectedReport.studentName} ({selectedReport.studentId})</p>
              <p><strong>Title:</strong> {selectedReport.title}</p>
              <p><strong>Module:</strong> {selectedReport.module}</p>
              <p><strong>Similarity:</strong> <span style={{ color: selectedReport.similarity > 70 ? '#EF4444' : selectedReport.similarity > 30 ? '#F59E0B' : '#10B981', fontWeight: 'bold', fontSize: '20px' }}>{selectedReport.similarity}%</span></p>
            </div>
            <div className="code-section">
              <h3>📄 Code Snippet</h3>
              <pre className="code-preview">{selectedReport.code ? selectedReport.code.substring(0, 500) : 'No code available'}</pre>
            </div>
            <div className="modal-buttons">
              <button className="approve" onClick={() => { downloadReport(selectedReport); setShowModal(false); }}>📥 Download Report</button>
              <button className="changes" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}