import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Header.css';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faBell, faUser, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

  // State
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [showDestinationMenu, setShowDestinationMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('NƯỚC NGOÀI');
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const destinationTabs = ['NƯỚC NGOÀI', 'TRONG NƯỚC'];

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleUserClick = () => {
    if (user) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } else {
      navigate("/signin");
    }
  };
  // Toggle menu
  const toggleDestinationMenu = (e) => {
    e.preventDefault();
    setShowDestinationMenu(!showDestinationMenu);
    if (!showDestinationMenu) {
      setActiveTab('NƯỚC NGOÀI');
    }
  };

  // Navigate to category page
  const handleDestinationClick = (e, destination) => {
    e.preventDefault();
    setShowDestinationMenu(false);
    navigate(`/category/${encodeURIComponent(destination)}`);
  };

  // Close menu when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDestinationMenu(false);
      }
    };

    if (showDestinationMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDestinationMenu]);

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

              <button className="notification-btn">
                <FontAwesomeIcon icon={faBell} />
              </button>

              <div className="currency">VND</div>

              <button className="user-btn" onClick={handleUserClick}>
                <FontAwesomeIcon icon={faUser} />
                <span className="user-text">
                  {/* Đổi "fullname" thành đúng field backend trả về */}
                  {user ? (user.fullname || user.username || user.name) : 'Đăng nhập'}
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
              <img src="/Logo_booking_tour_website-removebg-preview.png" alt="logo" />
            </Link>

            <nav className="main-nav">

              <a
                href="#"
                className={`nav-link ${showDestinationMenu ? 'active' : ''}`}
                onClick={toggleDestinationMenu}
              >
                Điểm đến
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`dropdown-icon ${showDestinationMenu ? 'rotated' : ''}`}
                />
              </a>

              <Link to="/contact" className="nav-link">Liên hệ</Link>
            </nav>

          </div>
        </div>
      </div>

      <div className={`destination-menu-wrapper ${showDestinationMenu ? 'show' : ''}`}>

        <div className="destination-menu">

          <button
            className="close-menu-btn"
            onClick={() => setShowDestinationMenu(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <div className="destination-menu-container">

            {/* LEFT TAB */}
            <div className="destination-sidebar">
              {destinationTabs.map((tab, index) => (
                <button
                  key={index}
                  className={`destination-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* RIGHT CONTENT */}
            <div className="destination-content">

              {activeTab === 'NƯỚC NGOÀI' && (
                <div className="destination-columns">

                  <div className="destination-column">
                    <h3>CHÂU Á</h3>
                    <ul>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Thái Lan')}>Thái Lan</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Singapore')}>Singapore</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Nhật Bản')}>Nhật Bản</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>CHÂU ÂU</h3>
                    <ul>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Pháp')}>Pháp</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Ý')}>Ý</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Thụy Sĩ')}>Thụy Sĩ</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>CHÂU Á</h3>
                    <ul>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Thái Lan')}>Thái Lan</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Singapore')}>Singapore</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Nhật Bản')}>Nhật Bản</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>CHÂU ÂU</h3>
                    <ul>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Pháp')}>Pháp</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Ý')}>Ý</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Thụy Sĩ')}>Thụy Sĩ</a></li>
                    </ul>
                  </div>

                </div>
              )}

              {activeTab === 'TRONG NƯỚC' && (
                <div className="destination-columns">

                  <div className="destination-column">
                    <h3>MIỀN BẮC</h3>
                    <ul>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Hà Nội')}>Hà Nội</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Hạ Long')}>Hạ Long</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Sapa')}>Sapa</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Ninh Bình')}>Ninh Bình</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Hà Giang')}>Hà Giang</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>MIỀN TRUNG</h3>
                    <ul>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Đà Nẵng')}>Đà Nẵng</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Hội An')}>Hội An</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Huế')}>Huế</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Quy Nhơn')}>Quy Nhơn</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Nha Trang')}>Nha Trang</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>MIỀN NAM</h3>
                    <ul>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'TP. Hồ Chí Minh')}>TP. Hồ Chí Minh</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Phú Quốc')}>Phú Quốc</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Đà Lạt')}>Đà Lạt</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Vũng Tàu')}>Vũng Tàu</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Cần Thơ')}>Cần Thơ</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>ĐẢO & BIỂN</h3>
                    <ul>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Côn Đảo')}>Côn Đảo</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Cát Bà')}>Cát Bà</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Lý Sơn')}>Lý Sơn</a></li>
                      <li><a href="#" onClick={(e) => handleDestinationClick(e, 'Phú Quý')}>Phú Quý</a></li>
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