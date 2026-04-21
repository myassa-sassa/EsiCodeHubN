// export const globalStyles = `
// @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

// :root {
//   --primary: #3B5BDB;
//   --primary-dark: #2A45B8;
//   --primary-light: #5E7AE6;
//   --secondary: #FFC533;
//   --secondary-dark: #E6B12E;
//   --success: #10B981;
//   --success-dark: #059669;
//   --danger: #EF4444;
//   --danger-dark: #DC2626;
//   --warning: #F59E0B;
//   --warning-dark: #D97706;
//   --dark: #0F172A;
//   --dark-light: #1E293B;
//   --gray-50: #F9FAFB;
//   --gray-100: #F3F4F6;
//   --gray-200: #E5E7EB;
//   --gray-300: #D1D5DB;
//   --gray-400: #9CA3AF;
//   --gray-500: #6B7280;
//   --gray-600: #4B5563;
//   --gray-700: #374151;
//   --gray-800: #1F2937;
//   --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//   --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
//   --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
//   --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
//   --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
//   --radius-sm: 0.5rem;
//   --radius-md: 0.75rem;
//   --radius-lg: 1rem;
//   --radius-xl: 1.5rem;
//   --radius-2xl: 2rem;
// }

// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// body {
//   font-family: 'Inter', system-ui, -apple-system, sans-serif;
//   background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
//   overflow: hidden;
//   color: var(--gray-800);
//   -webkit-font-smoothing: antialiased;
// }

// /* ========= APP LAYOUT ========= */
// .app {
//   display: flex;
//   height: 100vh;
//   width: 100%;
//   overflow: hidden;
// }

// /* ========= SIDEBAR ========= */
// .sidebar {
//   width: 280px;
//   background: linear-gradient(180deg, var(--dark) 0%, var(--dark-light) 100%);
//   display: flex;
//   flex-direction: column;
//   flex-shrink: 0;
//   backdrop-filter: blur(10px);
//   border-right: 1px solid rgba(255, 255, 255, 0.05);
// }

// .logo {
//   padding: 28px 24px;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//   display: flex;
//   align-items: baseline;
//   gap: 4px;
// }

// .logo-esi {
//   color: blue;
//   font-size: 22px;
//   font-weight: 800;
//   letter-spacing: -0.5px;
// }

// .logo-codehub {
//   color: var(--secondary);
//   font-size: 22px;
//   font-weight: 800;
//   letter-spacing: -0.5px;
// }

// .user-info-sidebar {
//   padding: 24px;
//   display: flex;
//   align-items: center;
//   gap: 14px;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.05);
// }

// .avatar-sidebar {
//   width: 48px;
//   height: 48px;
//   background: linear-gradient(135deg, var(--secondary), var(--primary-light));
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 700;
//   font-size: 18px;
//   color: var(--dark);
//   box-shadow: var(--shadow-md);
// }

// .user-name {
//   color: white;
//   font-weight: 600;
//   font-size: 15px;
//   margin-bottom: 4px;
// }

// .user-role {
//   color: rgba(255, 255, 255, 0.6);
//   font-size: 12px;
//   display: flex;
//   align-items: center;
//   gap: 6px;
// }

// .user-role::before {
//   content: "●";
//   color: var(--success);
//   font-size: 8px;
// }

// .menu {
//   flex: 1;
//   padding: 20px 16px;
//   overflow-y: auto;
// }

// .menu-btn {
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   width: 100%;
//   padding: 12px 16px;
//   margin-bottom: 6px;
//   background: none;
//   border: none;
//   color: rgba(255, 255, 255, 0.7);
//   cursor: pointer;
//   border-radius: var(--radius-md);
//   font-size: 14px;
//   font-weight: 500;
//   transition: all 0.2s ease;
// }

// .menu-btn:hover {
//   background: rgba(255, 255, 255, 0.08);
//   color: white;
//   transform: translateX(4px);
// }

// .menu-btn.active {
//   background: linear-gradient(90deg, rgba(59, 91, 219, 0.2), transparent);
//   color: var(--secondary);
//   border-left: 3px solid var(--secondary);
// }

// .menu-icon {
//   font-size: 20px;
//   width: 28px;
//   text-align: center;
// }

// .logout-divider {
//   height: 1px;
//   background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
//   margin: 20px 0 16px;
// }

