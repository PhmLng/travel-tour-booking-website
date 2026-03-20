import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faBus, faCalendar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { formatPrice, formatDate, getStatusBadge } from "../categoryConstants";

const TourCard = ({ tour, isFavorite, onToggleFavorite }) => {
  const status = getStatusBadge(tour.status);

  return (
    <Link to={`/tour/${tour.id}`} className="tour-card-link">
      <div className="tour-card">
        {/* Image */}
        <div className="tour-card-image">
          <img
            src={tour.mainImage || "/no-image.jpg"}
            alt={tour.title}
            onError={(e) => { e.target.src = "/no-image.jpg"; }}
          />
          <button
            className={`fav-btn ${isFavorite ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); onToggleFavorite(tour.id); }}
          >
            <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartRegular} />
          </button>
          {tour.status === "ALMOST_FULL" && (
            <span className="badge deal">Giá tốt</span>
          )}
          <span className="badge status" style={{ backgroundColor: status.color }}>
            {status.text}
          </span>
        </div>

        {/* Body */}
        <div className="tour-card-body">
          <h3 className="tour-card-title">{tour.title}</h3>

          <div className="tour-card-meta">
            <div className="meta-row">
              <span className="meta-label">Mã tour:</span>
              <span className="meta-value">TOUR-{tour.id}</span>
              <span className="meta-label">Khởi hành:</span>
              <span className="meta-value departure">{tour.departureLocation}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">
                <FontAwesomeIcon icon={faClock} /> Thời gian:
              </span>
              <span className="meta-value">{tour.duration}</span>
              <span className="meta-label">
                <FontAwesomeIcon icon={faBus} /> Phương tiện:
              </span>
              <span className="meta-value">{tour.transport || "—"}</span>
            </div>
            <div className="meta-row dates-row">
              <span className="meta-label">
                <FontAwesomeIcon icon={faCalendar} /> Ngày khởi hành:
              </span>
              <div className="date-tags">
                <span className="date-tag">{formatDate(tour.startDate)}</span>
              </div>
            </div>
          </div>

          <div className="tour-card-footer">
            <div>
              <span className="price-label">Giá từ:</span>
              <span className="tour-price">{formatPrice(tour.adultPrice)} đ</span>
            </div>
            <button className="detail-btn">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
