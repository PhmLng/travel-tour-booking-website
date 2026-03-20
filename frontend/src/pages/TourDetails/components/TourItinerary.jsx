import React from "react";

const TourItinerary = ({ itinerary }) => (
  <div className="itinerary-content">
    <h2>LỊCH TRÌNH TOUR</h2>
    {itinerary ? (
      <div className="itinerary-list">
        {itinerary
          .split("|")
          .filter((item) => item.trim())
          .map((item, index) => (
            <div key={index} className="itinerary-item">
              <div className="itinerary-dot"></div>
              <p>{item.trim()}</p>
            </div>
          ))}
      </div>
    ) : (
      <p>Thông tin lịch trình đang được cập nhật.</p>
    )}
  </div>
);

export default TourItinerary;
