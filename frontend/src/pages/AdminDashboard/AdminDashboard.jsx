// import React, { useState } from 'react';

// /* ─── INLINE STYLES ─────────────────────────────────── */
// const css = `
// @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

// .adm-root {
//   display: flex;
//   height: 100vh;
//   overflow: hidden;
//   font-family: 'DM Sans', sans-serif;
//   color: #e8eaf2;
//   background: #0a0d14;
// }

// /* ─── SIDEBAR ─── */
// .adm-sidebar {
//   width: 240px;
//   flex-shrink: 0;
//   background: #111520;
//   border-right: 1px solid rgba(255,255,255,0.06);
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   overflow: hidden;
// }
// .adm-sidebar::before {
//   content: '';
//   position: absolute;
//   top: -80px; left: -80px;
//   width: 240px; height: 240px;
//   background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%);
//   pointer-events: none;
// }
// .adm-logo {
//   padding: 22px 20px 18px;
//   border-bottom: 1px solid rgba(255,255,255,0.06);
//   display: flex;
//   align-items: center;
//   gap: 10px;
// }
// .adm-logo-icon {
//   width: 36px; height: 36px;
//   background: linear-gradient(135deg, #f59e0b, #ef4444);
//   border-radius: 10px;
//   display: flex; align-items: center; justify-content: center;
//   font-size: 18px;
//   flex-shrink: 0;
// }
// .adm-logo-text {
//   font-family: 'Syne', sans-serif;
//   font-weight: 800;
//   font-size: 17px;
//   letter-spacing: -0.3px;
//   color: white;
// }
// .adm-logo-text span { color: #f59e0b; }
// .adm-nav {
//   flex: 1;
//   padding: 14px 12px;
//   display: flex;
//   flex-direction: column;
//   gap: 2px;
//   overflow-y: auto;
// }
// .adm-nav-label {
//   font-size: 10px;
//   font-weight: 600;
//   letter-spacing: 1.2px;
//   text-transform: uppercase;
//   color: #6b7280;
//   padding: 10px 10px 6px;
//   display: block;
// }
// .adm-nav-item {
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 10px 12px;
//   border-radius: 10px;
//   cursor: pointer;
//   border: none;
//   background: none;
//   color: #6b7280;
//   font-size: 13.5px;
//   font-weight: 500;
//   font-family: 'DM Sans', sans-serif;
//   text-align: left;
//   width: 100%;
//   transition: all 0.2s;
//   position: relative;
// }
// .adm-nav-item:hover { background: rgba(255,255,255,0.05); color: #e8eaf2; }
// .adm-nav-item.active { background: rgba(245,158,11,0.12); color: #f59e0b; }
// .adm-nav-item.active::before {
//   content: '';
//   position: absolute;
//   left: 0; top: 50%;
//   transform: translateY(-50%);
//   width: 3px; height: 20px;
//   background: #f59e0b;
//   border-radius: 0 3px 3px 0;
// }
// .adm-nav-icon { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
// .adm-badge {
//   margin-left: auto;
//   background: #f43f5e;
//   color: white;
//   font-size: 10px;
//   font-weight: 700;
//   padding: 2px 7px;
//   border-radius: 20px;
// }
// .adm-sidebar-footer {
//   padding: 14px;
//   border-top: 1px solid rgba(255,255,255,0.06);
// }
// .adm-user-card {
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 10px;
//   border-radius: 10px;
//   cursor: pointer;
//   transition: background 0.2s;
// }
// .adm-user-card:hover { background: rgba(255,255,255,0.04); }
// .adm-avatar {
//   width: 34px; height: 34px;
//   border-radius: 50%;
//   background: linear-gradient(135deg, #f59e0b, #ef4444);
//   display: flex; align-items: center; justify-content: center;
//   font-size: 12px; font-weight: 700; color: white;
//   flex-shrink: 0;
// }
// .adm-user-info { flex: 1; min-width: 0; }
// .adm-user-name { font-size: 13px; font-weight: 600; color: #e8eaf2; }
// .adm-user-role { font-size: 11px; color: #6b7280; }
// .adm-user-more { color: #6b7280; font-size: 16px; }

// /* ─── MAIN ─── */
// .adm-main {
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
//   min-width: 0;
// }

// /* ─── TOPBAR ─── */
// .adm-topbar {
//   height: 64px;
//   flex-shrink: 0;
//   background: #111520;
//   border-bottom: 1px solid rgba(255,255,255,0.06);
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 28px;
// }
// .adm-topbar-left h2 {
//   font-family: 'Syne', sans-serif;
//   font-size: 20px;
//   font-weight: 700;
//   color: white;
//   margin: 0;
// }
// .adm-topbar-left p { font-size: 12px; color: #6b7280; margin: 2px 0 0; }
// .adm-topbar-right { display: flex; align-items: center; gap: 10px; }
// .adm-search {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   background: #161b2e;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 10px;
//   padding: 8px 14px;
//   width: 210px;
//   transition: border-color 0.2s;
// }
// .adm-search:focus-within { border-color: #f59e0b; }
// .adm-search input {
//   background: none;
//   border: none;
//   outline: none;
//   color: #e8eaf2;
//   font-size: 13px;
//   font-family: 'DM Sans', sans-serif;
//   width: 100%;
// }
// .adm-search input::placeholder { color: #6b7280; }
// .adm-icon-btn {
//   width: 38px; height: 38px;
//   background: #161b2e;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 10px;
//   display: flex; align-items: center; justify-content: center;
//   cursor: pointer;
//   color: #6b7280;
//   transition: all 0.2s;
//   position: relative;
//   font-size: 16px;
//   user-select: none;
// }
// .adm-icon-btn:hover { border-color: rgba(255,255,255,0.12); color: #e8eaf2; }
// .adm-notif-dot {
//   position: absolute;
//   top: 8px; right: 8px;
//   width: 7px; height: 7px;
//   background: #f43f5e;
//   border-radius: 50%;
//   border: 1.5px solid #111520;
// }

