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
  contact, paymentOption, onPaymentOptionChange,
  totalAmount, payableAmount, formatPrice,
  isProcessing, submitting, bookingError, paymentError,
}) => (
  <>
    <section className="booking-section">
      <h2 className="section-title">XÁC NHẬN THÔNG TIN</h2>
      <div className="confirm-info">
        <p><strong>Họ tên:</strong> {contact.fullName}</p>
        <p><strong>Điện thoại:</strong> {contact.phone}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        {contact.address && <p><strong>Địa chỉ:</strong> {contact.address}</p>}
      </div>
    </section>

    <section className="booking-section">
      <h2 className="section-title">HÌNH THỨC THANH TOÁN</h2>
      <div className="payment-options">
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
            <div className="payment-option-amount">
              {formatPrice(Math.round(totalAmount * opt.ratio))}
            </div>
          </label>
        ))}
      </div>

      {paymentOption === "HALF" && (
        <div className="payment-half-notice">
          💡 Số tiền còn lại{" "}
          <strong>{formatPrice(totalAmount - payableAmount)}</strong>{" "}
          sẽ cần thanh toán trước ngày khởi hành.
        </div>
      )}
    </section>

    {isProcessing && (
      <div className="payment-processing">
        <div className="spinner" />
        <p>{submitting ? "Đang tạo đơn đặt tour..." : "Đang xử lý thanh toán..."}</p>
      </div>
    )}

    {(bookingError || paymentError) && !isProcessing && (
      <div className="booking-error-msg">
        ⚠️ {bookingError || paymentError}
      </div>
    )}
  </>
);

export default PaymentStep;
