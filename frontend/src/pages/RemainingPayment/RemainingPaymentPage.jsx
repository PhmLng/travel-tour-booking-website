import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft, faCheckCircle, faMoneyBillWave, faCalendarAlt,
  faTicketAlt, faSpinner, faExclamationTriangle, faCreditCard,
  faUsers, faChild, faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { addNotification } from "../../api/notificationUtils";
import "./RemainingPaymentPage.css";

const BASE_URL = "http://localhost:8080/api/v1";

const getCurrentUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
};

const formatPrice = (price) =>
  price != null ? new Intl.NumberFormat("vi-VN").format(price) + " đ" : "—";

const formatDate = (dateStr) =>
  dateStr ? new Date(dateStr).toLocaleString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }) : "—";

// ─── Success Screen ───────────────────────────────────────────────────────────
const PaymentSuccess = ({ booking, paymentResult, navigate }) => (
  <div className="rp-success">
    <div className="rp-success-icon">
      <FontAwesomeIcon icon={faCheckCircle} />
    </div>
    <h2 className="rp-success-title">Thanh toán thành công!</h2>
    <p className="rp-success-sub">Xác nhận sẽ được gửi đến email của bạn</p>

    <div className="rp-info-block">
      <div className="rp-info-title">
        <FontAwesomeIcon icon={faTicketAlt} /> THÔNG TIN ĐẶT TOUR
      </div>
      <div className="rp-info-row">
        <span className="rp-info-label"><FontAwesomeIcon icon={faTicketAlt} /> Mã đặt chỗ</span>
        <span className="rp-info-value">#{booking?.id ?? booking?.Id}</span>
      </div>
      <div className="rp-info-row">
        <span className="rp-info-label"><FontAwesomeIcon icon={faReceipt} /> Tour</span>
        <span className="rp-info-value">{booking?.tourTitle || "—"}</span>
      </div>
      <div className="rp-info-row">
        <span className="rp-info-label"><FontAwesomeIcon icon={faMoneyBillWave} /> Tổng tiền</span>
        <span className="rp-info-value">{formatPrice(booking?.totalPrice)}</span>
      </div>
      <div className="rp-info-row">
        <span className="rp-info-label"><FontAwesomeIcon icon={faTicketAlt} /> Trạng thái đơn</span>
        <span className="rp-info-value rp-status-paid">PAID</span>
      </div>
    </div>

    <div className="rp-info-block">
      <div className="rp-info-title">
        <FontAwesomeIcon icon={faCreditCard} /> THÔNG TIN THANH TOÁN
      </div>
      <div className="rp-info-row">
        <span className="rp-info-label"><FontAwesomeIcon icon={faMoneyBillWave} /> Số tiền thanh toán</span>
        <span className="rp-info-value rp-price">{formatPrice(paymentResult?.amount)}</span>
      </div>
      <div className="rp-info-row">
        <span className="rp-info-label"><FontAwesomeIcon icon={faTicketAlt} /> Mã giao dịch</span>
        <span className="rp-info-value">{paymentResult?.transactionCode || "—"}</span>
      </div>
      <div className="rp-info-row">
        <span className="rp-info-label"><FontAwesomeIcon icon={faCalendarAlt} /> Ngày thanh toán</span>
        <span className="rp-info-value">{formatDate(paymentResult?.paymentDate)}</span>
      </div>
      <div className="rp-info-row">
        <span className="rp-info-label"><FontAwesomeIcon icon={faCheckCircle} /> Trạng thái</span>
        <span className="rp-info-value rp-status-success">SUCCESS</span>
      </div>
    </div>

    <p className="rp-success-note">
      Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất. Cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của chúng tôi!
    </p>

    <div className="rp-success-actions">
      <button className="rp-btn-secondary" onClick={() => navigate("/booking-history")}>
        Lịch sử đặt tour
      </button>
      <button className="rp-btn-primary" onClick={() => navigate("/")}>
        Về trang chủ
      </button>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const RemainingPaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [booking, setBooking] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [paymentResult, setPaymentResult] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingRes, remainingRes] = await Promise.all([
          fetch(`${BASE_URL}/bookings/${bookingId}`),
          fetch(`${BASE_URL}/bookings/${bookingId}/remaining`),
        ]);
        if (!bookingRes.ok) throw new Error("Không tải được thông tin đặt tour");
        const bookingData = await bookingRes.json();
        setBooking(bookingData);

        if (remainingRes.ok) {
          const remainingData = await remainingRes.json();
          setRemaining(remainingData?.remainingAmount ?? null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookingId]);

  const handlePay = async () => {
    setPaying(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: Number(bookingId),
          paymentType: "DEPOSIT_FULL",
          paymentMethod: "MOCK_PAYMENT",
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || `Lỗi ${res.status}: Thanh toán thất bại`);
      }
      const data = await res.json();
      setPaymentResult(data);

      if (currentUser?.id) {
        addNotification(currentUser.id, {
          title: "Thanh toán thành công 🎉",
          message: `Đơn #BOOK-${bookingId} - "${booking?.tourTitle || "Tour"}" đã thanh toán phần còn lại thành công!`,
          type: "success",
          bookingId: Number(bookingId),
        });
      }
      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setPaying(false);
    }
  };

  if (loading)
    return (
      <>
        <Header />
        <div className="rp-loading">
          <div className="rp-spinner" />
          <p>Đang tải thông tin...</p>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <div className="rp-page">
        <div className="rp-container">
          {!success && (
            <button className="rp-back" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
            </button>
          )}

          {success ? (
            <PaymentSuccess
              booking={booking}
              paymentResult={paymentResult}
              navigate={navigate}
            />
          ) : (
            <>
              <h1 className="rp-title">THANH TOÁN PHẦN CÒN LẠI</h1>

              <div className="rp-body">
                {/* Bill */}
                <div className="rp-bill">
                  <div className="rp-info-block">
                    <div className="rp-info-title">
                      <FontAwesomeIcon icon={faTicketAlt} /> THÔNG TIN ĐẶT TOUR
                    </div>
                    <div className="rp-info-row">
                      <span className="rp-info-label"><FontAwesomeIcon icon={faTicketAlt} /> Mã đặt chỗ</span>
                      <span className="rp-info-value">#{booking?.id ?? booking?.Id}</span>
                    </div>
                    <div className="rp-info-row">
                      <span className="rp-info-label"><FontAwesomeIcon icon={faReceipt} /> Tour</span>
                      <span className="rp-info-value">{booking?.tourTitle || "—"}</span>
                    </div>
                    <div className="rp-info-row">
                      <span className="rp-info-label"><FontAwesomeIcon icon={faCalendarAlt} /> Ngày đặt</span>
                      <span className="rp-info-value">{formatDate(booking?.bookingDate)}</span>
                    </div>
                    <div className="rp-info-row">
                      <span className="rp-info-label"><FontAwesomeIcon icon={faUsers} /> Người lớn</span>
                      <span className="rp-info-value">{booking?.adultQuantity ?? 0}</span>
                    </div>
                    <div className="rp-info-row">
                      <span className="rp-info-label"><FontAwesomeIcon icon={faChild} /> Trẻ em</span>
                      <span className="rp-info-value">{booking?.childQuantity ?? 0}</span>
                    </div>
                    <div className="rp-info-row">
                      <span className="rp-info-label"><FontAwesomeIcon icon={faMoneyBillWave} /> Tổng tiền đơn</span>
                      <span className="rp-info-value">{formatPrice(booking?.totalPrice)}</span>
                    </div>
                  </div>

                  <div className="rp-info-block">
                    <div className="rp-info-title">
                      <FontAwesomeIcon icon={faCreditCard} /> THANH TOÁN
                    </div>
                    <div className="rp-info-row">
                      <span className="rp-info-label">Phương thức</span>
                      <span className="rp-info-value">MOCK_PAYMENT</span>
                    </div>
                    <div className="rp-info-row rp-info-row--highlight">
                      <span className="rp-info-label">Số tiền cần thanh toán</span>
                      <span className="rp-info-value rp-price">
                        {remaining != null ? formatPrice(remaining) : "Đang tải..."}
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="rp-error">
                      <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
                    </div>
                  )}

                  <button
                    className="rp-btn-pay"
                    onClick={handlePay}
                    disabled={paying}
                  >
                    {paying ? (
                      <><FontAwesomeIcon icon={faSpinner} spin /> Đang xử lý...</>
                    ) : (
                      <><FontAwesomeIcon icon={faCreditCard} /> Thanh toán ngay</>
                    )}
                  </button>
                </div>

                {/* Tour image sidebar */}
                {booking?.mainImage && (
                  <div className="rp-sidebar">
                    <img
                      src={booking.mainImage}
                      alt={booking.tourTitle}
                      className="rp-tour-img"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <div className="rp-tour-name">{booking.tourTitle}</div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RemainingPaymentPage;