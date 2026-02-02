import React from 'react';
import './Footer.css';

// Import FontAwesome
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
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">

            {/* Du lịch trong nước */}
            <div className="footer-column">
              <h4 className="footer-title">Du lịch trong nước</h4>
              <ul className="footer-links">
                <li><a href="#">Hà Nội</a></li>
                <li><a href="#">Hạ Long</a></li>
                <li><a href="#">Đà Nẵng</a></li>
                <li><a href="#">Nha Trang</a></li>
                <li><a href="#">Phan Thiết</a></li>
                <li><a href="#">Phú Quốc</a></li>
                <li><a href="#">Bắc Kạn</a></li>
                <li><a href="#">Quy Nhơn</a></li>
              </ul>
            </div>

            {/* Du lịch nước ngoài */}
            <div className="footer-column">
              <h4 className="footer-title">Du lịch nước ngoài</h4>
              <ul className="footer-links">
                <li><a href="#">Trung Quốc</a></li>
                <li><a href="#">Malaysia</a></li>
                <li><a href="#">Hàn Quốc</a></li>
                <li><a href="#">Mỹ</a></li>
                <li><a href="#">Đài Loan</a></li>
              </ul>

              <h4 className="footer-title" style={{ marginTop: '24px' }}>Hướng</h4>
              <ul className="footer-links">
                <li><a href="#">Huế</a></li>
                <li><a href="#">Quảng Bình</a></li>
                <li><a href="#">Quảng Nam</a></li>
                <li><a href="#">Đà Lạt</a></li>
                <li><a href="#">Bà Rịa - Vũng Tàu</a></li>
                <li><a href="#">Cần Thơ</a></li>
                <li><a href="#">Hà Giang</a></li>
                <li><a href="#">Côn Đảo</a></li>
              </ul>
            </div>

            {/* Thông tin */}
            <div className="footer-column">
              <h4 className="footer-title">Thông tin</h4>
              <ul className="footer-links">
                <li><a href="#">Khảo sát tỷ lệ đạt visa</a></li>
                <li><a href="#">Tạp chí du lịch</a></li>
                <li><a href="#">Tin tức</a></li>
                <li><a href="#">Sitemap</a></li>
                <li><a href="#">Trợ giúp</a></li>
                <li><a href="#">Chính sách riêng tư</a></li>
                <li><a href="#">Thỏa thuận sử dụng</a></li>
                <li><a href="#">Chính sách bảo vệ dữ liệu cá nhân</a></li>
              </ul>
            </div>

            {/* Liên hệ */}
            <div className="footer-column">
              <h4 className="footer-title">Liên hệ</h4>
              <div className="contact-info">
                <p>Số 18 Phố Viên, phường Đức Thắng, quận Bắc Từ Liêm, Hà Nội</p>
                <p><a href="mailto:info@vietravel.com">info@Travel.com</a></p>

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

            {/* Dòng tour */}
            <div className="footer-column">
              <h4 className="footer-title">Dòng tour</h4>
              <ul className="footer-links">
                <li><a href="#">Cao cấp</a></li>
                <li><a href="#">Tiết kiệm</a></li>
                <li><a href="#">Tiêu chuẩn</a></li>
                <li><a href="#">Giá tốt</a></li>
              </ul>

              <h4 className="footer-title" style={{ marginTop: '24px' }}>Dịch vụ lẻ</h4>
              <ul className="footer-links">
                <li><a href="#">Vé máy bay</a></li>
                <li><a href="#">Khách sạn</a></li>
                <li><a href="#">Combo du lịch</a></li>
              </ul>
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

            {/* Chấp nhận thanh toán */}
            <div className="footer-column">
              <h4 className="footer-title">Chấp nhận thanh toán</h4>
              <div className="payment-methods">
                <img src="/Pay-by-Bank.png" alt="Thanh Toán" />
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
