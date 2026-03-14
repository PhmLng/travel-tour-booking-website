import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const PassengerCounter = ({ label, sub, value, onDecrease, onIncrease }) => (
  <div className="passenger-counter">
    <div>
      <div className="counter-label">{label}</div>
      <div className="counter-sub">
        {sub} <FontAwesomeIcon icon={faInfoCircle} />
      </div>
    </div>
    <div className="counter-controls">
      <button className="counter-btn" onClick={onDecrease}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <span className="counter-value">{value}</span>
      <button className="counter-btn" onClick={onIncrease}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  </div>
);

const PassengerSection = ({
  adults, children,
  onAdultsChange, onChildrenChange,
}) => (
  <section className="booking-section">
    <h2 className="section-title">SỐ LƯỢNG HÀNH KHÁCH</h2>
    <div className="passenger-counters">
      <PassengerCounter
        label="Người lớn"
        sub="Từ 12 tuổi trở lên"
        value={adults}
        onDecrease={() => onAdultsChange(Math.max(1, adults - 1))}
        onIncrease={() => onAdultsChange(adults + 1)}
      />
      <PassengerCounter
        label="Trẻ em"
        sub="Từ 2 - 11 tuổi"
        value={children}
        onDecrease={() => onChildrenChange(Math.max(0, children - 1))}
        onIncrease={() => onChildrenChange(children + 1)}
      />
    </div>
  </section>
);

export default PassengerSection;