// .logout-btn {
//   color: var(--danger) !important;
// }

// .logout-btn:hover {
//   background: rgba(239, 68, 68, 0.1) !important;
//   color: var(--danger) !important;
// }

// /* ========= MAIN CONTENT ========= */
// .main-content {
//   flex: 1;
//   overflow-y: auto;
//   background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
// }

// /* ========= DASHBOARD ========= */
// .dashboard-container {
//   padding: 28px 32px;
// }

// .topbar {
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(10px);
//   padding: 20px 28px;
//   border-radius: var(--radius-xl);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 28px;
//   border: 1px solid rgba(255, 255, 255, 0.8);
//   box-shadow: var(--shadow-sm);
// }

// .topbar h1 {
//   font-size: 24px;
//   font-weight: 700;
//   background: linear-gradient(135deg, var(--dark), var(--primary));
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
// }

// .topbar p {
//   color: var(--gray-500);
//   font-size: 13px;
//   margin-top: 6px;
// }

// .topbar-right {
//   display: flex;
//   align-items: center;
//   gap: 16px;
// }

// .search-wrapper {
//   position: relative;
// }

// .search-icon {
//   position: absolute;
//   left: 16px;
//   top: 50%;
//   transform: translateY(-50%);
//   font-size: 16px;
//   color: var(--gray-400);
// }

// .search {
//   padding: 12px 16px 12px 44px;
//   border: 1px solid var(--gray-200);
//   border-radius: 48px;
//   width: 300px;
//   font-size: 14px;
//   background: white;
//   transition: all 0.2s;
// }

// .search:focus {
//   outline: none;
//   border-color: var(--secondary);
//   box-shadow: 0 0 0 3px rgba(255, 197, 51, 0.1);
//   width: 340px;
// }

// .icon-btn {
//   width: 42px;
//   height: 42px;
//   border: 1px solid var(--gray-200);
//   border-radius: 50%;
//   background: white;
//   cursor: pointer;
//   font-size: 18px;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .icon-btn:hover {
//   background: var(--gray-50);
//   transform: scale(1.05);
//   border-color: var(--secondary);
// }

// .avatar-small {
//   width: 42px;
//   height: 42px;
//   background: linear-gradient(135deg, var(--primary), var(--primary-light));
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   font-weight: 700;
//   font-size: 16px;
//   cursor: pointer;
//   box-shadow: var(--shadow-sm);
// }

// /* Filters */
// .filters-bar {
//   background: white;
//   border-radius: var(--radius-lg);
//   padding: 20px 24px;
//   margin-bottom: 28px;
//   display: flex;
//   gap: 32px;
//   flex-wrap: wrap;
//   border: 1px solid var(--gray-200);
//   box-shadow: var(--shadow-sm);
// }

// .filter-group {
//   display: flex;
//   align-items: center;
//   gap: 14px;
// }

// .filter-label {
//   font-size: 13px;
//   font-weight: 600;
//   color: var(--gray-600);
// }

// .filter-buttons {
//   display: flex;
//   gap: 10px;
//   flex-wrap: wrap;
// }

// .filter-chip {
//   padding: 8px 18px;
//   border: 1px solid var(--gray-200);
//   border-radius: 40px;
//   background: white;
//   cursor: pointer;
//   font-size: 13px;
//   font-weight: 500;
//   transition: all 0.2s;
// }

// .filter-chip:hover {
//   background: var(--gray-50);
//   border-color: var(--secondary);
//   transform: translateY(-1px);
// }

// .filter-chip.active {
//   background: var(--secondary);
//   border-color: var(--secondary);
//   color: var(--dark);
//   font-weight: 600;
//   box-shadow: var(--shadow-sm);
// }

// /* Stats */
// .stats {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 24px;
//   margin-bottom: 28px;
// }

// .stat-card {
//   background: white;
//   border-radius: var(--radius-lg);
//   padding: 24px;
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   border: 1px solid var(--gray-200);
//   position: relative;
//   overflow: hidden;
//   cursor: pointer;
// }

// .stat-card::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 4px;
//   background: linear-gradient(90deg, var(--primary), var(--secondary));
//   transform: scaleX(0);
//   transform-origin: left;
//   transition: transform 0.3s ease;
// }

// .stat-card:hover {
//   transform: translateY(-4px);
//   box-shadow: var(--shadow-lg);
// }

// .stat-card:hover::before {
//   transform: scaleX(1);
// }

// .big-number {
//   font-size: 36px;
//   font-weight: 800;
//   margin: 12px 0 8px;
//   line-height: 1;
// }

// .big-number.blue { color: var(--primary); }
// .big-number.orange { color: var(--warning); }
// .big-number.red { color: var(--danger); }
// .big-number.green { color: var(--success); }

// .green { color: var(--success); }

// /* White Card */
// .white-card {
//   background: white;
//   border-radius: var(--radius-xl);
//   overflow: hidden;
//   margin-bottom: 28px;
//   border: 1px solid var(--gray-200);
//   box-shadow: var(--shadow-sm);
// }

// .card-header {
//   padding: 20px 24px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid var(--gray-200);
//   background: var(--gray-50);
// }

// .card-header h3 {
//   font-size: 16px;
//   font-weight: 700;
//   color: var(--gray-800);
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }

// .link {
//   background: none;
//   border: none;
//   color: var(--primary);
//   cursor: pointer;
//   font-size: 13px;
//   font-weight: 500;
//   transition: all 0.2s;
// }

// .link:hover {
//   color: var(--secondary);
//   transform: translateX(2px);
// }

// /* Table */
// .table {
//   width: 100%;
//   border-collapse: collapse;
// }

// .table th {
//   text-align: left;
//   padding: 16px 20px;
//   font-size: 12px;
//   font-weight: 600;
//   color: var(--gray-500);
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   border-bottom: 1px solid var(--gray-200);
//   background: var(--gray-50);
// }

// .table td {
//   padding: 16px 20px;
//   font-size: 14px;
//   border-bottom: 1px solid var(--gray-200);
//   transition: all 0.2s;
// }

// .table tr:hover td {
//   background: var(--gray-50);
// }

// .student {
//   display: flex;
//   align-items: center;
//   gap: 12px;
// }

// .initials {
//   width: 40px;
//   height: 40px;
//   background: linear-gradient(135deg, var(--primary-light), var(--primary));
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 700;
//   font-size: 14px;
//   color: white;
// }

// .student-id {
//   font-size: 11px;
//   color: var(--gray-400);
//   margin-top: 2px;
//   font-family: monospace;
// }

// .gray {
//   color: var(--gray-600);
//   font-weight: 500;
// }

// .lang {
//   padding: 6px 14px;
//   border-radius: 40px;
//   font-size: 12px;
//   font-weight: 500;
//   display: inline-block;
// }

// .status {
//   padding: 6px 14px;
//   border-radius: 40px;
//   font-size: 12px;
//   font-weight: 600;
//   display: inline-flex;
//   align-items: center;
//   gap: 6px;
// }

// .similarity {
//   display: flex;
//   align-items: center;
//   gap: 12px;
// }

// .bar {
//   width: 80px;
//   height: 6px;
//   background: var(--gray-200);
//   border-radius: 10px;
//   overflow: hidden;
// }

// .fill {
//   height: 100%;
//   border-radius: 10px;
//   transition: width 0.3s ease;
// }

// .review-btn, .view-btn, .report-btn {
//   border: none;
//   border-radius: 8px;
//   padding: 8px 14px;
//   font-size: 12px;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s;
//   display: inline-flex;
//   align-items: center;
//   gap: 6px;
// }

// .review-btn {
//   background: var(--primary);
//   color: white;
// }

// .review-btn:hover {
//   background: var(--primary-dark);
//   transform: scale(0.98);
// }

// .view-btn {
//   background: var(--gray-100);
//   color: var(--gray-700);
//   border: 1px solid var(--gray-200);
// }

// .view-btn:hover {
//   background: var(--gray-200);
//   transform: scale(0.98);
// }

// .report-btn {
//   background: var(--danger);
//   color: white;
// }

// .report-btn:hover {
//   background: var(--danger-dark);
//   transform: scale(0.98);
// }

// /* Activity Feed */
// .activity-feed-section {
//   background: white;
//   border-radius: var(--radius-xl);
//   padding: 24px;
//   border: 1px solid var(--gray-200);
//   box-shadow: var(--shadow-sm);
// }

// .activity-feed-section h3 {
//   margin-bottom: 20px;
//   font-size: 16px;
//   font-weight: 700;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }

