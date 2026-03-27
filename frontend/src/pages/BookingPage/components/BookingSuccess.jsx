import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle, faTicketAlt, faCalendarAlt,
  faMoneyBillWave, faCreditCard, faHome, faClockRotateLeft,
  faHashtag, faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import "./BookingSuccess.css";

const BookingSuccess = ({
  contact, bookingResult, paymentResult,
  paymentOption, totalAmount, payableAmount, formatPrice,
}) => {
  const navigate = useNavigate();
  const bookingId = bookingResult?.Id ?? bookingResult?.id;

  const bookingRows = [
    {
      icon: faHashtag,
      label: "Mã đặt chỗ",
      value: bookingId ? `#${bookingId}` : "—",
      highlight: true,
    },
    {
      icon: faCalendarAlt,
      label: "Tour",
      value: bookingResult?.tourTitle || "—",
    },
    {
      icon: faMoneyBillWave,
      label: "Tổng tiền",
      value: bookingResult?.totalPrice != null
        ? formatPrice(bookingResult.totalPrice)
        : formatPrice(totalAmount),
    },
    ...(bookingResult?.status ? [{
      icon: faTicketAlt,
      label: "Trạng thái đơn",
      value: bookingResult.status,
    }] : []),
  ];

  const paymentRows = [
    {
      icon: faCreditCard,
      label: paymentOption === "FULL" ? "Đã thanh toán" : "Thanh toán lần 1",
      value: formatPrice(payableAmount),
      success: true,
    },
    ...(paymentOption !== "FULL" ? [{
      icon: faMoneyBillWave,
      label: "Còn lại cần thanh toán",
      value: formatPrice(totalAmount - payableAmount),
      warning: true,
    }] : []),
    ...(paymentResult?.transactionCode ? [{
      icon: faHashtag,
      label: "Mã giao dịch",
      value: paymentResult.transactionCode,
    }] : []),
    ...(paymentResult?.paymentDate ? [{
      icon: faCalendarAlt,
      label: "Ngày thanh toán",
      value: new Date(paymentResult.paymentDate).toLocaleString("vi-VN"),
    }] : []),
    ...(paymentResult?.status ? [{
      icon: faCheckCircle,
      label: "Trạng thái thanh toán",
      value: paymentResult.status,
      success: true,
    }] : []),
  ];

  return (
    <div className="bs-wrapper">

      {/* Icon + heading */}
      <div className="bs-hero">
        <div className="bs-icon-ring">
          <FontAwesomeIcon icon={faCheckCircle} className="bs-check-icon" />
        </div>
        <h2 className="bs-heading">Thanh toán thành công!</h2>
        <p className="bs-subheading">
          Xác nhận sẽ được gửi đến <strong>{contact.email}</strong>
        </p>
      </div>

      {/* Booking info */}
      <div className="bs-block">
        <div className="bs-block-title">
          <FontAwesomeIcon icon={faTicketAlt} />
          Thông tin đặt tour
        </div>
        <div className="bs-card">
          {bookingRows.map((row, i) => (
            <div className="bs-row" key={i}>
              <div className="bs-row-left">
                <span className="bs-row-icon">
                  <FontAwesomeIcon icon={row.icon} />
                </span>
                <span className="bs-row-label">{row.label}</span>
              </div>
              <span className={`bs-row-value ${row.highlight ? "highlight" : ""}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment info */}
      <div className="bs-block">
        <div className="bs-block-title">
          <FontAwesomeIcon icon={faReceipt} />
          Thông tin thanh toán
        </div>
        <div className="bs-card">
          {paymentRows.map((row, i) => (
            <div className="bs-row" key={i}>
              <div className="bs-row-left">
                <span className={`bs-row-icon ${row.success ? "icon-success" : ""} ${row.warning ? "icon-warning" : ""}`}>
                  <FontAwesomeIcon icon={row.icon} />
                </span>
                <span className="bs-row-label">{row.label}</span>
              </div>
              <span className={`bs-row-value ${row.success ? "success" : ""} ${row.warning ? "warning" : ""}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="bs-notice">
        Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
        Cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của chúng tôi!
      </div>

      {/* Actions */}
      <div className="bs-actions">
        <button className="bs-btn-secondary" onClick={() => navigate("/booking-history")}>
          <FontAwesomeIcon icon={faClockRotateLeft} />
          Lịch sử đặt tour
        </button>
        <button className="bs-btn-primary" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faHome} />
          Về trang chủ
        </button>
      </div>

    </div>
  );
};

export default BookingSuccess;