// /* ─── CONTENT ─── */
// .adm-content {
//   flex: 1;
//   overflow-y: auto;
//   padding: 24px 28px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// }
// .adm-content::-webkit-scrollbar { width: 5px; }
// .adm-content::-webkit-scrollbar-track { background: transparent; }
// .adm-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

// /* ─── STATS ─── */
// .adm-stats-grid {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 14px;
// }
// .adm-stat-card {
//   background: #111520;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 14px;
//   padding: 18px 20px;
//   position: relative;
//   overflow: hidden;
//   transition: border-color 0.25s, transform 0.25s;
//   cursor: default;
//   animation: admFadeUp 0.5s ease both;
// }
// .adm-stat-card:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-2px); }
// .adm-stat-card:nth-child(1) { animation-delay: 0.05s; }
// .adm-stat-card:nth-child(2) { animation-delay: 0.10s; }
// .adm-stat-card:nth-child(3) { animation-delay: 0.15s; }
// .adm-stat-card:nth-child(4) { animation-delay: 0.20s; }
// .adm-stat-card::after {
//   content: '';
//   position: absolute;
//   bottom: -20px; right: -20px;
//   width: 80px; height: 80px;
//   border-radius: 50%;
//   opacity: 0.07;
//   transition: opacity 0.3s;
// }
// .adm-stat-card:hover::after { opacity: 0.14; }
// .adm-stat-card.c1::after { background: #f59e0b; }
// .adm-stat-card.c2::after { background: #3b82f6; }
// .adm-stat-card.c3::after { background: #10b981; }
// .adm-stat-card.c4::after { background: #f43f5e; }
// .adm-stat-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
// .adm-stat-label { font-size: 12px; color: #6b7280; font-weight: 500; }
// .adm-stat-value {
//   font-family: 'Syne', sans-serif;
//   font-size: 26px;
//   font-weight: 800;
//   color: white;
//   line-height: 1.1;
//   margin-top: 4px;
// }
// .adm-stat-icon {
//   width: 40px; height: 40px;
//   border-radius: 11px;
//   display: flex; align-items: center; justify-content: center;
//   font-size: 17px;
//   flex-shrink: 0;
// }
// .c1 .adm-stat-icon { background: rgba(245,158,11,0.15); }
// .c2 .adm-stat-icon { background: rgba(59,130,246,0.15); }
// .c3 .adm-stat-icon { background: rgba(16,185,129,0.15); }
// .c4 .adm-stat-icon { background: rgba(244,63,94,0.15); }
// .adm-stat-footer { display: flex; align-items: center; justify-content: space-between; }
// .adm-stat-change {
//   display: inline-flex;
//   align-items: center;
//   gap: 4px;
//   font-size: 12px;
//   font-weight: 600;
//   padding: 3px 8px;
//   border-radius: 20px;
// }
// .adm-stat-change.up { background: rgba(16,185,129,0.12); color: #10b981; }
// .adm-stat-change.down { background: rgba(244,63,94,0.12); color: #f43f5e; }
// .adm-stat-period { font-size: 11px; color: #6b7280; }

// /* ─── MID GRID ─── */
// .adm-mid-grid {
//   display: grid;
//   grid-template-columns: 1fr 320px;
//   gap: 14px;
//   animation: admFadeUp 0.5s ease 0.25s both;
// }
// .adm-panel {
//   background: #111520;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 14px;
//   overflow: hidden;
// }
// .adm-panel-header {
//   padding: 16px 20px 12px;
//   border-bottom: 1px solid rgba(255,255,255,0.06);
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }
// .adm-panel-title {
//   font-family: 'Syne', sans-serif;
//   font-size: 14px;
//   font-weight: 700;
//   color: white;
// }
// .adm-panel-sub { font-size: 12px; color: #6b7280; margin-top: 2px; }
// .adm-panel-action {
//   font-size: 12px;
//   color: #f59e0b;
//   cursor: pointer;
//   font-weight: 600;
//   background: rgba(245,158,11,0.1);
//   padding: 5px 12px;
//   border-radius: 20px;
//   border: none;
//   font-family: inherit;
//   transition: background 0.2s;
// }
// .adm-panel-action:hover { background: rgba(245,158,11,0.2); }
// .adm-chart-wrap { padding: 16px 20px 0; height: 180px; }
// .adm-chart-labels {
//   display: flex;
//   justify-content: space-between;
//   padding: 8px 20px 14px;
//   font-size: 11px;
//   color: #6b7280;
// }
// .adm-top-tours { padding: 14px 20px; display: flex; flex-direction: column; gap: 14px; }
// .adm-tour-bar-top { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; }
// .adm-tour-bar-name { color: #e8eaf2; font-weight: 500; }
// .adm-tour-bar-pct { color: #6b7280; }
// .adm-bar-track { height: 6px; background: rgba(255,255,255,0.06); border-radius: 10px; overflow: hidden; }
// .adm-bar-fill { height: 100%; border-radius: 10px; transition: width 1s cubic-bezier(0.4,0,0.2,1); }

