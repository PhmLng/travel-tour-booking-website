import React, { useState, useEffect } from "react";
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

// ─── Main component ───────────────────────────────────────────────────────────
const BookingHistoryPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings`);
      if (!res.ok) throw new Error("Không thể tải lịch sử đặt tour");
      const data = await res.json();
      // TODO: xoá "|| true" khi có API filter theo user
      const myBookings = data.filter((b) => b.userId === currentUser?.id || true);
      setBookings(myBookings);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // FIX: cancelBooking đã được chuyển vào trong component để có thể dùng setBookings
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Bạn có chắc muốn hủy đơn đặt tour này?")) return;
    try {
      const res = await fetch(`${BASE_URL}/bookings/${bookingId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Hủy đơn thất bại");
      alert("Đã hủy đơn thành công!");
      setBookings((prev) => prev.filter((b) => (b.id ?? b.Id) !== bookingId));
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered =
    filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

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
                  Bạn có <strong>{bookings.length}</strong> đơn đặt tour.
                </p>
              </div>
            </div>
          </div>

          <BookingFilters
            bookings={bookings}
            activeFilter={filter}
            onFilterChange={setFilter}
          />

          {error && <div className="bh-error">⚠️ {error}</div>}

          {!error && filtered.length === 0 && <BookingEmptyState />}

          <div className="bh-list">
            {filtered.map((booking) => (
              <BookingCard
                key={booking.id ?? booking.Id}
                booking={booking}
                onCancel={handleCancelBooking}
              />
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingHistoryPage;
