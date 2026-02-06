import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faBell, faUser, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

  // State
  const [user, setUser] = useState(null);
  const [showDestinationMenu, setShowDestinationMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('NƯỚC NGOÀI');
  const menuRef = useRef(null);

  const destinationTabs = ['NƯỚC NGOÀI', 'TRONG NƯỚC'];

  // Handle user click
  const handleUserClick = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({ name: 'Ngô Văn A' });
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
                  {user ? user.name : 'Đăng nhập'}
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

            <div className="logo">
              <img src="/Logo_booking_tour_website-removebg-preview.png" alt="logo" />
              <p>Travel</p>
            </div>

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

              <a href="#" className="nav-link">Liên hệ</a>

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
                      <li><a href="#">Thái Lan</a></li>
                      <li><a href="#">Singapore</a></li>
                      <li><a href="#">Nhật Bản</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>CHÂU ÂU</h3>
                    <ul>
                      <li><a href="#">Pháp</a></li>
                      <li><a href="#">Ý</a></li>
                      <li><a href="#">Thụy Sĩ</a></li>
                    </ul>
                  </div>
                  <div className="destination-column">
                    <h3>CHÂU Á</h3>
                    <ul>
                      <li><a href="#">Thái Lan</a></li>
                      <li><a href="#">Singapore</a></li>
                      <li><a href="#">Nhật Bản</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>CHÂU ÂU</h3>
                    <ul>
                      <li><a href="#">Pháp</a></li>
                      <li><a href="#">Ý</a></li>
                      <li><a href="#">Thụy Sĩ</a></li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'TRONG NƯỚC' && (
                <div className="destination-columns">

                  <div className="destination-column">
                    <h3>MIỀN BẮC</h3>
                    <ul>
                      <li><a href="#">Hà Nội</a></li>
                      <li><a href="#">Hạ Long</a></li>
                      <li><a href="#">Sapa</a></li>
                      <li><a href="#">Ninh Bình</a></li>
                      <li><a href="#">Hà Giang</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>MIỀN BẮC</h3>
                    <ul>
                      <li><a href="#">Hà Nội</a></li>
                      <li><a href="#">Hạ Long</a></li>
                      <li><a href="#">Sapa</a></li>
                      <li><a href="#">Ninh Bình</a></li>
                      <li><a href="#">Hà Giang</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>MIỀN BẮC</h3>
                    <ul>
                      <li><a href="#">Hà Nội</a></li>
                      <li><a href="#">Hạ Long</a></li>
                      <li><a href="#">Sapa</a></li>
                      <li><a href="#">Ninh Bình</a></li>
                      <li><a href="#">Hà Giang</a></li>
                    </ul>
                  </div>

                  <div className="destination-column">
                    <h3>MIỀN BẮC</h3>
                    <ul>
                      <li><a href="#">Hà Nội</a></li>
                      <li><a href="#">Hạ Long</a></li>
                      <li><a href="#">Sapa</a></li>
                      <li><a href="#">Ninh Bình</a></li>
                      <li><a href="#">Hà Giang</a></li>
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
