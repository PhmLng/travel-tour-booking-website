import React, { useState } from 'react';
import { dashStats, topTours, dashBookings, dashStatusMap } from './adminData';

const DashboardView = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      {/* ─── STAT CARDS ─── */}
      <div className="adm-stats-grid">
        {dashStats.map((s, i) => (
          <div key={i} className={`adm-stat-card ${s.cls}`}>
            <div className="adm-stat-top">
              <div>
                <div className="adm-stat-label">{s.label}</div>
                <div className="adm-stat-value">{s.value}</div>
              </div>
              <div className="adm-stat-icon">{s.icon}</div>
            </div>
            <div className="adm-stat-footer">
              <span className={`adm-stat-change ${s.up ? 'up' : 'down'}`}>
                {s.up ? '▲' : '▼'} {s.change}
              </span>
              <span className="adm-stat-period">so với tháng trước</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── MID GRID: Chart + Top Tours ─── */}
      <div className="adm-mid-grid">
        {/* Revenue Chart */}
        <div className="adm-panel">
          <div className="adm-panel-header">
            <div>
              <div className="adm-panel-title">Tăng trưởng doanh thu</div>
              <div className="adm-panel-sub">Phân tích thu nhập trong 12 tháng qua</div>
            </div>
            <button className="adm-panel-action">Xem báo cáo</button>
          </div>
          <div className="adm-chart-wrap">
            <svg
              viewBox="0 0 700 160"
              preserveAspectRatio="none"
              style={{ width: '100%', height: '100%' }}
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="40"  x2="700" y2="40"  stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="0" y1="80"  x2="700" y2="80"  stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="0" y1="120" x2="700" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <path
                d="M0,120 C60,110 100,130 175,80 C240,35 300,95 380,55 C450,20 520,75 600,40 C640,25 670,35 700,20 V160 H0 Z"
                fill="url(#grad1)"
              />
              <path
                d="M0,120 C60,110 100,130 175,80 C240,35 300,95 380,55 C450,20 520,75 600,40 C640,25 670,35 700,20"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="175" cy="80" r="4" fill="#f59e0b" stroke="#111520" strokeWidth="2" />
              <circle cx="380" cy="55" r="4" fill="#f59e0b" stroke="#111520" strokeWidth="2" />
              <circle cx="600" cy="40" r="4" fill="#f59e0b" stroke="#111520" strokeWidth="2" />
              <circle cx="700" cy="20" r="5" fill="#f59e0b" stroke="#111520" strokeWidth="2" />
            </svg>
          </div>
          <div className="adm-chart-labels">
            {['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        {/* Top Tours */}
        <div className="adm-panel">
          <div className="adm-panel-header">
            <div>
              <div className="adm-panel-title">Tour bán chạy</div>
              <div className="adm-panel-sub">Điểm đến phổ biến nhất</div>
            </div>
          </div>
          <div className="adm-top-tours">
            {topTours.map((t, i) => (
              <div key={i} className="adm-tour-bar">
                <div className="adm-tour-bar-top">
                  <span className="adm-tour-bar-name">{t.name}</span>
                  <span className="adm-tour-bar-pct">{t.pct}%</span>
                </div>
                <div className="adm-bar-track">
                  <div
                    className="adm-bar-fill"
                    style={{ width: `${t.pct}%`, background: t.gradient }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── RECENT BOOKINGS TABLE ─── */}
      <div className="adm-table-panel">
        <div className="adm-panel-header">
          <div>
            <div className="adm-panel-title">Đặt tour gần đây</div>
            <div className="adm-panel-sub">120 booking trong tháng này</div>
          </div>
          <button className="adm-panel-action">Lọc ▾</button>
        </div>
        <div className="adm-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Mã đặt tour</th>
                <th>Khách hàng</th>
                <th>Tên tour</th>
                <th>Ngày</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {dashBookings.map((b, i) => {
                const st = dashStatusMap[b.status];
                return (
                  <tr key={i}>
                    <td><span className="adm-td-id">{b.id}</span></td>
                    <td>
                      <div className="adm-td-customer">
                        <div className="adm-cust-avatar" style={{ background: b.avatar }}>
                          {b.initials}
                        </div>
                        <span>{b.name}</span>
                      </div>
                    </td>
                    <td className="adm-td-tour">{b.tour}</td>
                    <td className="adm-td-date">{b.date}</td>
                    <td className="adm-td-amount">{b.amount}</td>
                    <td><span className={`adm-status-pill ${st.cls}`}>{st.label}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="adm-action-btn">Chi tiết</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="adm-table-footer">
          <span>Hiển thị 5 / 120 booking</span>
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
            <button className="adm-page-btn">›</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
