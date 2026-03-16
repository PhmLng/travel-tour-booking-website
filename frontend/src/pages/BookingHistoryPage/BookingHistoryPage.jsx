import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BookingFilters from "./components/BookingFilters";
import BookingCard from "./components/BookingCard";
import BookingEmptyState from "./components/BookingEmptyState";
import "./BookingHistoryPage.css";

const BASE_URL = "http://localhost:8080/api/v1";

const getCurrentUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Filter PENDING gộp cả CANCELED_PENDING → gọi 2 API song song
const fetchByFilter = async (filter) => {
  if (filter === "ALL") {
    const res = await fetch(`${BASE_URL}/bookings`);
    if (!res.ok) throw new Error("Không thể tải lịch sử đặt tour");
    return res.json();
  }

  if (filter === "PENDING") {
    const [r1, r2] = await Promise.all([
      fetch(`${BASE_URL}/bookings/filter?status=PENDING`),
      fetch(`${BASE_URL}/bookings/filter?status=CANCELED_PENDING`),
    ]);
    const [d1, d2] = await Promise.all([
      r1.ok ? r1.json() : [],
      r2.ok ? r2.json() : [],
    ]);
    return [...d1, ...d2];
  }

  const res = await fetch(`${BASE_URL}/bookings/filter?status=${filter}`);
  if (!res.ok) throw new Error("Không thể tải lịch sử đặt tour");
  return res.json();
};

// ─── Main component ───────────────────────────────────────────────────────────
const BookingHistoryPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]); // chỉ dùng để đếm count trên filter
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  // Fetch tất cả 1 lần để hiển thị count trên filter buttons
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings`);
      if (!res.ok) throw new Error("Không thể tải lịch sử đặt tour");
      const data = await res.json();
      setAllBookings(data);
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = useCallback(async (newFilter) => {
    setFilter(newFilter);
    setFilterLoading(true);
    setError("");
    try {
      const data = await fetchByFilter(newFilter);
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setFilterLoading(false);
    }
  }, []);

  const handleStatusChange = (bookingId, newStatus) => {
    // Cập nhật cả 2 list
    const update = (list) =>
      list.map((b) =>
        (b.id ?? b.Id) === bookingId ? { ...b, status: newStatus } : b
      );
    setBookings(update);
    setAllBookings(update);
  };

  if (loading)
    return (
      <>
        <Header />
        <div className="bh-loading">
          <div className="bh-spinner" />
          <p>Đang tải lịch sử đặt tour...</p>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <div className="bh-page">
        <div className="bh-container">

          {/* Header */}
          <div className="bh-header">
            <div className="bh-header-left">
              <FontAwesomeIcon icon={faTicketAlt} className="bh-header-icon" />
              <div>
                <h1 className="bh-title">Lịch sử đặt tour</h1>
                <p className="bh-subtitle">
                  Xin chào, <strong>{currentUser?.fullName || currentUser?.username}</strong>!
                  Bạn có <strong>{allBookings.length}</strong> đơn đặt tour.
                </p>
              </div>
            </div>
          </div>

          <BookingFilters
            bookings={allBookings}
            activeFilter={filter}
            onFilterChange={handleFilterChange}
            loading={filterLoading}
          />

          {error && <div className="bh-error">⚠️ {error}</div>}

          {filterLoading ? (
            <div className="bh-loading" style={{ minHeight: 200 }}>
              <div className="bh-spinner" />
              <p>Đang lọc...</p>
            </div>
          ) : (
            <>
              {!error && bookings.length === 0 && <BookingEmptyState />}
              <div className="bh-list">
                {bookings.map((b) => (
                  <BookingCard
                    key={b.id ?? b.Id}
                    booking={b}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingHistoryPage;