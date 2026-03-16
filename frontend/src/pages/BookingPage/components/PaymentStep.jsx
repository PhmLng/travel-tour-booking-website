import React from "react";

const PAYMENT_OPTIONS = [
  {
    key: "FULL",
    label: "Thanh toán toàn bộ",
    desc: "Thanh toán 100% tổng giá trị đơn hàng",
    ratio: 1,
  },
  {
    key: "HALF",
    label: "Thanh toán một nửa",
    desc: "Đặt cọc 50%, thanh toán phần còn lại trước ngày khởi hành",
    ratio: 0.5,
  },
];

const PaymentStep = ({
  contact,
  paymentOption,
  onPaymentOptionChange,
  totalAmount,
  payableAmount,
  formatPrice,
  isProcessing,
  submitting,
  bookingError,
  paymentError,
}) => (
  <>
    {/* ─── Xác nhận thông tin ─── */}
    <section className="booking-section" style={{ padding: 0, overflow: "hidden" }}>
      <div className="section-headerr">
        <span className="section-step-num">1</span>
        <h2 className="section-title" style={{ margin: 0, borderBottom: "none", paddingBottom: 0 }}>
          XÁC NHẬN THÔNG TIN LIÊN LẠC
        </h2>
      </div>
      <div className="confirm-grid">
        {[
          ["fa-solid fa-user", "Họ tên", contact.fullName],
          ["fa-solid fa-phone", "Điện thoại", contact.phone],
          ["fa-solid fa-envelope", "Email", contact.email],
          contact.address && ["fa-solid fa-location-dot", "Địa chỉ", contact.address],
        ]
          .filter(Boolean)
          .map(([icon, label, value]) => (
            <div className="confirm-grid-item" key={label}>
              <div className="confirm-grid-label">
                <i className={icon} style={{ marginRight: 6, color: "var(--blue)", fontSize: 11 }} />
                {label}
              </div>
              <div className="confirm-grid-value">{value}</div>
            </div>
          ))}
      </div>
    </section>

    {/* ─── Hình thức thanh toán ─── */}
    <section className="booking-section" style={{ padding: 0, overflow: "hidden" }}>
      <div className="section-headerr">
        <span className="section-step-num">2</span>
        <h2 className="section-title" style={{ margin: 0, borderBottom: "none", paddingBottom: 0 }}>
          HÌNH THỨC THANH TOÁN
        </h2>
      </div>

      <div className="payment-options" style={{ padding: "16px 20px" }}>
        {PAYMENT_OPTIONS.map((opt) => (
          <label
            key={opt.key}
            className={`payment-option-card ${paymentOption === opt.key ? "selected" : ""}`}
            onClick={() => onPaymentOptionChange(opt.key)}
          >
            <div className="payment-option-radio">
              <input
                type="radio"
                name="paymentOption"
                checked={paymentOption === opt.key}
                onChange={() => onPaymentOptionChange(opt.key)}
              />
            </div>
            <div className="payment-option-info">
              <div className="payment-option-label">{opt.label}</div>
              <div className="payment-option-desc">{opt.desc}</div>
            </div>
            <div className="payment-option-badge">
              <div className="payment-option-amount">
                {formatPrice(Math.round(totalAmount * opt.ratio))}
              </div>
              <div className="payment-option-pct">{opt.ratio * 100}%</div>
            </div>
          </label>
        ))}
      </div>

      {paymentOption === "HALF" && (
        <div className="payment-half-notice" style={{ margin: "0 20px 16px", display: "flex", alignItems: "flex-start", gap: 10 }}>
          <i className="fa-solid fa-circle-info" style={{ marginTop: 2, flexShrink: 0 }} />
          <span>
            Số tiền còn lại{" "}
            <strong>{formatPrice(totalAmount - payableAmount)}</strong>{" "}
            sẽ cần thanh toán trước ngày khởi hành.
          </span>
        </div>
      )}
    </section>

    {/* ─── Trạng thái xử lý / lỗi ─── */}
    {isProcessing && (
      <div className="payment-processing">
        <div className="spinner" />
        <span>{submitting ? "Đang tạo đơn đặt tour..." : "Đang xử lý thanh toán..."}</span>
      </div>
    )}

    {(bookingError || paymentError) && !isProcessing && (
      <div className="booking-error-msg" style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <i className="fa-solid fa-triangle-exclamation" style={{ marginTop: 2, flexShrink: 0 }} />
        <span>{bookingError || paymentError}</span>
      </div>
    )}
  </>
);

export default PaymentStep;