// /* ─── TABLE ─── */
// .adm-table-panel {
//   background: #111520;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 14px;
//   overflow: hidden;
//   animation: admFadeUp 0.5s ease 0.35s both;
// }
// .adm-table-wrap { overflow-x: auto; }
// table { width: 100%; border-collapse: collapse; font-size: 13px; }
// thead tr { background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.06); }
// thead th {
//   padding: 12px 16px;
//   text-align: left;
//   font-size: 11px;
//   font-weight: 600;
//   letter-spacing: 0.8px;
//   text-transform: uppercase;
//   color: #6b7280;
//   white-space: nowrap;
// }
// tbody tr { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
// tbody tr:last-child { border-bottom: none; }
// tbody tr:hover { background: rgba(255,255,255,0.025); }
// tbody td { padding: 13px 16px; color: #e8eaf2; vertical-align: middle; }
// .adm-td-id { font-family: 'Syne', sans-serif; font-weight: 700; color: #f59e0b; font-size: 12px; }
// .adm-td-customer { display: flex; align-items: center; gap: 10px; }
// .adm-cust-avatar {
//   width: 30px; height: 30px;
//   border-radius: 50%;
//   font-size: 11px; font-weight: 700; color: white;
//   display: flex; align-items: center; justify-content: center;
//   flex-shrink: 0;
// }
// .adm-td-tour { color: #94a3b8; }
// .adm-td-date { color: #6b7280; font-size: 12px; }
// .adm-td-amount { font-family: 'Syne', sans-serif; font-weight: 700; color: white; }
// .adm-status-pill {
//   display: inline-flex;
//   align-items: center;
//   gap: 5px;
//   padding: 4px 10px;
//   border-radius: 20px;
//   font-size: 11px;
//   font-weight: 600;
//   white-space: nowrap;
// }
// .adm-status-pill::before { content: ''; width: 5px; height: 5px; border-radius: 50%; }
// .s-confirmed { background: rgba(16,185,129,0.1); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
// .s-confirmed::before { background: #10b981; }
// .s-pending { background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }
// .s-pending::before { background: #f59e0b; }
// .s-cancelled { background: rgba(244,63,94,0.1); color: #f43f5e; border: 1px solid rgba(244,63,94,0.2); }
// .s-cancelled::before { background: #f43f5e; }
// .s-paid { background: rgba(16,185,129,0.1); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
// .s-paid::before { background: #10b981; }
// .s-partial { background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }
// .s-partial::before { background: #f59e0b; }
// .s-refunded { background: rgba(139,92,246,0.1); color: #8b5cf6; border: 1px solid rgba(139,92,246,0.2); }
// .s-refunded::before { background: #8b5cf6; }
// .adm-action-btn {
//   background: none;
//   border: 1px solid rgba(255,255,255,0.08);
//   color: #6b7280;
//   padding: 5px 12px;
//   border-radius: 7px;
//   cursor: pointer;
//   font-size: 12px;
//   font-family: 'DM Sans', sans-serif;
//   transition: all 0.2s;
// }
// .adm-action-btn:hover { border-color: #f59e0b; color: #f59e0b; }
// .adm-table-footer {
//   padding: 14px 16px;
//   border-top: 1px solid rgba(255,255,255,0.06);
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   font-size: 12px;
//   color: #6b7280;
// }
// .adm-pagination { display: flex; gap: 6px; }
// .adm-page-btn {
//   width: 30px; height: 30px;
//   background: #161b2e;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 7px;
//   color: #6b7280;
//   cursor: pointer;
//   font-size: 12px;
//   font-family: 'DM Sans', sans-serif;
//   transition: all 0.2s;
//   display: flex; align-items: center; justify-content: center;
// }
// .adm-page-btn:hover { background: #f59e0b; border-color: #f59e0b; color: #000; font-weight: 700; }
// .adm-page-btn.active { background: #f59e0b; border-color: #f59e0b; color: #000; font-weight: 700; }

// /* ─── BOOKINGS PAGE ─── */
// .bk-header {
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
//   animation: admFadeUp 0.4s ease both;
// }
// .bk-header-left h1 {
//   font-family: 'Syne', sans-serif;
//   font-size: 26px;
//   font-weight: 800;
//   color: white;
//   margin: 0 0 4px;
// }
// .bk-header-left p { font-size: 13px; color: #6b7280; margin: 0; }
// .bk-header-actions { display: flex; gap: 10px; }
// .bk-btn {
//   display: flex;
//   align-items: center;
//   gap: 7px;
//   padding: 9px 18px;
//   border-radius: 10px;
//   cursor: pointer;
//   font-size: 13px;
//   font-weight: 600;
//   font-family: 'DM Sans', sans-serif;
//   border: none;
//   transition: all 0.2s;
// }
// .bk-btn-outline {
//   background: transparent;
//   border: 1px solid rgba(255,255,255,0.12);
//   color: #e8eaf2;
// }
// .bk-btn-outline:hover { border-color: #f59e0b; color: #f59e0b; }
// .bk-btn-primary {
//   background: linear-gradient(135deg, #f59e0b, #ef4444);
//   color: white;
// }
// .bk-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

// .bk-stats {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 14px;
//   animation: admFadeUp 0.4s ease 0.1s both;
// }
// .bk-stat {
//   background: #111520;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 14px;
//   padding: 18px 20px;
//   transition: border-color 0.2s, transform 0.2s;
// }
// .bk-stat:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-2px); }
// .bk-stat-label { font-size: 12px; color: #6b7280; font-weight: 500; margin-bottom: 8px; }
// .bk-stat-value {
//   font-family: 'Syne', sans-serif;
//   font-size: 24px;
//   font-weight: 800;
//   color: white;
//   margin-bottom: 8px;
// }
// .bk-stat-badge {
//   display: inline-flex;
//   align-items: center;
//   gap: 4px;
//   font-size: 11px;
//   font-weight: 600;
//   padding: 3px 8px;
//   border-radius: 20px;
// }
// .bk-stat-badge.green { background: rgba(16,185,129,0.12); color: #10b981; }
// .bk-stat-badge.blue { background: rgba(59,130,246,0.12); color: #3b82f6; }
// .bk-stat-badge.amber { background: rgba(245,158,11,0.12); color: #f59e0b; }
// .bk-stat-badge.red { background: rgba(244,63,94,0.12); color: #f43f5e; }

