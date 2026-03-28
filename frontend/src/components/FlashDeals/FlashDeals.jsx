import React, { useState, useEffect } from 'react';
import './FlashDeals.css';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faCalendar,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

const BASE_URL = 'http://localhost:8080/api/v1';

// ─── Lọc theo ngày và giá ở frontend ─────────────────────────────────────────
const PRICE_RANGES = {
  'under-5m': { min: 0, max: 5_000_000 },
  '5m-10m': { min: 5_000_000, max: 10_000_000 },
  '10m-20m': { min: 10_000_000, max: 20_000_000 },
  'over-20m': { min: 20_000_000, max: Infinity },
};

const applyFrontendFilters = (list, date, priceRange) => {
  let result = list;

  if (date) {
    result = result.filter((t) => t.startDate && t.startDate >= date);
  }

  if (priceRange && priceRange !== 'all' && PRICE_RANGES[priceRange]) {
    const { min, max } = PRICE_RANGES[priceRange];
    result = result.filter((t) => {
      const price = t.adultPrice ?? t.adult_price ?? 0;
      return price >= min && price < max;
    });
  }

  return result;
};

// ─── Component ────────────────────────────────────────────────────────────────
const FlashDeals = () => {
  const location = useLocation();
  const [allDeals, setAllDeals] = useState([]);   // raw từ API
  const [deals, setDeals] = useState([]);         // sau khi filter frontend
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 9;

  const searchParams = new URLSearchParams(location.search);
  const titleParam = searchParams.get('title') || '';
  const dateParam = searchParams.get('date') || '';
  const priceParam = searchParams.get('price') || 'all';
  const isFiltering = titleParam || dateParam || (priceParam && priceParam !== 'all');

  // ── Fetch khi URL thay đổi ──
  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        let list = [];

        if (titleParam) {
          // Gọi API search theo title
          const res = await fetch(
            `${BASE_URL}/tours/search?title=${encodeURIComponent(titleParam)}`
          );
          if (!res.ok) throw new Error('Search thất bại');
          list = await res.json();
        } else {
          // Gọi API lấy tất cả (có phân trang)
          const res = await fetch(
            `${BASE_URL}/tours?page=${page + 1}&size=${size}`
          );
          if (!res.ok) throw new Error('Không thể tải tour');
          const data = await res.json();
          list = Array.isArray(data) ? data : (data.content ?? data.data ?? []);
          setTotalPages(data.page?.totalPages ?? data.totalPages ?? 1);
        }

        setAllDeals(list);
      } catch (err) {
        console.error('[FlashDeals] fetch error:', err);
        setAllDeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [location.search, page]);

  useEffect(() => {
    setDeals(applyFrontendFilters(allDeals, dateParam, priceParam));
  }, [allDeals, dateParam, priceParam]);

  useEffect(() => {
    setPage(0);
    setShowAll(false);
  }, [location.search]);
  const toggleFavorite = (id, e) => {
    e.preventDefault();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const displayedDeals = showAll ? deals : deals.slice(0, 6);

  return (
    <section className="flash-deals" id="flash-deals">
      <div className="flash-container ">

        <div className="section-header">
          <h2 className="section-titlee">ƯU ĐÃI NỔI BẬT</h2>
          <p className="section-subtitle">
            {isFiltering
              ? `Tìm thấy ${deals.length} tour phù hợp`
              : 'Khám phá các tour du lịch hấp dẫn với giá tốt nhất'}
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Đang tìm kiếm...
          </p>
        ) : deals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#999', marginBottom: '12px' }}>
              Không tìm thấy tour phù hợp
            </p>
            <p style={{ fontSize: '14px', color: '#bbb' }}>
              Vui lòng thử lại với điều kiện tìm kiếm khác
            </p>
          </div>
        ) : (
          <>
            <div className="deals-grid">
              {displayedDeals.map((deal) => (
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
                            {(deal.adultPrice ?? deal.adult_price)?.toLocaleString('vi-VN')} ₫
                          </span>
                        </div>
                        <button className="book-btn">Đặt ngay</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {showAll && !titleParam && totalPages > 1 && (
              <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`page-btn ${page === index ? 'active' : ''}`}
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}

            {deals.length > 6 && (
              <button
                className="view-all-btn"
                onClick={() => {
                  setShowAll((prev) => !prev);
                  setPage(0);
                }}
              >
                {showAll ? 'Thu gọn' : 'Xem tất cả'}
              </button>
            )}
          </>
        )}

      </div>
    </section>
  );
};

export default FlashDeals;