// .activity-item {
//   display: flex;
//   gap: 14px;
//   padding: 14px 0;
//   border-bottom: 1px solid var(--gray-100);
//   transition: all 0.2s;
// }

// .activity-item:hover {
//   transform: translateX(4px);
// }

// .activity-item:last-child {
//   border-bottom: none;
// }

// .activity-item.urgent {
//   background: rgba(239, 68, 68, 0.03);
//   margin: 0 -24px;
//   padding: 14px 24px;
//   border-radius: var(--radius-md);
// }

// .activity-dot {
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   margin-top: 5px;
//   box-shadow: 0 0 0 3px rgba(59, 91, 219, 0.1);
//   animation: pulse 2s infinite;
// }

// @keyframes pulse {
//   0%, 100% { opacity: 1; transform: scale(1); }
//   50% { opacity: 0.6; transform: scale(0.9); }
// }

// .activity-content {
//   flex: 1;
// }

// .activity-time {
//   font-size: 11px;
//   color: var(--gray-400);
//   margin-top: 4px;
// }

// /* Modal */
// .modal {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.6);
//   backdrop-filter: blur(4px);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
//   animation: fadeIn 0.2s ease;
// }

// .modal-content {
//   background: white;
//   border-radius: var(--radius-xl);
//   padding: 28px;
//   width: 650px;
//   max-width: 90%;
//   max-height: 85vh;
//   overflow-y: auto;
//   position: relative;
//   animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   box-shadow: var(--shadow-xl);
// }

// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }

// @keyframes slideUp {
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// }

// .review-info {
//   background: linear-gradient(135deg, var(--gray-50), white);
//   padding: 20px;
//   border-radius: var(--radius-lg);
//   margin-bottom: 24px;
//   border: 1px solid var(--gray-200);
// }

// .review-info p {
//   margin: 8px 0;
//   font-size: 14px;
// }

// .code-section {
//   margin: 20px 0;
//   background: #1e1e2e;
//   border-radius: var(--radius-md);
//   overflow: hidden;
// }

// .code-section h3 {
//   padding: 14px 18px;
//   background: #2d2d3a;
//   color: var(--secondary);
//   margin: 0;
//   font-size: 14px;
//   font-weight: 600;
// }

// .code-preview {
//   margin: 0;
//   padding: 18px;
//   font-family: 'Courier New', 'JetBrains Mono', monospace;
//   font-size: 12px;
//   line-height: 1.5;
//   color: #e0e0e0;
//   white-space: pre-wrap;
//   word-wrap: break-word;
//   background: #1e1e2e;
//   max-height: 350px;
//   overflow: auto;
// }

// .feedback-section {
//   margin-top: 20px;
// }

// .feedback-section h3 {
//   margin-bottom: 12px;
//   font-size: 14px;
//   font-weight: 600;
// }

// .feedback-section textarea {
//   width: 100%;
//   padding: 14px;
//   border: 1px solid var(--gray-200);
//   border-radius: var(--radius-md);
//   font-family: inherit;
//   font-size: 13px;
//   resize: vertical;
//   background: var(--gray-50);
//   transition: all 0.2s;
// }

// .feedback-section textarea:focus {
//   outline: none;
//   border-color: var(--secondary);
//   background: white;
//   box-shadow: 0 0 0 3px rgba(255, 197, 51, 0.1);
// }

// .modal-buttons {
//   display: flex;
//   gap: 12px;
//   margin-top: 24px;
//   flex-wrap: wrap;
// }

// .approve, .flag, .changes, .report-modal {
//   flex: 1;
//   padding: 12px;
//   border: none;
//   border-radius: var(--radius-md);
//   cursor: pointer;
//   font-weight: 600;
//   font-size: 13px;
//   transition: all 0.2s;
// }

// .approve { background: var(--success); color: white; }
// .flag { background: var(--danger); color: white; }
// .changes { background: var(--warning); color: white; }
// .report-modal { background: var(--danger); color: white; }

// .approve:hover, .flag:hover, .changes:hover, .report-modal:hover {
//   transform: scale(0.98);
//   filter: brightness(0.95);
// }

// .close {
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   background: none;
//   border: none;
//   font-size: 24px;
//   cursor: pointer;
//   color: var(--gray-400);
//   transition: all 0.2s;
//   width: 32px;
//   height: 32px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
// }

