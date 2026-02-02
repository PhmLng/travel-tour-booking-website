import React from 'react';
import './Header.css';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faBell, 
  faUser, 
  faBars 
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header">
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

              <button className="user-btn">
                <FontAwesomeIcon icon={faUser} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-main-content">
            <div className="logo">
              <img src="/Logo_booking_tour_website-removebg-preview.png" alt="Vietravel" />
              <p>Travel</p>
            </div>

            <nav className="main-nav">
              <a href="#" className="nav-link">Điểm đến</a>
              <a href="#" className="nav-link">Liên hệ</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
