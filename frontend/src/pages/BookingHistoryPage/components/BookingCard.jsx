import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicketAlt, faCalendarAlt, faUsers, faMoneyBillWave,
  faCheckCircle, faClock, faTimesCircle, faExclamationCircle,
  faArrowRight, faExclamationTriangle, faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const STATUS_CONFIG = {
  PENDING:        { label: "Chờ xác nhận",      icon: faClock,             color: "status-pending"   },
  PAID:           { label: "Đã thanh toán",      icon: faCheckCircle,       color: "status-paid"      },
  PARTIALLY_PAID: { label: "Thanh toán 1 phần",  icon: faExclamationCircle, color: "status-partial"   },
  CANCELLED:      { label: "Đã huỷ",             icon: faTimesCircle,       color: "status-cancelled" },
};

const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price) + " đ";

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("vi-VN", {
        day: "2-digit", month: "2-digit", year: "numeric",
      })
    : "—";

// ─── Cancel Modal ─────────────────────────────────────────────────────────────
const CancelModal = ({ booking, onConfirm, onClose }) => {
  const bookingId = booking.id ?? booking.Id;

  const policies = [
    { range: "Trước 15 ngày khởi hành",  fee: "Hoàn 90% tổng tiền tour" },
    { range: "Trước 10–14 ngày",          fee: "Hoàn 70% tổng tiền tour" },
    { range: "Trước 7–9 ngày",            fee: "Hoàn 50% tổng tiền tour" },
    { range: "Trước 3–6 ngày",            fee: "Hoàn 30% tổng tiền tour" },
    { range: "Dưới 3 ngày / không báo",   fee: "Không hoàn tiền"          },
  ];

  return (
    <div className="bh-modal-overlay" onClick={onClose}>
      <div className="bh-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="bh-modal-header">
          <div className="bh-modal-icon">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
          <h2 className="bh-modal-title">Xác nhận huỷ đơn</h2>
          <p className="bh-modal-subtitle">
            Đơn đặt tour <strong>#{bookingId}</strong>
          </p>
        </div>

        {/* Policy */}
        <div className="bh-modal-policy">
          <div className="bh-modal-policy-title">
            <FontAwesomeIcon icon={faShieldAlt} />
            Chính sách hoàn tiền khi huỷ tour
          </div>
          <table className="bh-policy-table">
            <thead>
              <tr>
                <th>Thời điểm huỷ</th>
                <th>Mức phí áp dụng</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((p, i) => (
                <tr key={i} className={i === policies.length - 1 ? "bh-policy-row-danger" : ""}>
                  <td>{p.range}</td>
                  <td><strong>{p.fee}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="bh-policy-note">
            ⚠️ Phí huỷ được tính dựa trên tổng giá trị đơn hàng. Tiền hoàn sẽ được xử lý trong 5–7 ngày làm việc.
          </p>
        </div>

        {/* Actions */}
        <div className="bh-modal-actions">
          <button className="bh-modal-btn-back" onClick={onClose}>
            Giữ đơn
          </button>
          <button className="bh-modal-btn-confirm" onClick={() => onConfirm(bookingId)}>
            <FontAwesomeIcon icon={faTimesCircle} />
            Xác nhận huỷ
          </button>
        </div>

      </div>
    </div>
  );
};

// ─── BookingCard ──────────────────────────────────────────────────────────────
const BookingCard = ({ booking, onCancel }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const bookingId = booking.id ?? booking.Id;
  const statusCfg = STATUS_CONFIG[booking.status] || STATUS_CONFIG.PENDING;

  const handleConfirmCancel = (id) => {
    setShowModal(false);
    onCancel(id);
  };

  return (
    <>
      <div className="bh-card">
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
          <h3 className="bh-card-title">{booking.tourTitle || "Tour không xác định"}</h3>

          <div className="bh-card-meta">
            <div className="bh-meta-item">
              <FontAwesomeIcon icon={faTicketAlt} />
              <span>Mã đặt chỗ: <strong>#{bookingId}</strong></span>
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

          {booking.status === "PARTIALLY_PAID" && (
            <div className="bh-remaining-notice">
              💡 Bạn còn nợ một phần tiền. Vui lòng thanh toán trước ngày khởi hành.
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bh-card-action">
          <button className="bh-btn-detail" onClick={() => navigate(`/bookings/${bookingId}`)}>
            Xem chi tiết <FontAwesomeIcon icon={faArrowRight} />
          </button>
          {booking.status === "PENDING" && (
            <button className="bh-btn-cancel" onClick={() => setShowModal(true)}>
              <FontAwesomeIcon icon={faTimesCircle} />
              Huỷ đơn
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <CancelModal
          booking={booking}
          onConfirm={handleConfirmCancel}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default BookingCard;