// .close:hover {
//   background: var(--gray-100);
//   color: var(--danger);
// }

// /* Notification Toast */
// .notification-toast {
//   position: fixed;
//   bottom: 30px;
//   right: 30px;
//   background: var(--dark);
//   color: white;
//   padding: 14px 24px;
//   border-radius: var(--radius-md);
//   z-index: 1100;
//   animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   border-left: 4px solid var(--secondary);
//   box-shadow: var(--shadow-lg);
//   font-size: 14px;
//   font-weight: 500;
// }

// @keyframes slideInRight {
//   from { transform: translateX(100%); opacity: 0; }
//   to { transform: translateX(0); opacity: 1; }
// }

// /* ========= OTHER PAGES ========= */
// .page-container {
//   padding: 28px 32px;
// }

// .page-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 28px;
// }

// .page-header h1 {
//   font-size: 28px;
//   font-weight: 800;
//   background: linear-gradient(135deg, var(--dark), var(--primary));
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
// }

// .search-input {
//   padding: 12px 20px;
//   border: 1px solid var(--gray-200);
//   border-radius: 48px;
//   width: 300px;
//   font-size: 14px;
//   background: white;
//   transition: all 0.2s;
// }

// .search-input:focus {
//   outline: none;
//   border-color: var(--secondary);
//   box-shadow: 0 0 0 3px rgba(255, 197, 51, 0.1);
// }

// .filter-btn {
//   padding: 10px 24px;
//   border: 1px solid var(--gray-200);
//   border-radius: 48px;
//   background: white;
//   cursor: pointer;
//   font-size: 14px;
//   font-weight: 500;
//   transition: all 0.2s;
// }

// .filter-btn:hover {
//   background: var(--gray-50);
//   border-color: var(--secondary);
//   transform: translateY(-1px);
// }

// /* Stats Cards */
// .stats-cards {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 24px;
//   margin-bottom: 28px;
// }

// .stats-cards .stat-card {
//   background: white;
//   border-radius: var(--radius-lg);
//   padding: 20px 24px;
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   border: 1px solid var(--gray-200);
//   transition: all 0.3s ease;
// }

// .stats-cards .stat-card:hover {
//   transform: translateY(-2px);
//   box-shadow: var(--shadow-md);
// }

// .stat-icon {
//   font-size: 42px;
// }

// .stat-value {
//   font-size: 32px;
//   font-weight: 800;
//   color: var(--gray-800);
//   line-height: 1;
// }

// .stat-label {
//   font-size: 13px;
//   color: var(--gray-500);
//   margin-top: 4px;
// }

// /* Data Table */
// .data-table {
//   width: 100%;
//   background: white;
//   border-radius: var(--radius-xl);
//   border-collapse: collapse;
//   overflow: hidden;
//   box-shadow: var(--shadow-sm);
//   border: 1px solid var(--gray-200);
// }

// .data-table th,
// .data-table td {
//   padding: 16px 20px;
//   text-align: left;
//   border-bottom: 1px solid var(--gray-200);
// }

// .data-table th {
//   background: var(--gray-50);
//   font-size: 12px;
//   font-weight: 600;
//   color: var(--gray-500);
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// }

// .data-table tr:hover td {
//   background: var(--gray-50);
// }

// /* Version Badge */
// .version-badge {
//   background: linear-gradient(135deg, #EEF3FD, #E8F0FE);
//   color: var(--primary);
//   padding: 6px 12px;
//   border-radius: 20px;
//   font-size: 12px;
//   font-weight: 600;
//   display: inline-block;
//   box-shadow: var(--shadow-xs);
// }

// /* Checkbox */
// .data-table input[type="checkbox"] {
//   accent-color: var(--primary);
//   cursor: pointer;
//   width: 18px;
//   height: 18px;
//   transition: all 0.2s;
// }

// .data-table input[type="checkbox"]:hover {
//   transform: scale(1.1);
// }

// /* Compare Modal */
// .compare-container {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//   gap: 24px;
//   margin: 20px 0;
//   max-height: 500px;
//   overflow-y: auto;
//   padding: 5px;
// }

// .compare-version {
//   background: var(--gray-50);
//   border-radius: var(--radius-lg);
//   padding: 20px;
//   border: 1px solid var(--gray-200);
//   transition: all 0.3s ease;
// }