// .bk-filters {
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   animation: admFadeUp 0.4s ease 0.2s both;
// }
// .bk-filter-label { font-size: 13px; color: #6b7280; display: flex; align-items: center; gap: 6px; }
// .bk-select {
//   background: #161b2e;
//   border: 1px solid rgba(255,255,255,0.08);
//   border-radius: 9px;
//   padding: 7px 12px;
//   color: #e8eaf2;
//   font-size: 13px;
//   font-family: 'DM Sans', sans-serif;
//   cursor: pointer;
//   outline: none;
//   transition: border-color 0.2s;
// }
// .bk-select:focus { border-color: #f59e0b; }
// .bk-view-btns { margin-left: auto; display: flex; gap: 6px; }
// .bk-view-btn {
//   width: 34px; height: 34px;
//   background: #161b2e;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 8px;
//   display: flex; align-items: center; justify-content: center;
//   cursor: pointer;
//   color: #6b7280;
//   transition: all 0.2s;
//   font-size: 14px;
// }
// .bk-view-btn.active, .bk-view-btn:hover { background: #f59e0b; border-color: #f59e0b; color: #000; }

// .bk-table-panel {
//   background: #111520;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 14px;
//   overflow: hidden;
//   animation: admFadeUp 0.4s ease 0.3s both;
// }
// .bk-email { font-size: 11px; color: #6b7280; margin-top: 2px; }

// /* ─── CUSTOMERS PAGE ─── */
// .cu-header {
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
//   animation: admFadeUp 0.4s ease both;
// }
// .cu-header-left h1 {
//   font-family: 'Syne', sans-serif;
//   font-size: 26px;
//   font-weight: 800;
//   color: white;
//   margin: 0 0 4px;
// }
// .cu-header-left p { font-size: 13px; color: #6b7280; margin: 0; }
// .cu-search {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   background: #161b2e;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 10px;
//   padding: 9px 16px;
//   width: 280px;
//   transition: border-color 0.2s;
// }
// .cu-search:focus-within { border-color: #f59e0b; }
// .cu-search input {
//   background: none;
//   border: none;
//   outline: none;
//   color: #e8eaf2;
//   font-size: 13px;
//   font-family: 'DM Sans', sans-serif;
//   width: 100%;
// }
// .cu-search input::placeholder { color: #6b7280; }

// .cu-divider {
//   height: 1px;
//   background: rgba(255,255,255,0.06);
//   animation: admFadeUp 0.4s ease 0.1s both;
// }

// .cu-grid {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 16px;
//   animation: admFadeUp 0.4s ease 0.2s both;
// }
// .cu-card {
//   background: #111520;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 16px;
//   padding: 24px 20px 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 4px;
//   cursor: pointer;
//   transition: border-color 0.2s, transform 0.2s;
//   position: relative;
// }
// .cu-card:hover { border-color: rgba(245,158,11,0.3); transform: translateY(-3px); }
// .cu-avatar-wrap { position: relative; margin-bottom: 10px; }
// .cu-avatar-img {
//   width: 72px; height: 72px;
//   border-radius: 50%;
//   object-fit: cover;
//   border: 2px solid rgba(255,255,255,0.1);
//   background: #161b2e;
// }
// .cu-avatar-initials {
//   width: 72px; height: 72px;
//   border-radius: 50%;
//   display: flex; align-items: center; justify-content: center;
//   font-family: 'Syne', sans-serif;
//   font-size: 22px;
//   font-weight: 800;
//   color: white;
//   border: 2px solid rgba(255,255,255,0.1);
// }
// .cu-status-dot {
//   position: absolute;
//   bottom: 2px; right: 2px;
//   width: 14px; height: 14px;
//   border-radius: 50%;
//   border: 2px solid #111520;
// }
// .cu-status-dot.online { background: #10b981; }
// .cu-status-dot.offline { background: #6b7280; }
// .cu-status-dot.away { background: #f59e0b; }
// .cu-name {
//   font-family: 'Syne', sans-serif;
//   font-size: 15px;
//   font-weight: 700;
//   color: white;
//   text-align: center;
// }
// .cu-contact {
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   font-size: 12px;
//   color: #6b7280;
//   margin-bottom: 14px;
// }
// .cu-spent-label {
//   font-size: 10px;
//   font-weight: 600;
//   letter-spacing: 1px;
//   text-transform: uppercase;
//   color: #6b7280;
//   width: 100%;
//   padding-top: 14px;
//   border-top: 1px solid rgba(255,255,255,0.06);
// }
// .cu-spent-value {
//   font-family: 'Syne', sans-serif;
//   font-size: 20px;
//   font-weight: 800;
//   color: #3b82f6;
//   width: 100%;
// }

// .cu-pagination {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;
//   animation: admFadeUp 0.4s ease 0.35s both;
// }
// .cu-page-btn {
//   width: 34px; height: 34px;
//   background: #161b2e;
//   border: 1px solid rgba(255,255,255,0.06);
//   border-radius: 8px;
//   color: #6b7280;
//   cursor: pointer;
//   font-size: 13px;
//   font-family: 'DM Sans', sans-serif;
//   transition: all 0.2s;
//   display: flex; align-items: center; justify-content: center;
// }
// .cu-page-btn:hover { background: #f59e0b; border-color: #f59e0b; color: #000; font-weight: 700; }
// .cu-page-btn.active { background: #f59e0b; border-color: #f59e0b; color: #000; font-weight: 700; }
// .cu-page-dots { color: #6b7280; font-size: 13px; padding: 0 4px; }

