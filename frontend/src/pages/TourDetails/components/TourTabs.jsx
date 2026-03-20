import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCalendar, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import TourOverview from "./TourOverview";
import TourItinerary from "./TourItinerary";
import TourPolicy from "./TourPolicy";

const TABS = [
  { key: "overview", label: "Tổng quan", icon: faInfoCircle },
  { key: "itinerary", label: "Lịch trình", icon: faCalendar },
  { key: "policy", label: "Chính sách", icon: faCheckCircle },
];

const TourTabs = ({ activeTab, onTabChange, tourData, statusBadge, formatDate }) => (
  <>
    <div className="tour-tabs">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`tab ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => onTabChange(tab.key)}
        >
          <FontAwesomeIcon icon={tab.icon} />
          {tab.label}
        </button>
      ))}
    </div>

    <div className="tab-content">
      {activeTab === "overview" && (
        <TourOverview tourData={tourData} statusBadge={statusBadge} formatDate={formatDate} />
      )}
      {activeTab === "itinerary" && (
        <TourItinerary itinerary={tourData.itinerary} />
      )}
      {activeTab === "policy" && (
        <TourPolicy policy={tourData.policy} registrationGuide={tourData.registrationGuide} />
      )}
    </div>
  </>
);

export default TourTabs;