// .compare-version:hover {
//   box-shadow: var(--shadow-md);
//   transform: translateY(-2px);
// }

// .compare-version h3 {
//   color: var(--primary);
//   margin-bottom: 12px;
//   padding-bottom: 8px;
//   border-bottom: 1px solid var(--gray-200);
//   font-size: 16px;
// }

// .compare-version p {
//   margin: 8px 0;
//   font-size: 13px;
// }

// .compare-code {
//   margin-top: 12px;
// }

// .compare-code strong {
//   display: block;
//   margin-bottom: 8px;
//   font-size: 12px;
//   color: var(--gray-500);
// }

// .compare-code pre {
//   background: #1e1e2e;
//   color: #e0e0e0;
//   padding: 12px;
//   border-radius: var(--radius-sm);
//   font-size: 11px;
//   overflow-x: auto;
//   font-family: monospace;
//   line-height: 1.4;
// }

// /* Feedback styles */
// .feedback-list {
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// }

// .feedback-card {
//   background: white;
//   border-radius: var(--radius-lg);
//   padding: 20px;
//   border: 1px solid var(--gray-200);
//   transition: all 0.2s;
// }

// .feedback-card:hover {
//   box-shadow: var(--shadow-md);
//   transform: translateY(-2px);
// }

// .feedback-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 10px;
// }

// .feedback-content {
//   font-size: 14px;
//   color: var(--gray-600);
//   margin-bottom: 12px;
//   line-height: 1.5;
// }

// /* Profile styles */
// .profile-card {
//   background: white;
//   border-radius: var(--radius-xl);
//   padding: 32px;
//   border: 1px solid var(--gray-200);
//   box-shadow: var(--shadow-sm);
// }

// .profile-header {
//   display: flex;
//   gap: 24px;
//   align-items: center;
//   margin-bottom: 24px;
// }

// .profile-avatar-large {
//   width: 80px;
//   height: 80px;
//   background: linear-gradient(135deg, var(--secondary), var(--primary-light));
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 800;
//   font-size: 28px;
//   color: var(--dark);
//   flex-shrink: 0;
// }

// .profile-info {
//   flex: 1;
// }

// .profile-info h2 {
//   font-size: 22px;
//   font-weight: 700;
//   margin-bottom: 4px;
// }

// .profile-role {
//   color: var(--primary);
//   font-weight: 600;
//   font-size: 14px;
//   margin-bottom: 4px;
// }

// .profile-email {
//   color: var(--gray-500);
//   font-size: 14px;
// }

// .profile-stats {
//   display: flex;
//   gap: 16px;
//   margin-bottom: 24px;
//   flex-wrap: wrap;
// }

// .stat-badge {
//   background: var(--gray-50);
//   border: 1px solid var(--gray-200);
//   border-radius: var(--radius-md);
//   padding: 10px 18px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-size: 14px;
//   font-weight: 500;
// }

// .profile-details {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 16px;
// }

// .detail-row {
//   background: var(--gray-50);
//   border-radius: var(--radius-md);
//   padding: 14px 18px;
//   font-size: 14px;
//   display: flex;
//   gap: 10px;
// }

// .detail-row span:first-child {
//   color: var(--gray-500);
//   font-weight: 500;
//   flex-shrink: 0;
// }

// .full-width {
//   grid-column: 1/-1;
// }

// .edit-details {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 16px;
// }

// .edit-field {
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
// }

// .edit-field label {
//   font-size: 13px;
//   font-weight: 600;
//   color: var(--gray-600);
// }

// .edit-input, .edit-textarea {
//   padding: 10px 14px;
//   border: 1px solid var(--gray-200);
//   border-radius: var(--radius-md);
//   font-family: inherit;
//   font-size: 14px;
//   transition: all 0.2s;
// }

// .edit-input:focus, .edit-textarea:focus {
//   outline: none;
//   border-color: var(--secondary);
//   box-shadow: 0 0 0 3px rgba(255, 197, 51, 0.1);
// }

// /* ========= LANDING PAGE STYLES ========= */
// .landing-page {
//   background: #fff;
//   color: var(--dark);
//   overflow-x: hidden;
// }

// body:has(.landing-page) {
//   overflow: auto !important;
// }

