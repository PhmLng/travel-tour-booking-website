import React from "react";

const FILTERS = [
  { key: "ALL", label: "Tất cả" },
  { key: "PENDING", label: "Chờ xác nhận" },
  { key: "PAID", label: "Đã thanh toán" },
  { key: "PARTIALLY_PAID", label: "Thanh toán 1 phần" },
  { key: "CANCELLED", label: "Đã huỷ" },
];

const BookingFilters = ({ bookings, activeFilter, onFilterChange }) => (
  <div className="bh-filters">
    {FILTERS.map((f) => (
      <button
        key={f.key}
        className={`bh-filter-btn ${activeFilter === f.key ? "active" : ""}`}
        onClick={() => onFilterChange(f.key)}
      >
        {f.label}
        <span className="bh-filter-count">
          {f.key === "ALL"
            ? bookings.length
            : bookings.filter((b) => b.status === f.key).length}
        </span>
      </button>
    ))}
  </div>
);

export default BookingFilters;
