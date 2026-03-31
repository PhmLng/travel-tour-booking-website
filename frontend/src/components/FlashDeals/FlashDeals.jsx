import React, { useState, useEffect } from "react";
import "./FlashDeals.css";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const BASE_URL = "http://localhost:8080/api/v1";

const FlashDeals = () => {
  const location = useLocation();

  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const size = 9;

  const searchParams = new URLSearchParams(location.search);
  const titleParam = searchParams.get("title") || "";
  const dateParam = searchParams.get("startDate") || "";
  const priceParam = searchParams.get("priceRange") || "";

  const isFiltering = titleParam || dateParam || priceParam;

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (titleParam) params.append("title", titleParam);
        // ❌ Không gửi startDate lên API vì backend lỗi 500 với LocalDateTime
        // ✅ Sẽ filter ngày ở frontend sau khi nhận data
        if (priceParam) params.append("priceRange", priceParam);

        let url;
        if (params.toString()) {
          url = `${BASE_URL}/tours/search?${params.toString()}`;
        } else {
          url = `${BASE_URL}/tours?page=${page + 1}&size=${size}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch thất bại");

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.content ?? data.data ?? [];

        // ✅ Filter ngày ở frontend: chỉ lấy tour có startDate >= ngày người dùng chọn
        const filtered = dateParam
          ? list.filter(tour => tour.startDate && tour.startDate >= dateParam)
          : list;

        setDeals(filtered); // ✅ setDeals(filtered) thay vì setDeals(list)

        if (!params.toString()) {
          setTotalPages(data.page?.totalPages ?? data.totalPages ?? 1);
        }
      } catch (err) {
        console.error("[FlashDeals] fetch error:", err);
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [location.search, page]);

  useEffect(() => {
    setPage(0);
    setShowAll(false);
  }, [location.search]);

  const displayedDeals = showAll ? deals : deals.slice(0, 6);

  return (
    <section className="flash-deals" id="flash-deals">
      <div className="flash-container">
        <div className="section-header">
          <h2 className="section-titlee">ƯU ĐÃI NỔI BẬT</h2>
          <p className="section-subtitle">
            {isFiltering
              ? `Tìm thấy ${deals.length} tour phù hợp`
              : "Khám phá các tour du lịch hấp dẫn với giá tốt nhất"}
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            Đang tìm kiếm...
          </p>
        ) : deals.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ fontSize: "18px", color: "#999", marginBottom: "12px" }}>
              Không tìm thấy tour phù hợp
            </p>
            <p style={{ fontSize: "14px", color: "#bbb" }}>
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
                    <div className="deal-image" style={{ position: "relative" }}>
                      <img
                        src={deal.mainImage || "/no-image.jpg"}
                        alt={deal.title}
                        onError={(e) => {
                          e.target.src = "/no-image.jpg";
                        }}
                      />
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
                            {(deal.adultPrice ?? deal.adult_price)?.toLocaleString("vi-VN")} ₫
                          </span>
                        </div>
                        <button className="book-btn">Đặt ngay</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {!isFiltering && showAll && totalPages > 1 && (
              <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`page-btn ${page === index ? "active" : ""}`}
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
                {showAll ? "Thu gọn" : "Xem tất cả"}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FlashDeals;