import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicketAlt, faCalendarAlt, faUsers, faMoneyBillWave,
  faCheckCircle, faClock, faTimesCircle, faExclamationCircle,
  faExclamationTriangle, faShieldAlt, faCreditCard, faHourglassHalf,
  faChild,
} from "@fortawesome/free-solid-svg-icons";
import { addNotification } from "../../../api/notificationUtils";

const BASE_URL = "http://localhost:8080/api/v1";

const getCurrentUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const STATUS_CONFIG = {
  PENDING: { label: "Chờ xác nhận", icon: faClock, color: "status-pending" },
  PAID: { label: "Đã thanh toán", icon: faCheckCircle, color: "status-paid" },
  PARTIALLY_PAID: { label: "Thanh toán 1 phần", icon: faExclamationCircle, color: "status-partial" },
  CANCELED: { label: "Đã huỷ", icon: faTimesCircle, color: "status-cancelled" }, // ← 1 chữ L
  CANCELED_PENDING: { label: "Chờ xác nhận huỷ", icon: faHourglassHalf, color: "status-pending-cancel" },
};

const formatPrice = (price) =>
  price != null ? new Intl.NumberFormat("vi-VN").format(price) + " đ" : "—";

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit", month: "2-digit", year: "numeric",
    })
    : "—";

// ─── Cancel Modal ─────────────────────────────────────────────────────────────
const CancelModal = ({ booking, onConfirm, onClose, loading }) => {
  const bookingId = booking.id ?? booking.Id;

  const policies = [
    { range: "Trước 15 ngày khởi hành", fee: "Hoàn 90% tổng tiền tour" },
    { range: "Trước 10–14 ngày", fee: "Hoàn 70% tổng tiền tour" },
    { range: "Trước 7–9 ngày", fee: "Hoàn 50% tổng tiền tour" },
    { range: "Trước 3–6 ngày", fee: "Hoàn 30% tổng tiền tour" },
    { range: "Dưới 3 ngày / không báo", fee: "Không hoàn tiền" },
  ];

  return (
    <div className="bh-modal-overlay" onClick={onClose}>
      <div className="bh-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bh-modal-header">
          <div className="bh-modal-icon">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
          <h2 className="bh-modal-title">Xác nhận huỷ đơn</h2>
          <p className="bh-modal-subtitle">
            Đơn đặt tour <strong>#{bookingId}</strong>
          </p>
        </div>

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
            Yêu cầu huỷ sẽ được gửi tới admin để xét duyệt. Tiền hoàn (nếu có) sẽ được xử lý
            trong 5–7 ngày làm việc sau khi được duyệt.
          </p>
        </div>

        <div className="bh-modal-actions">
          <button className="bh-modal-btn-back" onClick={onClose} disabled={loading}>
            Giữ đơn
          </button>
          <button
            className="bh-modal-btn-confirm"
            onClick={() => onConfirm(bookingId)}
            disabled={loading}
          >
            {loading ? (
              <><div className="bh-spinner-sm" /> Đang gửi...</>
            ) : (
              <><FontAwesomeIcon icon={faTimesCircle} /> Gửi yêu cầu huỷ</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── BookingCard ──────────────────────────────────────────────────────────────
const BookingCard = ({ booking, onStatusChange }) => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [showModal, setShowModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [remainingAmount, setRemainingAmount] = useState(null);

  const bookingId = booking.id ?? booking.Id;
  const statusCfg = STATUS_CONFIG[booking.status] || STATUS_CONFIG.PENDING;
  const canCancel = ["PENDING", "PAID", "PARTIALLY_PAID"].includes(booking.status);
  const totalPassengers =
    (booking.adultQuantity ?? 0) + (booking.childQuantity ?? 0);

  useEffect(() => {
    if (booking.status !== "PARTIALLY_PAID") return;
    fetch(`${BASE_URL}/bookings/${bookingId}/remaining`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.remainingAmount != null) setRemainingAmount(data.remainingAmount);
      })
      .catch(() => { });
  }, [bookingId, booking.status]);

  const handleConfirmCancel = async (id) => {
    setCancelLoading(true);
    setCancelError("");
    try {
      const res = await fetch(`${BASE_URL}/bookings/${id}/request-cancel`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Gửi yêu cầu huỷ thất bại. Vui lòng thử lại.");

      setShowModal(false);
      onStatusChange(id, "CANCELED_PENDING");

      // ── Thông báo yêu cầu huỷ đã được gửi ──
      if (currentUser?.id) {
        addNotification(currentUser.id, {
          title: "Yêu cầu huỷ đã được gửi ⏳",
          message: `Yêu cầu huỷ đơn #BOOK-${id} - "${booking.tourTitle || "Tour"}" đang chờ admin xét duyệt.`,
          type: "warning",
          bookingId: id,
        });
      }
    } catch (err) {
      setCancelError(err.message);
    } finally {
      setCancelLoading(false);
    }
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
              <span>Người lớn: <strong>{booking.adultQuantity ?? 0}</strong></span>
            </div>
            <div className="bh-meta-item">
              <FontAwesomeIcon icon={faChild} />
              <span>Trẻ em: <strong>{booking.childQuantity ?? 0}</strong></span>
            </div>
            <div className="bh-meta-item">
              <FontAwesomeIcon icon={faMoneyBillWave} />
              <span>Tổng tiền: <strong className="bh-price">{formatPrice(booking.totalPrice)}</strong></span>
            </div>
            <div className="bh-meta-item">
              <FontAwesomeIcon icon={faTicketAlt} />
              <span>Tổng chỗ: <strong>{totalPassengers} chỗ</strong></span>
            </div>
          </div>

          {booking.status === "PARTIALLY_PAID" && (
            <div className="bh-remaining-notice">
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span>
                Còn lại cần thanh toán:{" "}
                <strong>
                  {remainingAmount != null ? formatPrice(remainingAmount) : "Đang tải..."}
                </strong>
              </span>
            </div>
          )}

          {booking.status === "CANCELED_PENDING" && (
            <div className="bh-pending-cancel-notice">
              <FontAwesomeIcon icon={faHourglassHalf} />
              Yêu cầu huỷ đã được gửi, đang chờ admin xét duyệt.
            </div>
          )}

          {cancelError && (
            <div className="bh-card-error">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              {cancelError}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bh-card-action">
          {booking.status === "PARTIALLY_PAID" && (
            <button
              className="bh-btn-pay"
              onClick={() => navigate(`/bookings/${bookingId}/payment`)}
            >
              <FontAwesomeIcon icon={faCreditCard} />
              Thanh toán ngay
            </button>
          )}

          {booking.status === "PAID" && (
            <button className="bh-btn-pay bh-btn-pay--done" disabled>
              <FontAwesomeIcon icon={faCheckCircle} />
              Đã thanh toán
            </button>
          )}

          {canCancel && (
            <button className="bh-btn-cancel" onClick={() => setShowModal(true)}>
              <FontAwesomeIcon icon={faTimesCircle} />
              Huỷ đơn
            </button>
          )}
          {booking.status === "CANCELED" && (
            <button className="bh-btn-pay bh-btn-pay--cancelled" disabled>
              <FontAwesomeIcon icon={faTimesCircle} />
              Đã huỷ
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <CancelModal
          booking={booking}
          onConfirm={handleConfirmCancel}
          onClose={() => { setShowModal(false); setCancelError(""); }}
          loading={cancelLoading}
        />
      )}
    </>
  );
};

export default BookingCard;