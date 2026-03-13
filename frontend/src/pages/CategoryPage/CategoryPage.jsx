import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CategoryHero from "./components/CategoryHero";
import FilterSidebar from "./components/FilterSidebar";
import TourListToolbar from "./components/TourListToolbar";
import TourCard from "./components/TourCard";
import MobileFilterDrawer from "./components/MobileFilterDrawer";
import useCategoryTours from "./useCategoryTours";
import { getDestinationInfo } from "./categoryConstants";
import "./CategoryPage.css";

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const TourSkeletons = () => (
  <div className="loading-state">
    {[1, 2, 3].map((i) => (
      <div key={i} className="tour-card-skeleton">
        <div className="skeleton-img" />
        <div className="skeleton-content">
          <div className="skeleton-line lg" />
          <div className="skeleton-line md" />
          <div className="skeleton-line sm" />
        </div>
      </div>
    ))}
  </div>
);

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = ({ onReset }) => (
  <div className="empty-state">
    <div className="empty-icon">😕</div>
    <h3>Không tìm thấy tour phù hợp</h3>
    <p>Vui lòng thử lại với điều kiện tìm kiếm khác</p>
    <button className="reset-filter-btn large" onClick={onReset}>Xóa bộ lọc</button>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const CategoryPage = () => {
  const { destination } = useParams();
  const decodedDest = decodeURIComponent(destination);
  const info = getDestinationInfo(decodedDest);

  const [favorites, setFavorites] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const {
    loading, filteredTours, departures,
    selectedPrice, setSelectedPrice,
    selectedTransport, setSelectedTransport,
    selectedType, setSelectedType,
    departureDate, setDepartureDate,
    departureLocation, setDepartureLocation,
    sortBy, setSortBy,
    resetFilters,
  } = useCategoryTours(decodedDest);

  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  // Props shared by both desktop sidebar and mobile drawer
  const filterProps = {
    selectedPrice, setSelectedPrice,
    selectedTransport, setSelectedTransport,
    selectedType, setSelectedType,
    departureDate, setDepartureDate,
    departureLocation, setDepartureLocation,
    departures, decodedDest,
    onReset: resetFilters,
    onApply: () => setShowMobileFilter(false),
  };

  return (
    <>
      <Header />
      <div className="category-page">

        <CategoryHero info={info} decodedDest={decodedDest} />

        <div className="category-main">
          <div className="container">
            <div className="category-layout">

              {/* Desktop sidebar */}
              <aside className="category-sidebar">
                <FilterSidebar {...filterProps} />
              </aside>

              {/* Tour list */}
              <div className="category-content">
                <TourListToolbar
                  resultCount={filteredTours.length}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  showSortMenu={showSortMenu}
                  setShowSortMenu={setShowSortMenu}
                  onOpenMobileFilter={() => setShowMobileFilter(true)}
                />

                {loading && <TourSkeletons />}

                {!loading && filteredTours.length === 0 && (
                  <EmptyState onReset={resetFilters} />
                )}

                {!loading && filteredTours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    isFavorite={favorites.includes(tour.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        {showMobileFilter && (
          <MobileFilterDrawer
            onClose={() => setShowMobileFilter(false)}
            filterProps={filterProps}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
