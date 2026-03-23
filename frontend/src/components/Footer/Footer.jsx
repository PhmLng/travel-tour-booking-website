import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const navigate = useNavigate();

  const goTo = (destination) => {
    navigate(`/category/${encodeURIComponent(destination)}`);
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">

            {/* Du lịch trong nước */}
            <div className="footer-column">
              <h4 className="footer-title">Du lịch trong nước</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Hà Nội'); }}>Hà Nội</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Hạ Long'); }}>Hạ Long</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Đà Nẵng'); }}>Đà Nẵng</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Nha Trang'); }}>Nha Trang</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Phan Thiết'); }}>Phan Thiết</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Phú Quốc'); }}>Phú Quốc</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Bắc Kạn'); }}>Bắc Kạn</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Quy Nhơn'); }}>Quy Nhơn</a></li>
              </ul>
            </div>

            {/* Du lịch nước ngoài */}
            <div className="footer-column">
              <h4 className="footer-title">Du lịch nước ngoài</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Trung Quốc'); }}>Trung Quốc</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Malaysia'); }}>Malaysia</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Hàn Quốc'); }}>Hàn Quốc</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Mỹ'); }}>Mỹ</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Đài Loan'); }}>Đài Loan</a></li>
              </ul>

              <h4 className="footer-title" style={{ marginTop: '24px' }}>Hướng</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Huế'); }}>Huế</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Quảng Bình'); }}>Quảng Bình</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Quảng Nam'); }}>Quảng Nam</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Đà Lạt'); }}>Đà Lạt</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Bà Rịa - Vũng Tàu'); }}>Bà Rịa - Vũng Tàu</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Cần Thơ'); }}>Cần Thơ</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Hà Giang'); }}>Hà Giang</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('Côn Đảo'); }}>Côn Đảo</a></li>
              </ul>
            </div>


            {/* Liên hệ */}
            <div className="footer-column">
              <h4 className="footer-title">Liên hệ</h4>
              <div className="contact-info">
                <p>Số 18 Phố Viên, phường Đức Thắng, quận Bắc Từ Liêm, Hà Nội</p>
                <p><a href="mailto:info@Travel.com">info@Travel.com</a></p>

                <div className="social-links">
                  <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
                  <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></a>
                  <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
                  <a href="#" className="social-icon"><FontAwesomeIcon icon={faYoutube} /></a>
                  <a href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedin} /></a>
                </div>

                <a href="tel:1800646888" className="hotline-btn">
                  <FontAwesomeIcon icon={faPhone} /> 1800 646 888
                </a>
                <p className="hours">Từ 8:00 - 23:00 hằng ngày</p>
              </div>
            </div>


            {/* Ứng dụng di động */}
            <div className="footer-column">
              <h4 className="footer-title">Ứng dụng di động</h4>
              <div className="app-downloads">
                <a href="#" className="app-btn">
                  <img src="/Google-Play.png" alt="Google Play" />
                </a>
                <a href="#" className="app-btn">
                  <img src="/App-Store.png" alt="App Store" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>Bản quyền của Travel © 2024.</p>
          <p>Bảo lưu mọi quyền. Ghi rõ nguồn "www.travel.com.vn" © khi sử dụng lại thông tin từ website này.</p>
          <p>Số 18 Phố Viên, phường Đức Thắng, quận Bắc Từ Liêm, Hà Nội</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;