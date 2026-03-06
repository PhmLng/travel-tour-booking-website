import React, { useState } from 'react';
import { bookingsData, bkStatusMap } from './adminData';

const bkStats = [
  { label: 'Total Revenue',     value: '$124,592.00', badge: '+12%',         badgeCls: 'green' },
  { label: 'Active Bookings',   value: '1,482',       badge: '+5%',          badgeCls: 'blue'  },
  { label: 'Pending Payments',  value: '34',          badge: 'Action Needed',badgeCls: 'amber' },
  { label: 'Refund Requests',   value: '12',          badge: '3 Urgent',     badgeCls: 'red'   },
];

const BookingsView = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      {/* ─── HEADER ─── */}
      <div className="bk-header">
        <div className="bk-header-left">
          <h1>Booking Management</h1>
          <p>Monitor and manage all tour bookings, payments, and refunds efficiently.</p>
        </div>
        <div className="bk-header-actions">
          <button className="bk-btn bk-btn-outline">⬇ Export CSV</button>
          <button className="bk-btn bk-btn-primary">＋ New Booking</button>
        </div>
      </div>

      {/* ─── STAT CARDS ─── */}
      <div className="bk-stats">
        {bkStats.map((s, i) => (
          <div key={i} className="bk-stat">
            <div className="bk-stat-label">{s.label}</div>
            <div className="bk-stat-value">{s.value}</div>
            <span className={`bk-stat-badge ${s.badgeCls}`}>▲ {s.badge}</span>
          </div>
        ))}
      </div>

      {/* ─── FILTERS ─── */}
      <div className="bk-filters">
        <span className="bk-filter-label">☰ Filter by:</span>
        <select className="bk-select">
          <option>Status: All</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Refunded</option>
        </select>
        <select className="bk-select">
          <option>Date: Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>This Month</option>
        </select>
        <select className="bk-select">
          <option>Tour Type</option>
          <option>City Tour</option>
          <option>Adventure</option>
          <option>Cultural</option>
        </select>
        <div className="bk-view-btns">
          <button className="bk-view-btn active">⊞</button>
          <button className="bk-view-btn">☰</button>
        </div>
      </div>

      {/* ─── TABLE ─── */}
      <div className="bk-table-panel">
        <div className="adm-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Tour Title</th>
                <th>Departure Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((b, i) => {
                const st = bkStatusMap[b.status] || { label: b.status, cls: 's-pending' };
                return (
                  <tr key={i}>
                    <td><span className="adm-td-id">{b.id}</span></td>
                    <td>
                      <div className="adm-td-customer">
                        <div
                          className="adm-cust-avatar"
                          style={{ background: b.avatar, width: 36, height: 36, fontSize: 12, borderRadius: 8 }}
                        >
                          {b.initials}
                        </div>
                        <div>
                          <div style={{ color: '#e8eaf2', fontWeight: 500 }}>{b.name}</div>
                          <div className="bk-email">{b.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="adm-td-tour">{b.tour}</td>
                    <td className="adm-td-date">{b.departure}</td>
                    <td className="adm-td-amount">{b.amount}</td>
                    <td><span className={`adm-status-pill ${st.cls}`}>{st.label}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="adm-action-btn">⋯</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="adm-table-footer">
          <span>Showing 1 to 8 of 128 results</span>
          <div className="adm-pagination">
            <button className="adm-page-btn">‹</button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`adm-page-btn ${currentPage === p ? 'active' : ''}`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}
            <span style={{ color: '#6b7280', fontSize: 13, padding: '0 4px' }}>...</span>
            <button className="adm-page-btn">16</button>
            <button className="adm-page-btn">›</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingsView;