// /* ─── ANIMATION ─── */
// @keyframes admFadeUp {
//   from { opacity: 0; transform: translateY(14px); }
//   to   { opacity: 1; transform: translateY(0); }
// }
// `;

// /* ─── DATA ─────────────────────────────────────────── */
// const dashStats = [
//   { label: 'Doanh thu tháng', value: '124,5M', change: '+12%', up: true, icon: '💰', cls: 'c1' },
//   { label: 'Đặt tour tháng này', value: '1,234', change: '+5.2%', up: true, icon: '📅', cls: 'c2' },
//   { label: 'Tour đang hoạt động', value: '45', change: '-2.4%', up: false, icon: '🗺', cls: 'c3' },
//   { label: 'Khách hàng mới', value: '340', change: '+8.1%', up: true, icon: '👤', cls: 'c4' },
// ];
// const topTours = [
//   { name: 'Thái Lan - Bangkok', pct: 85, gradient: 'linear-gradient(90deg,#f59e0b,#ef4444)' },
//   { name: 'Nhật Bản - Tokyo', pct: 72, gradient: 'linear-gradient(90deg,#3b82f6,#6366f1)' },
//   { name: 'Phú Quốc - Đảo ngọc', pct: 58, gradient: 'linear-gradient(90deg,#10b981,#06b6d4)' },
//   { name: 'Hạ Long - Vịnh biển', pct: 45, gradient: 'linear-gradient(90deg,#8b5cf6,#ec4899)' },
//   { name: 'Đà Lạt - Thành phố hoa', pct: 38, gradient: 'linear-gradient(90deg,#f43f5e,#f97316)' },
// ];
// const dashBookings = [
//   { id: '#BK-7829', name: 'Sarah Jenkins', initials: 'SJ', avatar: 'linear-gradient(135deg,#f59e0b,#ef4444)', tour: 'Bali Paradise Week', date: '24/10/2023', amount: '$1,240', status: 'confirmed' },
//   { id: '#BK-7830', name: 'Michael Chen', initials: 'MC', avatar: 'linear-gradient(135deg,#3b82f6,#6366f1)', tour: 'Tokyo City Lights', date: '24/10/2023', amount: '$850', status: 'pending' },
//   { id: '#BK-7831', name: 'Emma Wilson', initials: 'EW', avatar: 'linear-gradient(135deg,#10b981,#06b6d4)', tour: 'Swiss Alps Hiking', date: '23/10/2023', amount: '$2,100', status: 'confirmed' },
//   { id: '#BK-7832', name: 'James Rodriguez', initials: 'JR', avatar: 'linear-gradient(135deg,#8b5cf6,#ec4899)', tour: 'Safari Kenya', date: '22/10/2023', amount: '$3,450', status: 'cancelled' },
//   { id: '#BK-7833', name: 'Lisa Wong', initials: 'LW', avatar: 'linear-gradient(135deg,#f43f5e,#f97316)', tour: 'Paris Culinary Tour', date: '22/10/2023', amount: '$650', status: 'confirmed' },
// ];

// const bookingsData = [
//   { id: '#ORD-7829', name: 'Alice Johnson', email: 'alice@example.com', initials: 'AJ', avatar: 'linear-gradient(135deg,#f59e0b,#3b82f6)', tour: 'Sunset City Tour', departure: 'Oct 24, 2023', amount: '$120.00', status: 'paid' },
//   { id: '#ORD-7830', name: 'Bob Smith', email: 'bob.smith@test.com', initials: 'BS', avatar: 'linear-gradient(135deg,#6366f1,#3b82f6)', tour: 'Mountain Trek 3-Day', departure: 'Nov 02, 2023', amount: '$450.00', status: 'partial' },
//   { id: '#ORD-7831', name: 'Charlie Brown', email: 'charlie.b@mail.net', initials: 'CB', avatar: 'linear-gradient(135deg,#8b5cf6,#ec4899)', tour: 'Island Hopping', departure: 'Oct 28, 2023', amount: '$200.00', status: 'refunded' },
//   { id: '#ORD-7832', name: 'Dana White', email: 'dana.w@example.com', initials: 'DW', avatar: 'linear-gradient(135deg,#10b981,#06b6d4)', tour: 'Historical Walk', departure: 'Oct 25, 2023', amount: '$50.00', status: 'paid' },
//   { id: '#ORD-7833', name: 'Evan Wright', email: 'evan.wright@tech.io', initials: 'EW', avatar: 'linear-gradient(135deg,#f43f5e,#f97316)', tour: 'Night Safari', departure: 'Nov 10, 2023', amount: '$180.00', status: 'paid' },
//   { id: '#ORD-7834', name: 'Fiona Green', email: 'fiona.g@nature.org', initials: 'FG', avatar: 'linear-gradient(135deg,#10b981,#f59e0b)', tour: 'River Cruise', departure: 'Oct 30, 2023', amount: '$90.00', status: 'partial' },
//   { id: '#ORD-7835', name: 'George Hall', email: 'george.hall@edu.com', initials: 'GH', avatar: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', tour: 'Museum Pass', departure: 'Oct 24, 2023', amount: '$30.00', status: 'paid' },
//   { id: '#ORD-7836', name: 'Hannah Lee', email: 'h.lee@design.net', initials: 'HL', avatar: 'linear-gradient(135deg,#ef4444,#f59e0b)', tour: 'Food Tasting Tour', departure: 'Nov 05, 2023', amount: '$110.00', status: 'paid' },
// ];

