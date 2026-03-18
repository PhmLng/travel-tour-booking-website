// src/components/Header/NotificationDropdown.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCheck, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import "./NotificationDropdown.css";

const TYPE_COLORS = {
  success: "#22c55e",
  warning: "#f97316",
  error:   "#ef4444",
  info:    "#3b82f6",
};

const timeAgo = (isoString) => {
  const diff = (Date.now() - new Date(isoString)) / 1000;
  if (diff < 60)    return "Vừa xong";
  if (diff < 3600)  return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
};

const NotificationDropdown = ({ notifications, onMarkAllRead, onMarkRead }) => {
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.isRead).length;

  const handleClick = (notif) => {
    onMarkRead(notif.id);
    if (notif.bookingId) navigate("/booking-history");
  };

  return (
    <div className="notif-dropdown">
      {/* Header */}
      <div className="notif-dropdown-header">
        <div className="notif-dropdown-title">
          <FontAwesomeIcon icon={faBell} />
          <span>Thông báo</span>
          {unread > 0 && <span className="notif-unread-badge">{unread}</span>}
        </div>
        {unread > 0 && (
          <button className="notif-mark-all" onClick={onMarkAllRead}>
            <FontAwesomeIcon icon={faCheck} /> Đọc tất cả
          </button>
        )}
      </div>

      {/* List */}
      <div className="notif-list">
        {notifications.length === 0 ? (
          <div className="notif-empty">
            <FontAwesomeIcon icon={faBell} className="notif-empty-icon" />
            <p>Chưa có thông báo nào</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`notif-item ${!n.isRead ? "unread" : ""}`}
              onClick={() => handleClick(n)}
            >
              <div
                className="notif-dot"
                style={{ backgroundColor: TYPE_COLORS[n.type] || TYPE_COLORS.info }}
              />
              <div className="notif-item-content">
                <p className="notif-item-title">{n.title}</p>
                <p className="notif-item-message">{n.message}</p>
                <span className="notif-item-time">{timeAgo(n.createdAt)}</span>
              </div>
              {!n.isRead && <div className="notif-unread-dot" />}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="notif-dropdown-footer">
          <button onClick={() => navigate("/booking-history")}>
            <FontAwesomeIcon icon={faTicketAlt} /> Xem lịch sử đặt tour
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
