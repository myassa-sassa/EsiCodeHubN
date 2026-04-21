import { useState } from "react";

export function Feedback() {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, student: 'Yacine Benali', comment: 'Great explanation, but add more comments.', date: '2 days ago' },
    { id: 2, student: 'Sara Moussaoui', comment: 'High similarity detected. Please explain your approach.', date: '1 day ago' },
    { id: 3, student: 'Karim Amari', comment: 'Perfect implementation! Excellent work!', date: '3 days ago' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ student: '', comment: '' });
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleWriteFeedback = () => {
    setNewFeedback({ student: '', comment: '' });
    setReplyTo(null);
    setShowModal(true);
  };

  const handleSubmitFeedback = () => {
    if (!newFeedback.student || !newFeedback.comment) {
      alert('Please fill in both student name and feedback');
      return;
    }
    const newId = feedbacks.length + 1;
    const newFeedbackItem = { id: newId, student: newFeedback.student, comment: newFeedback.comment, date: 'Just now' };
    setFeedbacks([newFeedbackItem, ...feedbacks]);
    setShowModal(false);
    setNewFeedback({ student: '', comment: '' });
    alert('✅ Feedback sent successfully!');
  };

  const handleReply = (feedback) => {
    setReplyTo(feedback);
    setReplyText('');
    setShowModal(true);
  };

  const handleSubmitReply = () => {
    if (!replyText.trim()) {
      alert('Please enter a reply');
      return;
    }
    const updatedFeedbacks = feedbacks.map(f => {
      if (f.id === replyTo.id) return { ...f, reply: replyText, replyDate: 'Just now' };
      return f;
    });
    setFeedbacks(updatedFeedbacks);
    setShowModal(false);
    setReplyTo(null);
    setReplyText('');
    alert(`💬 Reply sent to ${replyTo.student}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>💬 Feedback</h1>
        <button className="filter-btn" onClick={handleWriteFeedback}>✏️ Write Feedback</button>
      </div>
      <div className="feedback-list">
        {feedbacks.map(f => (
          <div key={f.id} className="feedback-card">
            <div className="feedback-header">
              <strong>{f.student}</strong>
              <span style={{ color: '#9CA3AF', fontSize: 13 }}>{f.date}</span>
            </div>
            <div className="feedback-content">{f.comment}</div>
            {f.reply && (
              <div style={{ marginTop: 12, paddingTop: 8, borderTop: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: 12, color: '#10B981', marginBottom: 4 }}>📝 Your Reply:</div>
                <div style={{ fontSize: 13, color: '#374151', background: '#F3F4F6', padding: 8, borderRadius: 8 }}>{f.reply}</div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>{f.replyDate}</div>
              </div>
            )}
            <button onClick={() => handleReply(f)} style={{ marginTop: 12, background: 'none', border: 'none', color: '#3B5BDB', cursor: 'pointer' }}>Reply →</button>
          </div>
        ))}
      </div>

      {/* Modal Write Feedback */}
      {showModal && !replyTo && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <button className="close" onClick={() => setShowModal(false)}>✕</button>
            <h2 style={{ marginBottom: 20 }}>✏️ Write Feedback</h2>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Student Name</label>
              <input type="text" className="edit-input" placeholder="Enter student name..." value={newFeedback.student} onChange={e => setNewFeedback({ ...newFeedback, student: e.target.value })} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Feedback / Comment</label>
              <textarea className="edit-textarea" rows="4" placeholder="Write your feedback here..." value={newFeedback.comment} onChange={e => setNewFeedback({ ...newFeedback, comment: e.target.value })} />
            </div>
            <div className="modal-buttons">
              <button className="filter-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="approve" onClick={handleSubmitFeedback}>Send Feedback</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Reply */}
      {showModal && replyTo && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <button className="close" onClick={() => setShowModal(false)}>✕</button>
            <h2 style={{ marginBottom: 20 }}>💬 Reply to {replyTo.student}</h2>
            <div style={{ background: '#F3F4F6', padding: 12, borderRadius: 8, marginBottom: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Original feedback:</div>
              <div style={{ fontSize: 13 }}>{replyTo.comment}</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Your Reply</label>
              <textarea className="edit-textarea" rows="4" placeholder="Write your reply here..." value={replyText} onChange={e => setReplyText(e.target.value)} />
            </div>
            <div className="modal-buttons">
              <button className="filter-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="approve" onClick={handleSubmitReply}>Send Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}