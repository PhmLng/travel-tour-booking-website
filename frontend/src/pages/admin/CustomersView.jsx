import React, { useState } from 'react';
import { customersData } from './adminData';

const statusColors = {
  online:  '#10b981',
  offline: '#6b7280',
  away:    '#f59e0b',
};

const CustomersView = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      {/* ─── HEADER ─── */}
      <div className="cu-header">
        <div className="cu-header-left">
          <h1>Customer Management</h1>
          <p>Manage and view all registered customers across your platform.</p>
        </div>
        <div className="cu-search">
          <span style={{ color: '#6b7280' }}>🔍</span>
          <input placeholder="Search by name, email, or phone..." type="text" />
        </div>
      </div>

      <div className="cu-divider" />

      {/* ─── CUSTOMER GRID ─── */}
      <div className="cu-grid">
        {customersData.map((c, i) => (
          <div key={i} className="cu-card">
            <div className="cu-avatar-wrap">
              <div className="cu-avatar-initials" style={{ background: c.bg }}>
                {c.initials}
              </div>
              <div
                className="cu-status-dot"
                style={{
                  background: statusColors[c.status],
                  bottom: 2, right: 2,
                  position: 'absolute',
                  width: 14, height: 14,
                  borderRadius: '50%',
                  border: '2px solid #111520',
                }}
              />
            </div>
            <div className="cu-name">{c.name}</div>
            <div className="cu-contact">
              <span>{c.type === 'email' ? '✉' : '📞'}</span>
              <span>{c.contact}</span>
            </div>
            <div className="cu-spent-label">Total Spent</div>
            <div className="cu-spent-value">{c.spent}</div>
          </div>
        ))}
      </div>

      {/* ─── PAGINATION ─── */}
      <div className="cu-pagination">
        <button className="cu-page-btn">‹</button>
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            className={`cu-page-btn ${currentPage === p ? 'active' : ''}`}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        ))}
        <span className="cu-page-dots">...</span>
        <button className="cu-page-btn">12</button>
        <button className="cu-page-btn">›</button>
      </div>
    </>
  );
};

export default CustomersView;