// .landing-page {
//   overflow-y: auto;
//   height: 100vh;
//   width: 100%;
//   position: relative;
// }

// .navbar {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 100;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 18px 48px;
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(10px);
//   border-bottom: 1px solid rgba(0, 0, 0, 0.06);
// }

// .navbar ul {
//   display: flex;
//   list-style: none;
//   gap: 32px;
// }

// .navbar ul a {
//   text-decoration: none;
//   font-size: 15px;
//   font-weight: 500;
//   color: var(--gray-600);
//   transition: color 0.2s;
// }

// .navbar ul a:hover {
//   color: var(--primary);
// }

// .nav-right {
//   display: flex;
//   align-items: center;
//   gap: 12px;
// }

// .btn {
//   padding: 9px 20px;
//   border-radius: 10px;
//   border: none;
//   cursor: pointer;
//   font-size: 14px;
//   font-weight: 600;
//   transition: all 0.2s;
//   font-family: inherit;
// }

// .btn-ghost {
//   background: transparent;
//   color: var(--gray-700);
//   border: 1px solid var(--gray-200);
// }

// .btn-ghost:hover {
//   background: var(--gray-50);
//   border-color: var(--primary);
//   color: var(--primary);
// }

// .btn-gold-landing {
//   background: linear-gradient(90deg, var(--secondary-dark), var(--secondary));
//   color: var(--dark);
//   box-shadow: 0 2px 10px rgba(255, 197, 51, 0.3);
//   padding: 9px 20px;
//   border-radius: 10px;
//   border: none;
//   cursor: pointer;
//   font-size: 14px;
//   font-weight: 600;
//   transition: all 0.2s;
// }

// .btn-gold-landing:hover {
//   transform: translateY(-2px);
//   box-shadow: 0 6px 20px rgba(255, 197, 51, 0.4);
// }

// .btn-outline {
//   border: 2px solid var(--primary);
//   color: var(--primary);
//   background: transparent;
//   padding: 9px 20px;
//   border-radius: 10px;
//   cursor: pointer;
//   font-size: 14px;
//   font-weight: 600;
//   transition: all 0.2s;
// }

// .btn-outline:hover {
//   background: var(--primary);
//   color: #fff;
// }

// .btn-lg {
//   padding: 14px 30px !important;
//   font-size: 16px !important;
//   border-radius: 14px !important;
// }

// .hero {
//   min-height: 100vh;
//   padding: 120px 48px 80px;
//   display: flex;
//   align-items: center;
//   gap: 60px;
//   position: relative;
//   overflow: hidden;
//   background: linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 50%, #F0FDF4 100%);
// }

// .hero-left {
//   flex: 1;
//   max-width: 560px;
//   position: relative;
//   z-index: 1;
// }

// .hero-right {
//   flex: 1;
//   max-width: 520px;
//   position: relative;
//   z-index: 1;
// }

// .hero h1 {
//   font-size: 52px;
//   font-weight: 800;
//   line-height: 1.1;
//   margin-bottom: 20px;
//   letter-spacing: -1px;
// }

// .hero-desc {
//   font-size: 16px;
//   color: var(--gray-600);
//   line-height: 1.7;
//   margin-bottom: 28px;
// }

// .hero-btns {
//   display: flex;
//   gap: 16px;
//   margin-bottom: 20px;
//   flex-wrap: wrap;
// }

// .c-gold {
//   color: var(--secondary);
// }

// .c-blue {
//   color: var(--primary);
// }

// footer {
//   background: var(--dark);
//   padding: 36px 48px;
//   text-align: center;
// }

// .f-logo {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 2px;
//   margin-bottom: 18px;
// }

// .f-copy {
//   color: rgba(255, 255, 255, 0.4);
//   font-size: 13px;
// }

// /* ========= ADMIN DASHBOARD STYLES ========= */
// .admin-container {
//   padding: 28px 32px;
//   max-width: 1400px;
//   margin: 0 auto;
// }

// .admin-header {
//   background: white;
//   border-radius: var(--radius-xl);
//   padding: 24px 32px;
//   margin-bottom: 28px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border: 1px solid var(--gray-200);
//   box-shadow: var(--shadow-sm);
// }

// .admin-header h1 {
//   font-size: 28px;
//   font-weight: 800;
//   background: linear-gradient(135deg, var(--dark), var(--primary));
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
//   margin-bottom: 8px;
// }

