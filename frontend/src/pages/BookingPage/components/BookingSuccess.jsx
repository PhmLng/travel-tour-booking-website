import React from "react";
import { useNavigate } from "react-router-dom";

const BookingSuccess = ({
  contact, bookingResult, paymentResult,
  paymentOption, totalAmount, payableAmount, formatPrice,
}) => {
  const navigate = useNavigate();

  return (
    <section className="booking-section success-section">
      <div className="success-icon">✅</div>
      <h2>Đặt tour thành công!</h2>
      <p>Cảm ơn bạn đã đặt tour. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.</p>
      <p>Thông tin xác nhận sẽ được gửi đến: <strong>{contact.email}</strong></p>

      {bookingResult && (
        <div className="booking-result-summary">
          {(bookingResult.Id || bookingResult.id) && (
            <p><strong>Mã đặt chỗ:</strong> #{bookingResult.Id ?? bookingResult.id}</p>
          )}
          {bookingResult.tourTitle && (
            <p><strong>Tour:</strong> {bookingResult.tourTitle}</p>
          )}
          {bookingResult.quantity && (
            <p><strong>Số khách:</strong> {bookingResult.quantity}</p>
          )}
          {bookingResult.totalPrice != null && (
            <p><strong>Tổng tiền:</strong> {formatPrice(bookingResult.totalPrice)}</p>
          )}
          {bookingResult.status && (
            <p>
              <strong>Trạng thái booking:</strong>{" "}
              <span className={`booking-status ${bookingResult.status.toLowerCase()}`}>
                {bookingResult.status}
              </span>
            </p>
          )}
        </div>
      )}

      {paymentResult && (
        <div className="payment-result-summary">
          <h3>Thông tin thanh toán</h3>
          {paymentResult.transactionCode && (
            <p><strong>Mã giao dịch:</strong> {paymentResult.transactionCode}</p>
          )}
          {paymentResult.amount != null && (
            <p><strong>Số tiền đã thanh toán:</strong> {formatPrice(paymentResult.amount)}</p>
          )}
          {paymentOption === "HALF" && (
            <p><strong>Số tiền còn lại:</strong> {formatPrice(totalAmount - payableAmount)}</p>
          )}
          {paymentResult.status && (
            <p>
              <strong>Trạng thái:</strong>{" "}
              <span className={`booking-status ${paymentResult.status.toLowerCase()}`}>
                {paymentResult.status}
              </span>
            </p>
          )}
          {paymentResult.paymentDate && (
            <p>
              <strong>Ngày thanh toán:</strong>{" "}
              {new Date(paymentResult.paymentDate).toLocaleString("vi-VN")}
            </p>
          )}
        </div>
      )}

      <button className="btn-primary large" onClick={() => navigate("/")}>
        Về trang chủ
      </button>
    </section>
  );
};

export default BookingSuccess;
