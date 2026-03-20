import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import FilterSidebar from "./FilterSidebar";

const MobileFilterDrawer = ({ onClose, filterProps }) => (
  <div className="mobile-filter-overlay" onClick={onClose}>
    <div className="mobile-filter-drawer" onClick={(e) => e.stopPropagation()}>
      <div className="drawer-header">
        <h3>Bộ lọc</h3>
        <button onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <FilterSidebar {...filterProps} onApply={onClose} />
    </div>
  </div>
);

export default MobileFilterDrawer;