// .admin-header p {
//   color: var(--gray-500);
//   font-size: 14px;
// }

// .admin-header-right {
//   display: flex;
//   align-items: center;
//   gap: 20px;
// }

// .admin-badge {
//   background: linear-gradient(135deg, var(--gray-50), white);
//   padding: 10px 18px;
//   border-radius: 40px;
//   border: 1px solid var(--gray-200);
//   font-size: 14px;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }

// .admin-icon {
//   font-size: 18px;
// }

// .admin-avatar {
//   width: 48px;
//   height: 48px;
//   background: linear-gradient(135deg, var(--secondary), var(--primary-light));
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 700;
//   font-size: 18px;
//   color: var(--dark);
//   cursor: pointer;
// }

// .admin-stats {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 24px;
//   margin-bottom: 28px;
// }

// .admin-tabs {
//   display: flex;
//   gap: 8px;
//   margin-bottom: 28px;
//   background: white;
//   padding: 8px 16px;
//   border-radius: var(--radius-xl);
//   border: 1px solid var(--gray-200);
//   flex-wrap: wrap;
// }

// .admin-tab {
//   padding: 10px 24px;
//   background: none;
//   border: none;
//   font-size: 14px;
//   font-weight: 600;
//   color: var(--gray-600);
//   cursor: pointer;
//   border-radius: var(--radius-md);
//   transition: all 0.2s;
// }

// .admin-tab:hover {
//   background: var(--gray-100);
//   color: var(--primary);
// }

// .admin-tab.active {
//   background: var(--primary);
//   color: white;
//   box-shadow: var(--shadow-sm);
// }

// .admin-table {
//   width: 100%;
//   background: white;
//   border-radius: var(--radius-xl);
//   border-collapse: collapse;
//   overflow: hidden;
//   box-shadow: var(--shadow-sm);
//   border: 1px solid var(--gray-200);
// }

// .admin-table th,
// .admin-table td {
//   padding: 16px 20px;
//   text-align: left;
//   border-bottom: 1px solid var(--gray-200);
// }

// .admin-table th {
//   background: var(--gray-50);
//   font-size: 12px;
//   font-weight: 600;
//   color: var(--gray-500);
//   text-transform: uppercase;
// }

// .admin-table tr:hover td {
//   background: var(--gray-50);
// }

// .role-badge, .status-badge, .year-badge {
//   padding: 6px 12px;
//   border-radius: 20px;
//   font-size: 12px;
//   font-weight: 600;
//   display: inline-flex;
//   align-items: center;
//   gap: 6px;
// }

// /* Scrollbar */
// ::-webkit-scrollbar {
//   width: 8px;
//   height: 8px;
// }

// ::-webkit-scrollbar-track {
//   background: var(--gray-100);
//   border-radius: 10px;
// }

// ::-webkit-scrollbar-thumb {
//   background: var(--gray-400);
//   border-radius: 10px;
// }

// ::-webkit-scrollbar-thumb:hover {
//   background: var(--gray-500);
// }

// /* Responsive */
// @media (max-width: 1100px) {
//   .stats, .stats-cards {
//     grid-template-columns: repeat(2, 1fr);
//   }
// }

// @media (max-width: 768px) {
//   .sidebar {
//     width: 80px;
//   }
//   .logo span, .user-info-sidebar > div, .menu-btn span:last-child {
//     display: none;
//   }
//   .menu-btn {
//     justify-content: center;
//     padding: 12px;
//   }
//   .menu-icon {
//     font-size: 22px;
//     width: auto;
//   }
//   .user-info-sidebar {
//     justify-content: center;
//   }
//   .stats, .stats-cards {
//     grid-template-columns: 1fr;
//   }
//   .topbar {
//     flex-direction: column;
//     gap: 16px;
//     align-items: flex-start;
//   }
//   .topbar-right {
//     width: 100%;
//   }
//   .search {
//     width: 100%;
//   }
//   .search:focus {
//     width: 100%;
//   }
//   .filters-bar {
//     flex-direction: column;
//     gap: 16px;
//   }
//   .page-header {
//     flex-direction: column;
//     gap: 16px;
//     align-items: flex-start;
//   }
// }
// `;



/***************************/ 
