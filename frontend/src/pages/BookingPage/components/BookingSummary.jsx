import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faUsers, faTag } from "@fortawesome/free-solid-svg-icons";

const BookingSummary = ({
  tourData, tourId,
  step, paymentOption, payableAmount, totalAmount,
  adults, adultPrice,
  children, childPrice,
  infants, infantPrice,
  singleRoomCount, singleSurcharge,
  discountCode, discountAmount, discountStatus, discountValidating,
  onDiscountCodeChange, onApplyDiscount,
  agreePolicy, onAgreePolicyChange,
  errors,
  isProcessing,
  formatPrice,
  onNext, onSubmit, onBack,
}) => (
  <div className="summary-card">
    <h3 className="summary-title">TÓM TẮT CHUYẾN ĐI</h3>

    {/* Tour info */}
    <div className="summary-tour">
      <img
        src={tourData?.mainImage || "/no-image.jpg"}
        alt={tourData?.title}
        onError={(e) => { e.target.src = "/no-image.jpg"; }}
        className="summary-tour-img"
      />
      <div className="summary-tour-info">
        <p className="summary-tour-name">{tourData?.title}</p>
        <div className="summary-tour-code">
          <FontAwesomeIcon icon={faTag} />
          <span>Mã tour {tourData?.tourCode || `TOUR-${tourId}`}</span>
        </div>
      </div>
    </div>

    {/* Flight info */}
    <div className="summary-flight">
      <div className="summary-flight-header">
        <FontAwesomeIcon icon={faPlane} /> THÔNG TIN CHUYẾN ĐI
      </div>
      <div className="flight-info-list">
        <div className="flight-info-row">
          <span className="flight-info-label">Điểm khởi hành</span>
          <span className="flight-info-value">{tourData?.departureLocation || "—"}</span>
        </div>
        <div className="flight-info-row">
          <span className="flight-info-label">Ngày đi</span>
          <span className="flight-info-value">
            {tourData?.startDate
              ? new Date(tourData.startDate).toLocaleDateString("vi-VN", {
                  day: "2-digit", month: "2-digit", year: "numeric",
                })
              : "—"}
          </span>
        </div>
        <div className="flight-info-row">
          <span className="flight-info-label">Phương tiện</span>
          <span className="flight-info-value">{tourData?.transport || "—"}</span>
        </div>
      </div>
    </div>

    {/* Price breakdown */}
    <div className="summary-price-section">
      <div className="price-breakdown-title">
        <FontAwesomeIcon icon={faUsers} /> KHÁCH HÀNG + PHỤ THU
      </div>
      <div className="price-breakdown-list">
        {adults > 0 && (
          <div className="price-breakdown-row">
            <span>Người lớn × {adults}</span>
            <span>{formatPrice(adults * adultPrice)}</span>
          </div>
        )}
        {children > 0 && (
          <div className="price-breakdown-row">
            <span>Trẻ em × {children}</span>
            <span>{formatPrice(children * childPrice)}</span>
          </div>
        )}
        {infants > 0 && (
          <div className="price-breakdown-row">
            <span>Em bé × {infants}</span>
            <span>{formatPrice(infants * infantPrice)}</span>
          </div>
        )}
        {singleRoomCount > 0 && (
          <div className="price-breakdown-row surcharge">
            <span>Phụ thu phòng đơn × {singleRoomCount}</span>
            <span>{formatPrice(singleRoomCount * singleSurcharge)}</span>
          </div>
        )}
        {discountAmount > 0 && (
          <div className="price-breakdown-row discount-row-applied">
            <span>Giảm giá ({discountCode})</span>
            <span style={{ color: "#4caf50" }}>- {formatPrice(discountAmount)}</span>
          </div>
        )}
      </div>

      {/* Discount input */}
      <div className="discount-row">
        {/* <div className="discount-label">
          <FontAwesomeIcon icon={faTag} /> MÃ GIẢM GIÁ
        </div> */}
        {/* <div className="discount-input-row">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={discountCode}
            onChange={(e) => onDiscountCodeChange(e.target.value)}
            className={`discount-input ${
              discountStatus === "valid" ? "input-valid" :
              discountStatus === "invalid" ? "input-error" : ""
            }`}
          />
          <button
            className="btn-discount"
            onClick={onApplyDiscount}
            disabled={!discountCode.trim() || discountValidating}
          >
            {discountValidating ? "..." : "Áp dụng"}
          </button>
        </div> */}
        {discountStatus === "valid" && (
          <p className="discount-feedback valid">✓ Mã hợp lệ — giảm {formatPrice(discountAmount)}</p>
        )}
        {discountStatus === "invalid" && (
          <p className="discount-feedback invalid">✗ Mã không hợp lệ hoặc đã hết hạn</p>
        )}
      </div>

      {/* Policy agree */}
      <div className="policy-agree-inline">
        <input
          type="checkbox"
          id="agreeInline"
          checked={agreePolicy}
          onChange={(e) => onAgreePolicyChange(e.target.checked)}
        />
        <label htmlFor="agreeInline">
          Tôi đồng ý với <a href="#">Chính sách</a> bảo vệ dữ liệu cá nhân và{" "}
          <a href="#">các điều khoản.</a>
        </label>
      </div>
      {errors.agreePolicy && (
        <p className="error-msg" style={{ marginTop: "6px" }}>⚠️ {errors.agreePolicy}</p>
      )}
    </div>

    {/* Total */}
    <div className="summary-total">
      <span>Tổng tiền</span>
      <span className="total-price">{formatPrice(totalAmount)}</span>
    </div>

    {step === 1 && paymentOption === "HALF" && (
      <div className="summary-payable">
        <span>Thanh toán ngay</span>
        <span className="payable-price">{formatPrice(payableAmount)}</span>
      </div>
    )}

    {/* Actions */}
    {step === 0 && (
      <button className="btn-book-now" onClick={onNext}>Tiếp tục</button>
    )}

    {step === 1 && (
      <>
        <button className="btn-book-now" onClick={onSubmit} disabled={isProcessing}>
          {isProcessing ? "Đang xử lý..." : `Thanh toán ${formatPrice(payableAmount)}`}
        </button>
        <button
          className="btn-secondary-full"
          onClick={onBack}
          disabled={isProcessing}
        >
          Quay lại
        </button>
      </>
    )}

  </div>
);

export default BookingSummary;
