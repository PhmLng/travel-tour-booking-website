import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSlidersH, faTimes, faChevronDown, faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import {
  PRICE_RANGES, TOUR_TYPES, TRANSPORTS,
} from "../categoryConstants";

const FilterSidebar = ({
  // values
  selectedPrice, selectedTransport, selectedType,
  departureDate, departureLocation, departures, decodedDest,
  // setters
  setSelectedPrice, setSelectedTransport, setSelectedType,
  setDepartureDate, setDepartureLocation,
  // actions
  onReset, onApply,
}) => {
  const hasActiveFilter =
    selectedPrice || selectedTransport || selectedType ||
    departureDate || departureLocation !== "Tất cả";

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3><FontAwesomeIcon icon={faSlidersH} /> BỘ LỌC TÌM KIẾM</h3>
        {hasActiveFilter && (
          <button className="reset-filter-btn" onClick={onReset}>
            <FontAwesomeIcon icon={faTimes} /> Xóa lọc
          </button>
        )}
      </div>

      {/* Budget */}
      <div className="filter-group">
        <h4>Ngân sách</h4>
        <div className="filter-tags">
          {PRICE_RANGES.map((p) => (
            <button
              key={p.value}
              className={`filter-tag ${selectedPrice === p.value ? "active" : ""}`}
              onClick={() => setSelectedPrice(selectedPrice === p.value ? null : p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Departure location */}
      <div className="filter-group">
        <h4>Điểm khởi hành</h4>
        <div className="filter-select-wrap">
          <select
            value={departureLocation}
            onChange={(e) => setDepartureLocation(e.target.value)}
            className="filter-select"
          >
            {departures.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <FontAwesomeIcon icon={faChevronDown} className="select-arrow" />
        </div>
      </div>

      {/* Destination (fixed by URL) */}
      <div className="filter-group">
        <h4>Điểm đến</h4>
        <div className="filter-select-wrap">
          <select className="filter-select" value={decodedDest} disabled>
            <option>{decodedDest}</option>
          </select>
          <FontAwesomeIcon icon={faChevronDown} className="select-arrow" />
        </div>
      </div>

      {/* Departure date */}
      <div className="filter-group">
        <h4>Ngày đi</h4>
        <div className="filter-date-wrap">
          <FontAwesomeIcon icon={faCalendar} className="date-icon" />
          <input
            type="date"
            className="filter-date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
      </div>

      {/* Tour type */}
      <div className="filter-group">
        <h4>Dòng tour</h4>
        <div className="filter-tags">
          {TOUR_TYPES.map((t) => (
            <button
              key={t.value}
              className={`filter-tag ${selectedType === t.value ? "active" : ""}`}
              onClick={() => setSelectedType(selectedType === t.value ? null : t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transport */}
      <div className="filter-group">
        <h4>Phương tiện</h4>
        <div className="filter-tags">
          {TRANSPORTS.map((t) => (
            <button
              key={t.value}
              className={`filter-tag ${selectedTransport === t.value ? "active" : ""}`}
              onClick={() =>
                setSelectedTransport(selectedTransport === t.value ? null : t.value)
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <button className="apply-filter-btn" onClick={onApply}>Áp dụng</button>
    </div>
  );
};

export default FilterSidebar;