// const customersData = [
//   { name: 'Alice Johnson', contact: 'alice@example.com', type: 'email', initials: 'AJ', bg: 'linear-gradient(135deg,#f59e0b,#3b82f6)', spent: '$1,200', status: 'online' },
//   { name: 'Bob Smith', contact: '+1 555-0102', type: 'phone', initials: 'BS', bg: 'linear-gradient(135deg,#6366f1,#3b82f6)', spent: '$850', status: 'offline' },
//   { name: 'Charlie Brown', contact: 'charlie@corp.com', type: 'email', initials: 'CB', bg: 'linear-gradient(135deg,#8b5cf6,#ec4899)', spent: '$2,300', status: 'online' },
//   { name: 'Diana Prince', contact: 'diana@example.com', type: 'email', initials: 'DP', bg: 'linear-gradient(135deg,#ec4899,#f43f5e)', spent: '$4,500', status: 'online' },
//   { name: 'Ethan Hunt', contact: '+1 555-0105', type: 'phone', initials: 'EH', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', spent: '$670', status: 'away' },
//   { name: 'Fiona Gallagher', contact: 'fiona@example.com', type: 'email', initials: 'FG', bg: 'linear-gradient(135deg,#10b981,#06b6d4)', spent: '$1,100', status: 'online' },
//   { name: 'George Martin', contact: 'george@example.com', type: 'email', initials: 'GM', bg: 'linear-gradient(135deg,#3b82f6,#6366f1)', spent: '$3,200', status: 'online' },
//   { name: 'Hannah Lee', contact: '+1 555-0108', type: 'phone', initials: 'HL', bg: 'linear-gradient(135deg,#f43f5e,#f97316)', spent: '$900', status: 'online' },
// ];

// const navItems = [
//   { icon: '▦', label: 'Dashboard', key: 'dashboard', badge: null },
//   { icon: '📅', label: 'Đặt tour', key: 'bookings', badge: 12 },
//   { icon: '🗺', label: 'Quản lý tour', key: 'tours', badge: null },
//   { icon: '👥', label: 'Khách hàng', key: 'customers', badge: null },
//   { icon: '📊', label: 'Thống kê', key: 'analytics', badge: null },
// ];
// const systemItems = [
//   { icon: '⚙', label: 'Cài đặt', key: 'settings' },
//   { icon: '❓', label: 'Trợ giúp', key: 'help' },
// ];

// const dashStatusMap = {
//   confirmed: { label: 'Xác nhận', cls: 's-confirmed' },
//   pending:   { label: 'Chờ duyệt', cls: 's-pending' },
//   cancelled: { label: 'Đã hủy',    cls: 's-cancelled' },
// };
// const bkStatusMap = {
//   paid:     { label: 'Paid',          cls: 's-paid' },
//   partial:  { label: 'Partially Paid',cls: 's-partial' },
//   refunded: { label: 'Refunded',      cls: 's-refunded' },
//   pending:  { label: 'Chờ duyệt',    cls: 's-pending' },
// };

// const pageTitles = {
//   dashboard: 'Tổng quan',
//   bookings: 'Đặt tour',
//   tours: 'Quản lý tour',
//   customers: 'Khách hàng',
//   analytics: 'Thống kê',
//   settings: 'Cài đặt',
//   help: 'Trợ giúp',
// };

// /* ─── VIEWS ─────────────────────────────────────────── */

// function DashboardView() {
//   const [currentPage, setCurrentPage] = useState(1);
//   return (
//     <>
//       <div className="adm-stats-grid">
//         {dashStats.map((s, i) => (
//           <div key={i} className={`adm-stat-card ${s.cls}`}>
//             <div className="adm-stat-top">
//               <div>
//                 <div className="adm-stat-label">{s.label}</div>
//                 <div className="adm-stat-value">{s.value}</div>
//               </div>
//               <div className="adm-stat-icon">{s.icon}</div>
//             </div>
//             <div className="adm-stat-footer">
//               <span className={`adm-stat-change ${s.up ? 'up' : 'down'}`}>{s.up ? '▲' : '▼'} {s.change}</span>
//               <span className="adm-stat-period">so với tháng trước</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="adm-mid-grid">
//         <div className="adm-panel">
//           <div className="adm-panel-header">
//             <div>
//               <div className="adm-panel-title">Tăng trưởng doanh thu</div>
//               <div className="adm-panel-sub">Phân tích thu nhập trong 12 tháng qua</div>
//             </div>
//             <button className="adm-panel-action">Xem báo cáo</button>
//           </div>
//           <div className="adm-chart-wrap">
//             <svg viewBox="0 0 700 160" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
//               <defs>
//                 <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
//                   <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
//                   <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
//                 </linearGradient>
//               </defs>
//               <line x1="0" y1="40" x2="700" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
//               <line x1="0" y1="80" x2="700" y2="80" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
//               <line x1="0" y1="120" x2="700" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
//               <path d="M0,120 C60,110 100,130 175,80 C240,35 300,95 380,55 C450,20 520,75 600,40 C640,25 670,35 700,20 V160 H0 Z" fill="url(#grad1)" />
//               <path d="M0,120 C60,110 100,130 175,80 C240,35 300,95 380,55 C450,20 520,75 600,40 C640,25 670,35 700,20" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//               <circle cx="175" cy="80" r="4" fill="#f59e0b" stroke="#111520" strokeWidth="2" />
//               <circle cx="380" cy="55" r="4" fill="#f59e0b" stroke="#111520" strokeWidth="2" />
//               <circle cx="600" cy="40" r="4" fill="#f59e0b" stroke="#111520" strokeWidth="2" />
//               <circle cx="700" cy="20" r="5" fill="#f59e0b" stroke="#111520" strokeWidth="2" />
//             </svg>
//           </div>
//           <div className="adm-chart-labels">
//             {['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'].map(m => (
//               <span key={m}>{m}</span>
//             ))}
//           </div>
//         </div>

