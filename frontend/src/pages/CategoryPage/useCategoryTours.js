import { useState, useEffect } from "react";

const API_BASE = "http://localhost:8080/api/v1";

/**
 * Encapsulates all data-fetching and filter/sort logic for CategoryPage.
 */
const useCategoryTours = (decodedDest) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departures, setDepartures] = useState(["Tất cả"]);

  // ── Filter state ──
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [departureLocation, setDepartureLocation] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("all");

  // ── Fetch ──
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/tours/search?title=${encodeURIComponent(decodedDest)}`
        );
        if (!res.ok) throw new Error("Search failed");
        let data = await res.json();
        data = Array.isArray(data) ? data : [];
        setTours(data);
        console.log("👉 Tour sample:", data[0])
        setDepartures(["Tất cả", ...new Set(data.map((t) => t.departureLocation).filter(Boolean))]);
      } catch {
        // Fallback: fetch all tours
        try {
          const res2 = await fetch(`${API_BASE}/tours`);
          let data2 = await res2.json();
          data2 = Array.isArray(data2) ? data2 : [];
          setTours(data2);
          setDepartures(["Tất cả", ...new Set(data2.map((t) => t.departureLocation).filter(Boolean))]);
        } catch {
          setTours([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [decodedDest]);

  // ── Filter + sort ──
  const filteredTours = (() => {
    let result = [...tours];

    if (selectedPrice) {
      result = result.filter((t) => {
        const p = t.adultPrice;;
        if (selectedPrice === "under-5m") return p < 5_000_000;
        if (selectedPrice === "5m-10m") return p >= 5_000_000 && p <= 10_000_000;
        if (selectedPrice === "10m-20m") return p > 10_000_000 && p <= 20_000_000;
        if (selectedPrice === "over-20m") return p > 20_000_000;
        return true;
      });
    }

    if (departureDate) {
      const searchDate = new Date(departureDate);
      result = result.filter((t) => {
        if (!t.startDate) return false;
        const diff = Math.abs((new Date(t.startDate) - searchDate) / (1000 * 60 * 60 * 24));
        return diff <= 15;
      });
    }

    if (departureLocation !== "Tất cả") {
      result = result.filter((t) => t.departureLocation === departureLocation);
    }

    if (selectedTransport) {
      result = result.filter((t) => {
        const tp = t.transport?.toLowerCase() || "";
        if (selectedTransport === "may-bay")
          return tp.includes("máy bay") || tp.includes("may bay") || tp.includes("bay");
        if (selectedTransport === "xe") return tp.includes("xe");
        return true;
      });
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.adultPrice - b.adultPrice);
    if (sortBy === "price-desc") result.sort((a, b) => b.adultPrice - a.adultPrice);
    if (sortBy === "newest") result.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    return result;
  })();

  const resetFilters = () => {
    setSelectedPrice(null);
    setSelectedTransport(null);
    setSelectedType(null);
    setDepartureDate("");
    setDepartureLocation("Tất cả");
  };

  return {
    loading,
    filteredTours,
    departures,
    // filter state
    selectedPrice, setSelectedPrice,
    selectedTransport, setSelectedTransport,
    selectedType, setSelectedType,
    departureDate, setDepartureDate,
    departureLocation, setDepartureLocation,
    sortBy, setSortBy,
    resetFilters,
  };
};

export default useCategoryTours;
