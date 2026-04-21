import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const faqs = [
    { q: "What is ESIcodeHub?", a: "ESIcodeHub is a dedicated code-sharing and collaboration platform for ESI students and teachers." },
    { q: "How does peer review work?", a: "Students and teachers can leave inline comments on specific lines of code, suggest improvements, and submit scored reviews." },
    { q: "What programming languages are supported?", a: "Python, Java, C, C++, JavaScript, SQL, and more — with syntax highlighting for each." },
    { q: "Is ESIcodeHub secure?", a: "Yes. ESIcodeHub uses hashed passwords, session tokens, role-based access control, and full input validation." },
    { q: "Do I need an account?", a: "Yes. Students register with their Student ID and teachers register with their Employee ID." },
    { q: "Difference between student and teacher accounts?", a: "Students can upload and share code. Teachers can review submissions, access plagiarism reports, and monitor all activity." },
    { q: "Multiple programming languages?", a: "Absolutely. The platform supports unlimited programming languages with proper syntax highlighting." },
    { q: "Can my teacher see all my submissions?", a: "Teachers can see all submissions within their assigned courses for grading purposes." },
  ];

  return (
    <div className="landing-page" style={{ overflowY: 'auto', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-esi">ESI</span>
          <span className="logo-codehub">codeHub</span>
        </div>
        <ul>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
          <li><a href="#how" onClick={(e) => { e.preventDefault(); scrollToSection('how'); }}>How It Works</a></li>
          <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a></li>
          <li><a href="#modules" onClick={(e) => { e.preventDefault(); scrollToSection('modules'); }}>Modules</a></li>
        </ul>
        <div className="nav-right">
          <button className="btn btn-ghost" onClick={() => navigate('/student')}>Login as Student</button>
          <button className="btn btn-ghost" onClick={() => navigate('/teacher/login')}>Login as Teacher</button>
          <button className="btn btn-ghost" onClick={() => navigate('/admin-login')}>👑 Admin</button>
          <button className="btn-gold-landing" onClick={() => navigate('/schedule-demo')}>Schedule Demo</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="features" style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap', minHeight: '100vh', padding: '120px 48px 80px' }}>
        <div className="blob blob-1"/><div className="blob blob-2"/>
        <div className="hero-left">
          <div className="hero-label">● Academic Code Platform · ESI</div>
          <h1>Your Code.<br/>Your <span className="c-gold">Reviews.</span><br/>Total <span className="c-blue">Transparency.</span></h1>
          <p className="hero-desc">ESIcodeHub is the academic platform built for ESI students and teachers. Upload your code, receive structured peer feedback, detect plagiarism, and collaborate honestly — all in one place.</p>
          <p className="hero-tagline">No setup. No training. Just upload and ask.</p>
          <div className="hero-btns">
            <button className="btn-gold-landing btn-lg" onClick={() => navigate('/student/register')}>Sign up with ESI.dz</button>
            <button className="btn-outline btn-lg" onClick={() => navigate('/teacher/login')}>📄 I'm a Teacher</button>
          </div>
          <p className="hero-support">Supported: PDF, PNG, GIF, WEBP · Max 10MB<br/>Languages: Python, Java, C, C++, JavaScript, and more</p>
        </div>
        <div className="hero-right">
          <img src="/codesubmission.png" alt="Code submission" style={{ width: '100%', maxWidth: '500px', borderRadius: '20px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--gray-200)' }} />
        </div>
      </section>

      {/* How It Works */}
      <section className="section how" id="how">
        <div className="center"><div className="s-label">Workflow</div><h2 className="s-title">How ESIcodeHub Works</h2><p className="s-sub">A simple, transparent academic flow — in 3 steps.</p></div>
        <div className="steps-grid">
          {[['1','Upload Your Code','Upload your code file or paste it directly. Tag by course, language, and submission type.'],
            ['2','Share, Submit & Collaborate','Receive structured peer feedback, submit help requests, and collaborate seamlessly.'],
            ['3','Projects & Submissions','Homework submissions, group projects — all tracked with full teacher monitoring.']].map(([n,t,d]) => (
            <div key={n} className="step-card"><div className="step-num">{n}</div><div className="step-title">{t}</div><div className="step-desc">{d}</div></div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" id="modules">
        <div className="stats-grid">
          {[['8','Platform Modules'],['3','User Roles'],['∞','Languages Supported'],['100%','Academically Supervised']].map(([n,l], index) => (
            <div key={index}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
          ))}
        </div>
      </section>

      {/* Modules Grid */}
      <section className="section">
        <div className="center"><div className="s-label">Modular Packages</div><h2 className="s-title">All 8 Modules</h2><p className="s-sub">Every feature built around your real academic workflow.</p></div>
        <div className="mods-grid">
          {[['🔐','Account Creation & Authentication','Student & teacher registration, secure login, role-based access.','core'],
            ['📤','Code Management','Upload, tag, search, edit and delete code submissions.','core'],
            ['💬','Review & Feedback','Inline comments, code suggestions, scored reviews.','core'],
            ['🔍','Plagiarism Detection','Similarity checks, detailed reports, flagging tools.','core'],
            ['📊','Dashboard & Monitoring','Student progress overview, analytics for teachers.','core'],
            ['👤','Profile Management','Edit personal info, bio, skills, and privacy settings.','core'],
            ['🔀','Version Control','Track code evolution, compare versions side by side.','opt'],
            ['❓','Q&A Forum','Post questions with code context, find validated answers.','opt']].map(([icon,name,desc,type])=>(
            <div key={name} className="mod-card"><div className="mod-icon">{icon}</div><div className="mod-name">{name}</div><div className="mod-desc">{desc}</div><span className={`mod-tag ${type==='core'?'t-core':'t-opt'}`}>{type==='core'?'Core':'Optional'}</span></div>
          ))}
        </div>
      </section>

      {/* Student Stories */}
      <section className="section">
        <div className="center"><div className="s-label">Student Stories</div><h2 className="s-title">Trusted by ESI Students &amp; Teachers</h2><p className="s-sub">See how ESIcodeHub is transforming code sharing at ESI.</p></div>
        <div className="stories-grid">
          {[['💬','"ESIcodeHub completely changed how I get feedback on my code. Instead of waiting for office hours, I get structured inline comments within hours."','Riad S.','2CP Student · Algo Course','85% faster feedback'],
            ['🔍','"As a teacher, the plagiarism detection module saves me hours every week. The similarity reports are clear and I can flag suspicious submissions instantly."','Prof. Amrani','Teacher · Data Structures','4x faster assessment'],
            ['📊','"The dashboard shows me exactly where each student is struggling."','Prof. Benali','Teacher · Programming Fundamentals','32% improvement in scores']].map(([icon,text,author,role,badge])=>(
            <div key={author} className="story-card"><div className="story-icon">{icon}</div><div className="story-text">{text}</div><div className="story-author">{author}</div><div className="story-role">{role}</div><span className="story-badge">{badge}</span></div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <div className="center" style={{marginBottom:'2.5rem'}}><div className="s-label">Featured Demo</div><h2 className="s-title">Plagiarism Detection in Action</h2><p className="s-sub">A real example of how ESIcodeHub protects academic integrity.</p></div>
        <div className="demo-inner">
          <div className="demo-head"><div className="demo-htitle">📋 Plagiarism Report · Batch 2CP-Algo · Week 5</div><span className="mod-tag t-core">Live Demo</span></div>
          <div className="demo-body">
            <div className="demo-stats">
              {[['94%','Original Submissions'],['3','Flagged for Review'],['98.5%','Detection Accuracy']].map(([n,l])=>(
                <div key={l} className="ds-card"><div className="ds-num">{n}</div><div className="ds-lbl">{l}</div></div>
              ))}
            </div>
            <button className="demo-cta" onClick={() => alert("📊 Demo Report: Similarity detected – 48% match with another submission.")}>View Full Plagiarism Report →</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section" id="faq">
        <div className="center"><div className="s-label">Questions &amp; Answers</div><h2 className="s-title">Frequently Asked Questions</h2><p className="s-sub">Everything you need to know about ESIcodeHub.</p></div>
        <div className="faq-list">
          {faqs.map((faq,i)=>(
            <div key={i} className={`faq-item ${activeFaq===i?'open':''}`}>
              <div className="faq-q" onClick={()=>setActiveFaq(activeFaq===i?null:i)}>{faq.q}<span className="faq-arrow">▼</span></div>
              <div className="faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to join<br/><span className="c-gold">ESI</span><span className="c-blue-light">code</span><span className="c-gold">Hub?</span></h2>
        <p style={{ color: '#e8c31f', fontWeight: 'bold', marginTop: '20px', marginBottom: '20px' }}>
          Start collaborating honestly. Share your code, learn from feedback, and grow your skills in a fully supervised academic environment.
        </p>
        <div className="cta-btns">
          <button className="btn-gold-landing btn-lg" onClick={() => navigate('/student/register')}>Join as Student</button>
          <button className="btn-outline-light btn-lg" onClick={() => navigate('/teacher/login')}>I'm a Teacher</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="f-logo">
          <span className="fe">ESI</span>
          <span className="fc">code</span>
          <span className="fh">Hub</span>
        </div>
        <div className="f-links">
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
          <a href="#how" onClick={(e) => { e.preventDefault(); scrollToSection('how'); }}>How It Works</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a>
          <a href="#modules" onClick={(e) => { e.preventDefault(); scrollToSection('modules'); }}>Modules</a>
          <span onClick={() => navigate('/privacy')} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>Privacy</span>
          <span onClick={() => navigate('/contact')} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>Contact</span>
        </div>
        <div className="f-copy">© 2025–2026 · Projet 2CP · PRJP11 · ESI · powered by team 1</div>
      </footer>
    </div>
  );
}