//         <div className="adm-panel">
//           <div className="adm-panel-header">
//             <div>
//               <div className="adm-panel-title">Tour bán chạy</div>
//               <div className="adm-panel-sub">Điểm đến phổ biến nhất</div>
//             </div>
//           </div>
//           <div className="adm-top-tours">
//             {topTours.map((t, i) => (
//               <div key={i} className="adm-tour-bar">
//                 <div className="adm-tour-bar-top">
//                   <span className="adm-tour-bar-name">{t.name}</span>
//                   <span className="adm-tour-bar-pct">{t.pct}%</span>
//                 </div>
//                 <div className="adm-bar-track">
//                   <div className="adm-bar-fill" style={{ width: `${t.pct}%`, background: t.gradient }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="adm-table-panel">
//         <div className="adm-panel-header">
//           <div>
//             <div className="adm-panel-title">Đặt tour gần đây</div>
//             <div className="adm-panel-sub">120 booking trong tháng này</div>
//           </div>
//           <button className="adm-panel-action">Lọc ▾</button>
//         </div>
//         <div className="adm-table-wrap">
//           <table>
//             <thead>
//               <tr>
//                 <th>Mã đặt tour</th><th>Khách hàng</th><th>Tên tour</th>
//                 <th>Ngày</th><th>Số tiền</th><th>Trạng thái</th>
//                 <th style={{ textAlign: 'right' }}>Thao tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dashBookings.map((b, i) => {
//                 const st = dashStatusMap[b.status];
//                 return (
//                   <tr key={i}>
//                     <td><span className="adm-td-id">{b.id}</span></td>
//                     <td>
//                       <div className="adm-td-customer">
//                         <div className="adm-cust-avatar" style={{ background: b.avatar }}>{b.initials}</div>
//                         <span>{b.name}</span>
//                       </div>
//                     </td>
//                     <td className="adm-td-tour">{b.tour}</td>
//                     <td className="adm-td-date">{b.date}</td>
//                     <td className="adm-td-amount">{b.amount}</td>
//                     <td><span className={`adm-status-pill ${st.cls}`}>{st.label}</span></td>
//                     <td style={{ textAlign: 'right' }}><button className="adm-action-btn">Chi tiết</button></td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//         <div className="adm-table-footer">
//           <span>Hiển thị 5 / 120 booking</span>
//           <div className="adm-pagination">
//             <button className="adm-page-btn">‹</button>
//             {[1,2,3].map(p => (
//               <button key={p} className={`adm-page-btn ${currentPage === p ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
//             ))}
//             <button className="adm-page-btn">›</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function BookingsView() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const bkStats = [
//     { label: 'Total Revenue', value: '$124,592.00', badge: '+12%', badgeCls: 'green' },
//     { label: 'Active Bookings', value: '1,482', badge: '+5%', badgeCls: 'blue' },
//     { label: 'Pending Payments', value: '34', badge: 'Action Needed', badgeCls: 'amber' },
//     { label: 'Refund Requests', value: '12', badge: '3 Urgent', badgeCls: 'red' },
//   ];
//   return (
//     <>
//       <div className="bk-header">
//         <div className="bk-header-left">
//           <h1>Booking Management</h1>
//           <p>Monitor and manage all tour bookings, payments, and refunds efficiently.</p>
//         </div>
//         <div className="bk-header-actions">
//           <button className="bk-btn bk-btn-outline">⬇ Export CSV</button>
//           <button className="bk-btn bk-btn-primary">＋ New Booking</button>
//         </div>
//       </div>

//       <div className="bk-stats">
//         {bkStats.map((s, i) => (
//           <div key={i} className="bk-stat">
//             <div className="bk-stat-label">{s.label}</div>
//             <div className="bk-stat-value">{s.value}</div>
//             <span className={`bk-stat-badge ${s.badgeCls}`}>▲ {s.badge}</span>
//           </div>
//         ))}
//       </div>

//       <div className="bk-filters">
//         <span className="bk-filter-label">☰ Filter by:</span>
//         <select className="bk-select"><option>Status: All</option><option>Paid</option><option>Pending</option><option>Refunded</option></select>
//         <select className="bk-select"><option>Date: Last 30 Days</option><option>Last 7 Days</option><option>This Month</option></select>
//         <select className="bk-select"><option>Tour Type</option><option>City Tour</option><option>Adventure</option><option>Cultural</option></select>
//         <div className="bk-view-btns">
//           <button className="bk-view-btn active">⊞</button>
//           <button className="bk-view-btn">☰</button>
//         </div>
//       </div>

