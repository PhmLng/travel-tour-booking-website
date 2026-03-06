import React from 'react';
import { navItems, systemItems, pageTitles } from './adminData';

const AdminLayout = ({ activeNav, setActiveNav, children }) => {
  return (
    <div className="adm-root">
      {/* ─── SIDEBAR ─── */}
      <aside className="adm-sidebar">
        <div className="adm-logo">
          <div className="adm-logo-icon">✈</div>
          <span className="adm-logo-text">
            Travel<span>Admin</span>
          </span>
        </div>

        <nav className="adm-nav">
          <span className="adm-nav-label">Menu chính</span>
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`adm-nav-item ${activeNav === item.key ? 'active' : ''}`}
              onClick={() => setActiveNav(item.key)}
            >
              <span className="adm-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="adm-badge">{item.badge}</span>}
            </button>
          ))}

          <span className="adm-nav-label" style={{ marginTop: 16 }}>Hệ thống</span>
          {systemItems.map((item) => (
            <button
              key={item.key}
              className={`adm-nav-item ${activeNav === item.key ? 'active' : ''}`}
              onClick={() => setActiveNav(item.key)}
            >
              <span className="adm-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <div className="adm-user-card">
            <div className="adm-avatar">AM</div>
            <div className="adm-user-info">
              <div className="adm-user-name">Alex Morgan</div>
              <div className="adm-user-role">Quản trị viên</div>
            </div>
            <span className="adm-user-more">⋯</span>
          </div>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <main className="adm-main">
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <h2>{pageTitles[activeNav] || activeNav}</h2>
            <p>Thứ Tư, 04 tháng 3, 2026</p>
          </div>
          <div className="adm-topbar-right">
            <div className="adm-search">
              <span>🔍</span>
              <input placeholder="Tìm kiếm..." type="text" />
            </div>
            <div className="adm-icon-btn">
              🔔<span className="adm-notif-dot" />
            </div>
            <div className="adm-icon-btn">✉</div>
          </div>
        </header>

        <div className="adm-content" key={activeNav}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
