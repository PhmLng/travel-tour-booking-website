import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faBell,
  faUser,
  faChevronDown,
  faTimes,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import NotificationDropdown from "./NotificationDropdown";
import {
  getNotifications,
  getUnreadCount,
  markAllAsRead,
  markAsRead,
} from "../../api/notificationUtils";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const notifRef = useRef(null);

  // ── User state ──
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // ── Destination menu state ──
  const [showDestinationMenu, setShowDestinationMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("NƯỚC NGOÀI");

  // ── Notification state ──
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const destinationTabs = ["NƯỚC NGOÀI", "TRONG NƯỚC"];

  // ── Load notifications ──
  const loadNotifications = () => {
    if (!user?.id) return;
    setNotifications(getNotifications(user.id));
    setUnreadCount(getUnreadCount(user.id));
  };

  useEffect(() => {
    loadNotifications();
    window.addEventListener("notifications-updated", loadNotifications);
    return () => window.removeEventListener("notifications-updated", loadNotifications);
  }, [user]);

  // ── Đóng notification dropdown khi click ra ngoài ──
  useEffect(() => {
    const handleOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // ── Đóng destination menu khi click ra ngoài ──
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDestinationMenu(false);
      }
    };
    if (showDestinationMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDestinationMenu]);

  // ── Sync user từ localStorage ──
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem("user");
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ── Handlers ──
  const handleLogout = async () => {
    try {
      // await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    }
  };

  const handleUserClick = () => {
    if (user) {
      handleLogout();
    } else {
      navigate("/signin");
    }
  };

  const toggleDestinationMenu = () => {
    setShowDestinationMenu((prev) => !prev);
    if (!showDestinationMenu) {
      setActiveTab("NƯỚC NGOÀI");
    }
  };

  const handleDestinationClick = (destination) => {
    setShowDestinationMenu(false);
    navigate(`/category/${encodeURIComponent(destination)}`);
  };

  return (
    <header className="header" ref={menuRef}>
      {/* HEADER TOP */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="hotline">
              <span className="phone-icon">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <span className="phone-number">1800 646 888</span>
              <span className="hours"> - Từ 8:00 - 23:00 hằng ngày</span>
            </div>

            <div className="header-actions">
              {/* Notification bell */}
              <div className="notif-wrapper" ref={notifRef}>
                <button
                  className="notification-btn"
                  aria-label="Thông báo"
                  onClick={() => { setShowNotif((p) => !p); loadNotifications(); }}
                >
                  <FontAwesomeIcon icon={faBell} />
                  {unreadCount > 0 && (
                    <span className="notif-badge">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {showNotif && (
                  <NotificationDropdown
                    notifications={notifications}
                    onMarkAllRead={() => { markAllAsRead(user?.id); loadNotifications(); }}
                    onMarkRead={(id) => { markAsRead(user?.id, id); loadNotifications(); }}
                  />
                )}
              </div>

              <div className="currency">VND</div>

              <button className="user-btn" onClick={handleUserClick}>
                <FontAwesomeIcon icon={faUser} />
                <span className="user-text">
                  {user
                    ? user.fullname || user.username || user.name || "Tài khoản"
                    : "Đăng nhập"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER MAIN */}
      <div className="header-main">
        <div className="container">
          <div className="header-main-content">
            <Link to="/" className="logo">
              <img
                src="/Logo_booking_tour_website-removebg-preview.png"
                alt="logo"
              />
            </Link>

            <nav className="main-nav">
              <button
                className={`nav-link ${showDestinationMenu ? "active" : ""}`}
                onClick={toggleDestinationMenu}
                aria-expanded={showDestinationMenu}
                aria-haspopup="true"
              >
                Điểm đến
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`dropdown-icon ${showDestinationMenu ? "rotated" : ""}`}
                />
              </button>

              <Link
                to="/contact"
                className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
              >
                Liên hệ
              </Link>

              {user && (
                <Link
                  to="/booking-history"
                  className={`nav-link nav-link-history ${location.pathname === "/booking-history" ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faClockRotateLeft} />
                  Lịch sử đặt tour
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* DESTINATION MENU */}
      <div className={`destination-menu-wrapper ${showDestinationMenu ? "show" : ""}`}>
        <div className="destination-menu">
          <button
            className="close-menu-btn"
            onClick={() => setShowDestinationMenu(false)}
            aria-label="Đóng menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <div className="destination-menu-container">
            <div className="destination-sidebar">
              {destinationTabs.map((tab) => (
                <button
                  key={tab}
                  className={`destination-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="destination-content">
              {activeTab === "NƯỚC NGOÀI" && (
                <div className="destination-columns">
                  <div className="destination-column">
                    <h3>CHÂU Á</h3>
                    <ul>
                      {["Thái Lan", "Singapore", "Nhật Bản"].map((dest) => (
                        <li key={dest}>
                          <button onClick={() => handleDestinationClick(dest)}>{dest}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="destination-column">
                    <h3>CHÂU ÂU</h3>
                    <ul>
                      {["Pháp", "Ý", "Thụy Sĩ"].map((dest) => (
                        <li key={dest}>
                          <button onClick={() => handleDestinationClick(dest)}>{dest}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "TRONG NƯỚC" && (
                <div className="destination-columns">
                  <div className="destination-column">
                    <h3>MIỀN BẮC</h3>
                    <ul>
                      {["Hà Nội", "Sapa", "Hạ Long"].map((dest) => (
                        <li key={dest}>
                          <button onClick={() => handleDestinationClick(dest)}>{dest}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="destination-column">
                    <h3>MIỀN TRUNG</h3>
                    <ul>
                      {["Đà Nẵng", "Huế", "Hội An"].map((dest) => (
                        <li key={dest}>
                          <button onClick={() => handleDestinationClick(dest)}>{dest}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="destination-column">
                    <h3>MIỀN NAM</h3>
                    <ul>
                      {["TP. Hồ Chí Minh", "Phú Quốc", "Đà Lạt"].map((dest) => (
                        <li key={dest}>
                          <button onClick={() => handleDestinationClick(dest)}>{dest}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;