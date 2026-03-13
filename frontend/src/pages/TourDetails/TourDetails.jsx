import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import TourGallery from "./components/TourGallery";
import TourTabs from "./components/TourTabs";
import TourBookingCard from "./components/TourBookingCard";
import "./TourDetails.css";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price);

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });

const STATUS_MAP = {
  AVAILABLE: { text: "Còn chỗ", color: "#4caf50" },
  ALMOST_FULL: { text: "Sắp đầy", color: "#ff9800" },
  FULL: { text: "Hết chỗ", color: "#f44336" },
  CANCELLED: { text: "Đã hủy", color: "#9e9e9e" },
};

const getStatusBadge = (status) => STATUS_MAP[status] || STATUS_MAP.AVAILABLE;

// ─── Main component ───────────────────────────────────────────────────────────
const TourDetails = () => {
  const { id } = useParams();
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/tours/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setTourData(data);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTourData();
  }, [id]);

  if (loading) {
    return (
      <div className="tour-details-loading">
        <div className="spinner"></div>
        <p>Đang tải thông tin tour...</p>
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="tour-details-error">
        <h2>Không tìm thấy tour</h2>
        <p>Tour bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <a href="/" className="btn-primary">Về trang chủ</a>
      </div>
    );
  }

  // Build images array — lọc null trước khi render
  const images = [
    ...(tourData.mainImage ? [{ imageUrl: tourData.mainImage }] : []),
    ...(tourData.gallery
      ?.filter((img) => img.imageUrl && !img.imageUrl.includes("example.com"))
      .map((img) => ({ imageUrl: img.imageUrl })) || []),
  ];

  const statusBadge = getStatusBadge(tourData.status);
  const isBookable = tourData.status === "AVAILABLE" && tourData.remainingSlots > 0;

  return (
    <>
      <Header />
      <div className="tour-details">
        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Du lịch</Link>
              {tourData.categories?.map((cat) => (
                <span key={cat.id}>
                  {" / "}
                  <Link to={`/category/${cat.id}`}>{cat.name}</Link>
                </span>
              ))}
              {" / "}
              <span className="current">{tourData.title}</span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="tour-details-content">
            {/* Left */}
            <div className="tour-left">
              <div className="tour-header">
                <h1 className="tour-title">{tourData.title}</h1>
                <div className="tour-meta">
                  {tourData.categories?.map((cat) => (
                    <span key={cat.id} className="category-badge">
                      <FontAwesomeIcon icon={faTag} />
                      {cat.name}
                    </span>
                  ))}
                  <span className="status-badge" style={{ backgroundColor: statusBadge.color }}>
                    {statusBadge.text}
                  </span>
                </div>
              </div>

              {tourData.description && (
                <div className="tour-description">
                  <p>{tourData.description}</p>
                </div>
              )}

              <TourGallery
                images={images}
                currentImageIndex={currentImageIndex}
                onPrev={() => setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
                onNext={() => setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
                onSelect={setCurrentImageIndex}
                title={tourData.title}
              />

              <TourTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tourData={tourData}
                statusBadge={statusBadge}
                formatDate={formatDate}
              />
            </div>

            {/* Right */}
            <div className="tour-right">
              <TourBookingCard
                tourData={tourData}
                isBookable={isBookable}
                statusBadge={statusBadge}
                formatDate={formatDate}
                formatPrice={formatPrice}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TourDetails;
