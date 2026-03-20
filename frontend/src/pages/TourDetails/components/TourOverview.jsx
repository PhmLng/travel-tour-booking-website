import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar, faClock, faUsers, faMapMarkerAlt, faTicket, faBus,
} from "@fortawesome/free-solid-svg-icons";

const TourOverview = ({ tourData, statusBadge, formatDate }) => (
  <div className="overview-content">
    <h2>THÔNG TIN CHUNG</h2>
    <div className="overview-grid">
      <div className="overview-item">
        <div className="overview-icon"><FontAwesomeIcon icon={faCalendar} /></div>
        <div className="overview-info">
          <div className="overview-label">Ngày khởi hành</div>
          <div className="overview-value">{formatDate(tourData.startDate)}</div>
        </div>
      </div>
      <div className="overview-item">
        <div className="overview-icon"><FontAwesomeIcon icon={faClock} /></div>
        <div className="overview-info">
          <div className="overview-label">Thời gian</div>
          <div className="overview-value">{tourData.duration}</div>
        </div>
      </div>
      <div className="overview-item">
        <div className="overview-icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
        <div className="overview-info">
          <div className="overview-label">Điểm khởi hành</div>
          <div className="overview-value">{tourData.departureLocation}</div>
        </div>
      </div>
      <div className="overview-item">
        <div className="overview-icon"><FontAwesomeIcon icon={faBus} /></div>
        <div className="overview-info">
          <div className="overview-label">Phương tiện</div>
          <div className="overview-value">{tourData.transport}</div>
        </div>
      </div>
      <div className="overview-item">
        <div className="overview-icon"><FontAwesomeIcon icon={faUsers} /></div>
        <div className="overview-info">
          <div className="overview-label">Số chỗ</div>
          <div className="overview-value">
            {tourData.remainingSlots}/{tourData.maxSlots} còn trống
          </div>
        </div>
      </div>
      <div className="overview-item">
        <div className="overview-icon"><FontAwesomeIcon icon={faTicket} /></div>
        <div className="overview-info">
          <div className="overview-label">Trạng thái</div>
          <div className="overview-value" style={{ color: statusBadge.color }}>
            {statusBadge.text}
          </div>
        </div>
      </div>
    </div>
    {tourData.description && (
      <div className="description-section">
        <h3>Mô tả chi tiết</h3>
        <p>{tourData.description}</p>
      </div>
    )}
  </div>
);

export default TourOverview;
