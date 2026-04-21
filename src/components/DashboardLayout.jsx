import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, FileText, Users, Code, MessageSquare, 
  AlertTriangle, History, User, LogOut, Menu, X,
  GraduationCap, BookOpen, ChevronLeft, Bell, Search
} from 'lucide-react';
import { useState } from 'react';

const ROUTE_LABELS = {
  '/dashboard': 'Dashboard',
  '/submissions': 'Submissions',
  '/students': 'Students',
  '/code-reviews': 'Code Reviews',
  '/feedback': 'Feedback',
  '/plagiarism': 'Plagiarism',
  '/version-history': 'Version History',
  '/profile': 'My Profile',
  '/my-submissions': 'My Submissions',
  '/my-feedback': 'Feedback',
};

function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const teacherMenu = [
    { id: 'dashboard',      name: 'Dashboard',       icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { id: 'submissions',    name: 'Submissions',      icon: <FileText size={18} />,        path: '/submissions' },
    { id: 'students',       name: 'Students',         icon: <Users size={18} />,           path: '/students' },
    { id: 'codereviews',    name: 'Code Reviews',     icon: <Code size={18} />,            path: '/code-reviews' },
    { id: 'feedback',       name: 'Feedback',         icon: <MessageSquare size={18} />,   path: '/feedback' },
    { id: 'plagiarism',     name: 'Plagiarism',       icon: <AlertTriangle size={18} />,   path: '/plagiarism' },
    { id: 'versionhistory', name: 'Version History',  icon: <History size={18} />,         path: '/version-history' },
    { id: 'profile',        name: 'My Profile',       icon: <User size={18} />,            path: '/profile' },
  ];

  const studentMenu = [
    { id: 'studentdashboard',    name: 'Dashboard',        icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { id: 'studentsubmissions',  name: 'My Submissions',   icon: <FileText size={18} />,        path: '/my-submissions' },
    { id: 'studentfeedback',     name: 'Feedback',         icon: <MessageSquare size={18} />,   path: '/my-feedback' },
    { id: 'profile',             name: 'My Profile',       icon: <User size={18} />,            path: '/profile' },
  ];

  const menu = user?.role === 'teacher' ? teacherMenu : studentMenu;
  const isTeacher = user?.role === 'teacher';
  const roleColor = isTeacher ? '#FFC533' : '#10B981';
  const pageTitle = ROUTE_LABELS[location.pathname] || 'ESIcodeHub';
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U';

  const SidebarContent = ({ mobile = false }) => (
    <>
      {/* Logo */}
      <div style={{
        padding: collapsed && !mobile ? '24px 0' : '24px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed && !mobile ? 'center' : 'space-between',
        minHeight: '72px',
      }}>
        {(!collapsed || mobile) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span style={{ color: '#4F78FF', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px', fontFamily: "'DM Sans', sans-serif" }}>ESI</span>
            <span style={{ color: '#FFC533', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px', fontFamily: "'DM Sans', sans-serif" }}>codeHub</span>
          </div>
        )}
        {collapsed && !mobile && (
          <div style={{ width: '32px', height: '32px', background: 'rgba(79,120,255,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#4F78FF', fontSize: '14px', fontWeight: 800 }}>E</span>
          </div>
        )}
        {!mobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              borderRadius: '8px',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >
            <ChevronLeft size={14} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          </button>
        )}
        {mobile && (
          <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '4px' }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* User info */}
      <div style={{
        padding: collapsed && !mobile ? '16px 0' : '16px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        justifyContent: collapsed && !mobile ? 'center' : 'flex-start',
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          background: `linear-gradient(135deg, ${roleColor}, ${roleColor}99)`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '13px',
          color: '#0F172A',
          flexShrink: 0,
          boxShadow: `0 0 0 2px rgba(255,255,255,0.07), 0 0 12px ${roleColor}40`,
        }}>
          {initials}
        </div>
        {(!collapsed || mobile) && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ color: 'white', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'User'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: roleColor, marginTop: '2px' }}>
              {isTeacher ? <GraduationCap size={11} /> : <BookOpen size={11} />}
              {isTeacher ? 'Teacher' : 'Student'}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: collapsed && !mobile ? '16px 8px' : '16px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {menu.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={() => mobile && setMobileOpen(false)}
            title={collapsed && !mobile ? item.name : undefined}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: collapsed && !mobile ? '10px 0' : '10px 12px',
              justifyContent: collapsed && !mobile ? 'center' : 'flex-start',
              borderRadius: '10px',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
              background: isActive ? 'rgba(79,120,255,0.18)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.15s',
              position: 'relative',
              borderLeft: isActive ? '2px solid #4F78FF' : '2px solid transparent',
            })}
            onMouseEnter={e => { if (!e.currentTarget.className.includes('active')) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}}
            onMouseLeave={e => { if (!e.currentTarget.className.includes('active')) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}}
          >
            <span style={{ flexShrink: 0, display: 'flex' }}>{item.icon}</span>
            {(!collapsed || mobile) && <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>}
          </NavLink>
        ))}

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '12px 0' }} />

        <button
          onClick={() => { handleLogout(); mobile && setMobileOpen(false); }}
          title={collapsed && !mobile ? 'Logout' : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: collapsed && !mobile ? '10px 0' : '10px 12px',
            justifyContent: collapsed && !mobile ? 'center' : 'flex-start',
            width: '100%',
            borderRadius: '10px',
            background: 'none',
            border: 'none',
            color: '#F87171',
            cursor: 'pointer',
            fontSize: '13.5px',
            fontWeight: 400,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; e.currentTarget.style.color = '#FCA5A5'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#F87171'; }}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          {(!collapsed || mobile) && <span>Logout</span>}
        </button>
      </nav>
    </>
  );

  const sidebarW = collapsed ? 64 : 240;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F1F5F9' }}>

      {/* Desktop sidebar */}
      <aside style={{
        width: `${sidebarW}px`,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0D1526 0%, #111827 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
      }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <>
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            display: mobileOpen ? 'block' : 'none',
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 50,
            backdropFilter: 'blur(2px)',
          }}
        />
        <aside style={{
          position: 'fixed',
          top: 0, left: 0, bottom: 0,
          width: '240px',
          background: 'linear-gradient(180deg, #0D1526 0%, #111827 100%)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 55,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <SidebarContent mobile />
        </aside>
      </>

      {/* Main area */}
      <div style={{
        marginLeft: `${sidebarW}px`,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        transition: 'margin-left 0.25s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* Top bar */}
        <header style={{
          height: '60px',
          background: 'white',
          borderBottom: '1px solid #E9EDF3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          gap: '16px',
        }}>
          {/* Left: mobile menu + breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setMobileOpen(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#64748B', padding: '4px', borderRadius: '6px',
                display: 'flex',
              }}
            >
              <Menu size={20} />
            </button>
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                ESIcodeHub
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                {pageTitle}
              </div>
            </div>
          </div>

          {/* Right: search + bell + avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#F8FAFC', border: '1px solid #E2E8F0',
              borderRadius: '8px', padding: '6px 12px',
            }}>
              <Search size={14} color="#94A3B8" />
              <input
                placeholder="Search…"
                style={{
                  border: 'none', background: 'none', outline: 'none',
                  fontSize: '13px', color: '#374151', width: '160px',
                }}
              />
            </div>

            <button style={{
              position: 'relative',
              background: '#F8FAFC', border: '1px solid #E2E8F0',
              borderRadius: '8px', width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#64748B',
            }}>
              <Bell size={16} />
              <span style={{
                position: 'absolute', top: '7px', right: '7px',
                width: '7px', height: '7px', background: '#EF4444',
                borderRadius: '50%', border: '1.5px solid white',
              }} />
            </button>

            <div style={{
              width: '36px', height: '36px',
              background: `linear-gradient(135deg, ${roleColor}, ${roleColor}99)`,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '12px', color: '#0F172A',
              cursor: 'pointer',
              boxShadow: `0 0 0 2px white, 0 0 0 3px ${roleColor}60`,
            }}>
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;