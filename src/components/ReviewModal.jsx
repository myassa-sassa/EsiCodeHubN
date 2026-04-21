import { useState } from 'react';

function ReviewModal({ sub, isView, onClose }) {
  const [fb, setFb] = useState('');
  const act = label => { alert(`${label}: ${sub.studentName || sub.student}`); onClose(); };
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>
        <h2 style={{ marginBottom: 16 }}>{isView ? '👁️ View Code' : '📝 Review Submission'}</h2>
        <div className="review-info">
          <p><strong>Student:</strong> {sub.studentName || sub.student} ({sub.studentId})</p>
          <p><strong>Module:</strong> {sub.module} | <strong>Title:</strong> {sub.title}</p>
          <p><strong>Similarity:</strong> {sub.similarity ?? 'N/A'}%</p>
        </div>
        <div className="code-section">
          <h3>📄 Code</h3>
          <pre className="code-preview">{sub.code || '// No code'}</pre>
        </div>
        {!isView && (
          <div className="feedback-section">
            <h3>💬 Feedback</h3>
            <textarea rows="4" value={fb} onChange={e => setFb(e.target.value)} placeholder="Write feedback..." />
          </div>
        )}
        <div className="modal-buttons">
          {!isView ? (
            <>
              <button className="approve" onClick={() => act('✅ Approved')}>✓ Approve</button>
              <button className="flag" onClick={() => act('🚩 Flagged')}>🚩 Flag</button>
              <button className="changes" onClick={() => act('📝 Changes requested')}>📝 Request Changes</button>
            </>
          ) : (
            <button className="approve" onClick={onClose}>Close</button>
          )}
        </div>
      </div>
    </div>
  );
}
export { ReviewModal };
