import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

const BookingEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="bh-empty">
      <FontAwesomeIcon icon={faInbox} className="bh-empty-icon" />
      <p>Không có đơn đặt tour nào</p>
      <button className="bh-btn-explore" onClick={() => navigate("/")}>
        Khám phá tour ngay
      </button>
    </div>
  );
};

export default BookingEmptyState;
