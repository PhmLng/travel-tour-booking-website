import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket, faMapMarkerAlt, faCalendar, faClock,
  faUsers, faBus, faGift, faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const TourBookingCard = ({ tourData, isBookable, statusBadge, formatDate, formatPrice }) => {
  const navigate = useNavigate();
  const adultPrice = tourData.adultPrice ?? tourData.adult_price ?? tourData.price ?? 0;
  const childPrice = tourData.childPrice ?? tourData.child_price ?? 0;

  return (
    <div className="booking-card">
      <div className="price-section">
        <div className="price-label">Giá tour:</div>
        <div className="current-price">
          {formatPrice(adultPrice)} đ
          <span className="price-per"> / Khách</span>
        </div>
        {childPrice > 0 && (
          <div className="child-price" style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
            Trẻ em: {formatPrice(childPrice)} đ / Khách
          </div>
        )}
      </div>

      {tourData.remainingSlots < 10 && tourData.remainingSlots > 0 && (
        <div className="promotion-box warning">
          <FontAwesomeIcon icon={faGift} />
          <span>Chỉ còn {tourData.remainingSlots} chỗ trống! Đặt ngay để không bỏ lỡ!</span>
        </div>
      )}

      <div className="tour-info-list">
        <div className="info-item">
          <FontAwesomeIcon icon={faTicket} />
          <span>Mã tour: <strong>TOUR-{tourData.id}</strong></span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>Khởi hành: <strong>{tourData.departureLocation}</strong></span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faCalendar} />
          <span>Ngày đi: <strong>{formatDate(tourData.startDate)}</strong></span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faClock} />
          <span>Thời gian: <strong>{tourData.duration}</strong></span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faUsers} />
          <span>Số chỗ còn: <strong>{tourData.remainingSlots}/{tourData.maxSlots}</strong></span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faBus} />
          <span>Phương tiện: <strong>{tourData.transport}</strong></span>
        </div>
      </div>

      <div className="booking-actions">
        {isBookable ? (
          <button
            className="btn-primary"
            onClick={() => navigate(`/booking/${tourData.id}`)}
          >
            Đặt ngay
          </button>
        ) : (
          <button className="btn-disabled" disabled>
            {tourData.remainingSlots <= 0 || tourData.status === "FULL"
              ? "Hết chỗ"
              : "Không khả dụng"}
          </button>
        )}
      </div>

      {tourData.registrationGuide && (
        <div className="booking-note">
          <FontAwesomeIcon icon={faInfoCircle} />
          <p>{tourData.registrationGuide}</p>
        </div>
      )}
    </div>
  );
};

export default TourBookingCard;