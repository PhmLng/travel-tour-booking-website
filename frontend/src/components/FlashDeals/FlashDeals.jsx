import React, { useState, useEffect } from 'react';
import './FlashDeals.css';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faCalendar,
  faClock
} from '@fortawesome/free-solid-svg-icons';

import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

const FlashDeals = () => {
  const location = useLocation();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams(location.search);
        const destination = searchParams.get('destination')?.trim();
        const date = searchParams.get('date');
        const price = searchParams.get('price');

        // Gọi API search hoặc lấy tất cả
        const url = destination
          ? `http://localhost:8080/api/v1/tours/search?title=${encodeURIComponent(destination)}`
          : `http://localhost:8080/api/v1/tours`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let data = await response.json();
        data = Array.isArray(data) ? data : [];

        // Lọc theo ngày ± 15 ngày
        if (date) {
          const searchDate = new Date(date);
          data = data.filter(deal => {
            if (!deal.startDate) return false;
            const tourDate = new Date(deal.startDate);
            const diffDays = Math.abs((tourDate - searchDate) / (1000 * 60 * 60 * 24));
            return diffDays <= 15; // ✅ Chấp nhận chênh lệch tối đa 15 ngày
          });
        }

        // Lọc theo ngân sách
        if (price && price !== 'all') {
          data = data.filter(deal => {
            const p = deal.price;
            if (price === 'under-5m') return p < 5_000_000;
            if (price === '5m-10m') return p >= 5_000_000 && p <= 10_000_000;
            if (price === '10m-20m') return p > 10_000_000 && p <= 20_000_000;
            if (price === 'over-20m') return p > 20_000_000;
            return true;
          });
        }

        setDeals(data);
      } catch (err) {
        console.error('Lỗi khi gọi API:', err);
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [location.search]);

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const searchParams = new URLSearchParams(location.search);
  const isFiltering = searchParams.get('destination') || searchParams.get('date') || searchParams.get('price');
  const displayedDeals = showAll ? deals : deals.slice(0, 6);

  return (
    <section className="flash-deals" id="flash-deals">
      <div className="container">

        <div className="section-header">
          <h2 className="section-title">ƯU ĐÃI NỔI BẬT</h2>
          <p className="section-subtitle">
            {isFiltering
              ? `Tìm thấy ${deals.length} tour phù hợp`
              : 'Khám phá các tour du lịch hấp dẫn với giá tốt nhất'
            }
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Đang tìm kiếm...
          </p>
        ) : deals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#999', marginBottom: '12px' }}>
              😕 Không tìm thấy tour phù hợp
            </p>
            <p style={{ fontSize: '14px', color: '#bbb' }}>
              Vui lòng thử lại với điều kiện tìm kiếm khác
            </p>
          </div>
        ) : (
          <>
            <div className="deals-grid">
              {displayedDeals.map(deal => (
                <Link
                  to={`/tour/${deal.id}`}
                  key={deal.id}
                  className="deal-item-link"
                >
                  <div className="deal-item">
                    <div className="deal-image" style={{ position: 'relative' }}>
                      <img
                        src={deal.mainImage || '/no-image.jpg'}
                        alt={deal.title}
                        onError={(e) => { e.target.src = '/no-image.jpg'; }}
                      />
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
                            {deal.price?.toLocaleString('vi-VN')} ₫
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
                {showAll ? 'Thu gọn' : `Xem tất cả (${deals.length})`}
              </button>
            )}
          </>
        )}

      </div>
    </section>
  );
};

export default FlashDeals;