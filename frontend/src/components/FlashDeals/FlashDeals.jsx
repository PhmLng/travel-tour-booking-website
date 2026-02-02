import React, { useState, useEffect } from 'react';
import './FlashDeals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faMapMarkerAlt, faCalendar, faClock, faUser } from '@fortawesome/free-solid-svg-icons';

const FlashDeals = () => {
  const deals = [
    {
      id: 1,
      image: '/tours/tour5.webp',
      title: 'Miền Tây: Sa Đéc Vào Xuân - Khám Phá Mùa Hoa Nở',
      code: 'NDSGN818-003-010226XE-H',
      departure: 'TP. Hồ Chí Minh',
      date: '01/02/2026',
      duration: 'Trong ngày',
      seats: 4,
      oldPrice: '899.000',
      price: '799.000',
      endTime: '2026-02-01T23:59:59'
    },
    {
      id: 2,
      image: '/tours/tour6.jpg',
      title: 'Sapa - Fansipan - Hà Nội - Yên Tử - Hạ Long - Ninh Bình - Tràng An - Bái Đính',
      code: 'NDSGN186-043-010226VU-V',
      departure: 'TP. Hồ Chí Minh',
      date: '01/02/2026',
      duration: '6N5D',
      seats: 2,
      oldPrice: '10.990.000',
      price: '10.190.000',
      endTime: '2026-02-01T23:00:00'
    },
    {
      id: 3,
      image: '/tours/tour4.jpg',
      title: 'Phú Quốc: Khám phá Nam Đảo - Bãi Sao - Thị Trấn Hoàng Hôn - Grand World - Vinwonder',
      code: 'NDSGN870-002-010226VU-H',
      departure: 'TP. Hồ Chí Minh',
      date: '01/02/2026',
      duration: '3N2D',
      seats: 2,
      oldPrice: '3.790.000',
      price: '3.590.000',
      endTime: '2026-02-01T20:00:00'
    }
  ];

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      deals.forEach(deal => {
        const now = new Date();
        const end = new Date(deal.endTime);
        const diff = end - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newTimeLeft[deal.id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimeLeft[deal.id] = 'Hết giờ';
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flash-deals">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">ƯU ĐÃI GIỜ CHÓT</h2>
          <p className="section-subtitle">
            Nhanh tay nắm bắt cơ hội giảm giá cuối cùng. Đặt ngay để không bỏ lỡ!
          </p>
        </div>

        <div className="deals-grid">
          {deals.map(deal => (
            <div key={deal.id} className="deal-item">
              <div className="deal-image">
                <img src={deal.image} alt={deal.title} />
                <span className="deal-badge">
                  {timeLeft[deal.id] || 'Đang tính...'}
                </span>
                <button className="favorite-btn">♡</button>
              </div>
              
              <div className="deal-content">
                <h3 className="deal-title">{deal.title}</h3>
                
                <div className="deal-info">
                  <div className="info-item">
                    <FontAwesomeIcon icon={faTicket} className="icon" />
                    <span>{deal.code}</span>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                    <span>Khởi hành: {deal.departure}</span>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faCalendar} className="icon" />
                    <span>Ngày khởi hành: {deal.date}</span>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faClock} className="icon" />
                    <span>{deal.duration}</span>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <span>Số chỗ còn: {deal.seats}</span>
                  </div>
                </div>

                <div className="deal-footer">
                  <div className="price-box">
                    <span className="old-price">Giá từ: {deal.oldPrice} đ</span>
                    <span className="current-price">{deal.price} đ</span>
                  </div>
                  <button className="book-btn">Đặt ngay</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="view-all-btn">Xem tất cả</button>
      </div>
    </section>
  );
};

export default FlashDeals;
