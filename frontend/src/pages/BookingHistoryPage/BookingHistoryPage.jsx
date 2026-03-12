import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicketAlt, faCalendarAlt, faUsers, faMoneyBillWave,
  faCheckCircle, faClock, faTimesCircle, faExclamationCircle,
  faArrowRight, faInbox,
} from "@fortawesome/free-solid-svg-icons";
import "./BookingHistoryPage.css";

const BASE_URL = "http://localhost:8080/api/v1";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN").format(price) + " đ";

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("vi-VN", {
        day: "2-digit", month: "2-digit", year: "numeric",
      })
    : "—";

const STATUS_CONFIG = {
  PENDING:        { label: "Chờ xác nhận", icon: faClock,            color: "status-pending" },
  PAID:           { label: "Đã thanh toán", icon: faCheckCircle,      color: "status-paid" },
  PARTIALLY_PAID: { label: "Thanh toán 1 phần", icon: faExclamationCircle, color: "status-partial" },
  CANCELLED:      { label: "Đã huỷ",       icon: faTimesCircle,       color: "status-cancelled" },
};

// ─── Main component ───────────────────────────────────────────────────────────
const BookingHistoryPage = () => {
  const navigate = useNavigate();

  const currentUser = (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  })();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings`);
      if (!res.ok) throw new Error("Không thể tải lịch sử đặt tour");
      const data = await res.json();
      // Tạm thời lọc theo userId ở frontend
      const myBookings = data.filter(
        (b) => b.userId === currentUser?.id || true // TODO: xoá "|| true" khi có API filter theo user
      );
      setBookings(myBookings);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const FILTERS = [
    { key: "ALL",           label: "Tất cả" },
    { key: "PENDING",       label: "Chờ xác nhận" },
    { key: "PAID",          label: "Đã thanh toán" },
    { key: "PARTIALLY_PAID",label: "Thanh toán 1 phần" },
    { key: "CANCELLED",     label: "Đã huỷ" },
  ];

  const filtered = filter === "ALL"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  if (loading) return (
    <>
      <Header />
      <div className="bh-loading">
        <div className="bh-spinner" />
        <p>Đang tải lịch sử đặt tour...</p>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Header />
      <div className="bh-page">
        <div className="bh-container">

          {/* ── Header ── */}
          <div className="bh-header">
            <div className="bh-header-left">
              <FontAwesomeIcon icon={faTicketAlt} className="bh-header-icon" />
              <div>
                <h1 className="bh-title">Lịch sử đặt tour</h1>
                <p className="bh-subtitle">
                  Xin chào, <strong>{currentUser?.fullName || currentUser?.username}</strong>!
                  Bạn có <strong>{bookings.length}</strong> đơn đặt tour.
                </p>
              </div>
            </div>
          </div>

          {/* ── Filter tabs ── */}
          <div className="bh-filters">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`bh-filter-btn ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
                <span className="bh-filter-count">
                  {f.key === "ALL"
                    ? bookings.length
                    : bookings.filter((b) => b.status === f.key).length}
                </span>
              </button>
            ))}
          </div>

          {/* ── Error ── */}
          {error && (
            <div className="bh-error">⚠️ {error}</div>
          )}

          {/* ── Empty state ── */}
          {!error && filtered.length === 0 && (
            <div className="bh-empty">
              <FontAwesomeIcon icon={faInbox} className="bh-empty-icon" />
              <p>Không có đơn đặt tour nào</p>
              <button className="bh-btn-explore" onClick={() => navigate("/")}>
                Khám phá tour ngay
              </button>
            </div>
          )}

          {/* ── Booking list ── */}
          <div className="bh-list">
            {filtered.map((booking) => {
              const statusCfg = STATUS_CONFIG[booking.status] || STATUS_CONFIG.PENDING;
              return (
                <div key={booking.id ?? booking.Id} className="bh-card">
                  {/* Tour image */}
                  <div className="bh-card-img-wrap">
                    <img
                      src={booking.mainImage || "/no-image.jpg"}
                      alt={booking.tourTitle}
                      onError={(e) => { e.target.src = "/no-image.jpg"; }}
                      className="bh-card-img"
                    />
                    <span className={`bh-status-badge ${statusCfg.color}`}>
                      <FontAwesomeIcon icon={statusCfg.icon} />
                      {statusCfg.label}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="bh-card-body">
                    <h3 className="bh-card-title">
                      {booking.tourTitle || "Tour không xác định"}
                    </h3>

                    <div className="bh-card-meta">
                      <div className="bh-meta-item">
                        <FontAwesomeIcon icon={faTicketAlt} />
                        <span>Mã đặt chỗ: <strong>#{booking.id ?? booking.Id}</strong></span>
                      </div>
                      <div className="bh-meta-item">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <span>Ngày đặt: <strong>{formatDate(booking.bookingDate)}</strong></span>
                      </div>
                      <div className="bh-meta-item">
                        <FontAwesomeIcon icon={faUsers} />
                        <span>Số khách: <strong>{booking.quantity}</strong></span>
                      </div>
                      <div className="bh-meta-item">
                        <FontAwesomeIcon icon={faMoneyBillWave} />
                        <span>Tổng tiền: <strong className="bh-price">{formatPrice(booking.totalPrice)}</strong></span>
                      </div>
                    </div>

                    {/* Remaining amount nếu PARTIALLY_PAID */}
                    {booking.status === "PARTIALLY_PAID" && (
                      <div className="bh-remaining-notice">
                        💡 Bạn còn nợ một phần tiền. Vui lòng thanh toán trước ngày khởi hành.
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <div className="bh-card-action">
                    <button
                      className="bh-btn-detail"
                      onClick={() => navigate(`/bookings/${booking.id ?? booking.Id}`)}
                    >
                      Xem chi tiết <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingHistoryPage;
