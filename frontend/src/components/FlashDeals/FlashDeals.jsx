import React, { useState, useEffect } from 'react';
import './FlashDeals.css';
import { Link } from 'react-router-dom'; // ⭐ thêm Link

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faCalendar,
  faClock
} from '@fortawesome/free-solid-svg-icons';

import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

const FlashDeals = () => {

  const [deals, setDeals] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('/deals.json');
        const data = await response.json();
        setDeals(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Lỗi khi lấy deals:', err);
        setDeals([]);
      }
    };

    fetchDeals();
  }, []);

  const toggleFavorite = (id, e) => {
    e.preventDefault(); // ⭐ tránh Link bị click khi bấm heart

    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const displayedDeals = showAll ? deals : deals.slice(0, 6);

  if (!deals.length) return <p>Đang tải ưu đãi...</p>;

  return (
    <section className="flash-deals">
      <div className="container">

        <div className="section-header">
          <h2 className="section-title">ƯU ĐÃI NỔI BẬT</h2>
          <p className="section-subtitle">
            Khám phá các tour du lịch hấp dẫn với giá tốt nhất
          </p>
        </div>

        <div className="deals-grid">

          {displayedDeals.map(deal => (

            <Link
              to={`/tour/${deal.id}`}
              key={deal.id}
              className="deal-item-link"
            >
              <div className="deal-item">

                <div className="deal-image" style={{ position: 'relative' }}>
                  <img src={deal.mainImage} alt={deal.title} />

                  <button
                    className="favorite-btn"
                    onClick={(e) => toggleFavorite(deal.id, e)}
                  >
                    <FontAwesomeIcon
                      icon={favorites.includes(deal.id) ? faHeartSolid : faHeartRegular}
                      color={favorites.includes(deal.id) ? 'red' : 'white'}
                    />
                  </button>
                </div>

                <div className="deal-content">
                  <h3 className="deal-title">{deal.title}</h3>

                  <div className="deal-info">
                    <div className="info-item">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                      <span>Khởi hành: {deal.departureLocation}</span>
                    </div>

                    <div className="info-item">
                      <FontAwesomeIcon icon={faCalendar} className="icon" />
                      <span>Ngày đi: {deal.startDate}</span>
                    </div>

                    <div className="info-item">
                      <FontAwesomeIcon icon={faClock} className="icon" />
                      <span>{deal.duration}</span>
                    </div>
                  </div>

                  <div className="deal-footer">
                    <div className="price-box">
                      <span className="current-price">
                        {deal.price.toLocaleString('vi-VN')} ₫
                      </span>
                    </div>

                    <button className="book-btn">Đặt ngay</button>
                  </div>

                </div>

              </div>
            </Link>

          ))}

        </div>

        {deals.length > 6 && (
          <button
            className="view-all-btn"
            onClick={() => setShowAll(prev => !prev)}
          >
            {showAll ? 'Thu gọn' : 'Xem tất cả'}
          </button>
        )}

      </div>
    </section>
  );
};

export default FlashDeals;
