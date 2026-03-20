import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { SORT_OPTIONS } from "../categoryConstants";

const TourListToolbar = ({
  resultCount, sortBy, setSortBy,
  showSortMenu, setShowSortMenu,
  onOpenMobileFilter,
}) => (
  <div className="content-toolbar">
    <p className="result-count">
      Chúng tôi tìm thấy <strong>{resultCount}</strong> chương trình tour cho quý khách
    </p>

    <div className="toolbar-right">
      <button className="mobile-filter-btn" onClick={onOpenMobileFilter}>
        <FontAwesomeIcon icon={faSlidersH} /> Bộ lọc
      </button>

      <div className="sort-dropdown" onClick={() => setShowSortMenu(!showSortMenu)}>
        <span>Sắp xếp theo: </span>
        <strong>{SORT_OPTIONS.find((s) => s.value === sortBy)?.label}</strong>
        <FontAwesomeIcon icon={showSortMenu ? faChevronUp : faChevronDown} />

        {showSortMenu && (
          <div className="sort-menu">
            {SORT_OPTIONS.map((s) => (
              <div
                key={s.value}
                className={`sort-option ${sortBy === s.value ? "active" : ""}`}
                onClick={() => { setSortBy(s.value); setShowSortMenu(false); }}
              >
                {s.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default TourListToolbar;
