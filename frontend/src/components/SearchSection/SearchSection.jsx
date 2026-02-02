import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPassport,
  faMapMarkedAlt,
  faHotel,
  faPlane,
  faTags,
  faEllipsisH,
  faSearch,
  faTrophy,
  faFire,
  faSeedling,
  faGlobe,
  faGem
} from '@fortawesome/free-solid-svg-icons';

import './SearchSection.css';

const SearchSection = () => {
  const [activeTab, setActiveTab] = useState('tour');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  return (
    <section className="search-section">
      <div className="container">

        {/* ===== TABS ===== */}
        {/* <div className="search-tabs">
          <button
            className={`tab ${activeTab === 'visa' ? 'active' : ''}`}
            onClick={() => setActiveTab('visa')}
          >
            <FontAwesomeIcon icon={faPassport} /> Visa
          </button>

          <button
            className={`tab ${activeTab === 'tour' ? 'active' : ''}`}
            onClick={() => setActiveTab('tour')}
          >
            <FontAwesomeIcon icon={faMapMarkedAlt} /> Tour trọn gói
          </button>

          <button
            className={`tab ${activeTab === 'hotel' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotel')}
          >
            <FontAwesomeIcon icon={faHotel} /> Khách sạn
          </button>

          <button
            className={`tab ${activeTab === 'flight' ? 'active' : ''}`}
            onClick={() => setActiveTab('flight')}
          >
            <FontAwesomeIcon icon={faPlane} /> Vé máy bay
          </button>

          <button
            className={`tab ${activeTab === 'combo' ? 'active' : ''}`}
            onClick={() => setActiveTab('combo')}
          >
            <FontAwesomeIcon icon={faTags} /> Combo
          </button>

          <button className="tab services-more">
            <FontAwesomeIcon icon={faEllipsisH} /> Dịch vụ khác
          </button>
        </div> */}

        {/* ===== SEARCH FORM ===== */}
        <div className="search-form">
          <div className="form-group">
            <label>Bạn muốn đi đâu? *</label>
            <input
              type="text"
              placeholder="Ví dụ: Đà Nẵng"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Ngày đi</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Ngân sách</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">Chọn mức giá</option>
              <option value="under-5m">Dưới 5 triệu</option>
              <option value="5m-10m">5 – 10 triệu</option>
              <option value="10m-20m">10 – 20 triệu</option>
              <option value="over-20m">Trên 20 triệu</option>
            </select>
          </div>

          <button className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* ===== QUICK LINKS ===== */}
        {/* <div className="quick-links">
          <a href="#" className="quick-link">
            <div className="icon"><FontAwesomeIcon icon={faTrophy} /></div>
            <div className="text">WORLD CUP 2026</div>
          </a>

          <a href="#" className="quick-link">
            <div className="icon"><FontAwesomeIcon icon={faFire} /></div>
            <div className="text">TẾT NGUYÊN ĐÁN</div>
          </a>

          <a href="#" className="quick-link">
            <div className="icon"><FontAwesomeIcon icon={faSeedling} /></div>
            <div className="text">HOA ANH ĐÀO</div>
          </a>

          <a href="#" className="quick-link">
            <div className="icon"><FontAwesomeIcon icon={faGlobe} /></div>
            <div className="text">LỄ 30-04</div>
          </a>

          <a href="#" className="quick-link">
            <div className="icon"><FontAwesomeIcon icon={faTags} /></div>
            <div className="text">ƯU ĐÃI ONLINE</div>
          </a>

          <a href="#" className="quick-link">
            <div className="icon"><FontAwesomeIcon icon={faGem} /></div>
            <div className="text">TIÊU CHUẨN CAO</div>
          </a>
        </div> */}

      </div>
    </section>
  );
};

export default SearchSection;