//       <div className="bk-table-panel">
//         <div className="adm-table-wrap">
//           <table>
//             <thead>
//               <tr>
//                 <th>Order ID</th><th>Customer Name</th><th>Tour Title</th>
//                 <th>Departure Date</th><th>Total Price</th><th>Status</th><th style={{textAlign:'right'}}>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookingsData.map((b, i) => {
//                 const st = bkStatusMap[b.status] || { label: b.status, cls: 's-pending' };
//                 return (
//                   <tr key={i}>
//                     <td><span className="adm-td-id">{b.id}</span></td>
//                     <td>
//                       <div className="adm-td-customer">
//                         <div className="adm-cust-avatar" style={{ background: b.avatar, width: 36, height: 36, fontSize: 12, borderRadius: 8 }}>{b.initials}</div>
//                         <div>
//                           <div style={{ color: '#e8eaf2', fontWeight: 500 }}>{b.name}</div>
//                           <div className="bk-email">{b.email}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="adm-td-tour">{b.tour}</td>
//                     <td className="adm-td-date">{b.departure}</td>
//                     <td className="adm-td-amount">{b.amount}</td>
//                     <td><span className={`adm-status-pill ${st.cls}`}>{st.label}</span></td>
//                     <td style={{textAlign:'right'}}><button className="adm-action-btn">⋯</button></td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//         <div className="adm-table-footer">
//           <span>Showing 1 to 8 of 128 results</span>
//           <div className="adm-pagination">
//             <button className="adm-page-btn">‹</button>
//             {[1,2,3].map(p => (
//               <button key={p} className={`adm-page-btn ${currentPage === p ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
//             ))}
//             <span style={{ color: '#6b7280', fontSize: 13, padding: '0 4px' }}>...</span>
//             <button className="adm-page-btn">16</button>
//             <button className="adm-page-btn">›</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function CustomersView() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const statusColors = { online: '#10b981', offline: '#6b7280', away: '#f59e0b' };
//   return (
//     <>
//       <div className="cu-header">
//         <div className="cu-header-left">
//           <h1>Customer Management</h1>
//           <p>Manage and view all registered customers across your platform.</p>
//         </div>
//         <div className="cu-search">
//           <span style={{ color: '#6b7280' }}>🔍</span>
//           <input placeholder="Search by name, email, or phone..." type="text" />
//         </div>
//       </div>

//       <div className="cu-divider" />

//       <div className="cu-grid">
//         {customersData.map((c, i) => (
//           <div key={i} className="cu-card">
//             <div className="cu-avatar-wrap">
//               <div className="cu-avatar-initials" style={{ background: c.bg }}>{c.initials}</div>
//               <div className="cu-status-dot" style={{ background: statusColors[c.status], bottom: 2, right: 2, position: 'absolute', width: 14, height: 14, borderRadius: '50%', border: '2px solid #111520' }} />
//             </div>
//             <div className="cu-name">{c.name}</div>
//             <div className="cu-contact">
//               <span>{c.type === 'email' ? '✉' : '📞'}</span>
//               <span>{c.contact}</span>
//             </div>
//             <div className="cu-spent-label">Total Spent</div>
//             <div className="cu-spent-value">{c.spent}</div>
//           </div>
//         ))}
//       </div>

//       <div className="cu-pagination">
//         <button className="cu-page-btn">‹</button>
//         {[1,2,3].map(p => (
//           <button key={p} className={`cu-page-btn ${currentPage === p ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
//         ))}
//         <span className="cu-page-dots">...</span>
//         <button className="cu-page-btn">12</button>
//         <button className="cu-page-btn">›</button>
//       </div>
//     </>
//   );
// }

// function PlaceholderView({ title }) {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 16, opacity: 0.4 }}>
//       <div style={{ fontSize: 48 }}>🚧</div>
//       <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: 'white' }}>{title}</div>
//       <div style={{ fontSize: 13, color: '#6b7280' }}>Tính năng đang được phát triển</div>
//     </div>
//   );
// }

// /* ─── MAIN COMPONENT ─────────────────────────────────── */
// const AdminDashboard = () => {
//   const [activeNav, setActiveNav] = useState('dashboard');

//   const renderContent = () => {
//     switch (activeNav) {
//       case 'dashboard': return <DashboardView />;
//       case 'bookings':  return <BookingsView />;
//       case 'customers': return <CustomersView />;
//       default:          return <PlaceholderView title={pageTitles[activeNav] || activeNav} />;
//     }
//   };

//   return (
//     <>
//       <style>{css}</style>
//       <div className="adm-root">
//         {/* SIDEBAR */}
//         <aside className="adm-sidebar">
//           <div className="adm-logo">
//             <div className="adm-logo-icon">✈</div>
//             <span className="adm-logo-text">Travel<span>Admin</span></span>
//           </div>
//           <nav className="adm-nav">
//             <span className="adm-nav-label">Menu chính</span>
//             {navItems.map(item => (
//               <button key={item.key} className={`adm-nav-item ${activeNav === item.key ? 'active' : ''}`} onClick={() => setActiveNav(item.key)}>
//                 <span className="adm-nav-icon">{item.icon}</span>
//                 <span>{item.label}</span>
//                 {item.badge && <span className="adm-badge">{item.badge}</span>}
//               </button>
//             ))}
//             <span className="adm-nav-label" style={{ marginTop: 16 }}>Hệ thống</span>
//             {systemItems.map(item => (
//               <button key={item.key} className={`adm-nav-item ${activeNav === item.key ? 'active' : ''}`} onClick={() => setActiveNav(item.key)}>
//                 <span className="adm-nav-icon">{item.icon}</span>
//                 <span>{item.label}</span>
//               </button>
//             ))}
//           </nav>
//           <div className="adm-sidebar-footer">
//             <div className="adm-user-card">
//               <div className="adm-avatar">AM</div>
//               <div className="adm-user-info">
//                 <div className="adm-user-name">Alex Morgan</div>
//                 <div className="adm-user-role">Quản trị viên</div>
//               </div>
//               <span className="adm-user-more">⋯</span>
//             </div>
//           </div>
//         </aside>

//         {/* MAIN */}
//         <main className="adm-main">
//           <header className="adm-topbar">
//             <div className="adm-topbar-left">
//               <h2>{pageTitles[activeNav] || activeNav}</h2>
//               <p>Thứ Tư, 04 tháng 3, 2026</p>
//             </div>
//             <div className="adm-topbar-right">
//               <div className="adm-search">
//                 <span>🔍</span>
//                 <input placeholder="Tìm kiếm..." type="text" />
//               </div>
//               <div className="adm-icon-btn">🔔<span className="adm-notif-dot" /></div>
//               <div className="adm-icon-btn">✉</div>
//             </div>
//           </header>

//           <div className="adm-content" key={activeNav}>
//             {renderContent()}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;