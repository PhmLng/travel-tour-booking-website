import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './SearchSection.css';

const SearchSection = () => {
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (destination) params.set('title', destination);

    if (date) params.set('startDate', `${date}T00:00:00`);

    // ✅ Backend expect số, không phải string
    const priceMap = {
      'under-5m': 'Dưới 5 triệu',
      '5m-10m': 'Từ 5 - 10 triệu',
      '10m-20m': 'Từ 10 -20 triệu',  
      'over-20m': 'Trên 20 triệu',
    };
    if (priceRange !== 'all') params.set('priceRange', priceMap[priceRange]);

    navigate(`/?${params.toString()}`);
    setTimeout(() => {
      document.getElementById('flash-deals')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="search-section">
      <div className="container">
        <div className="search-form">
          <div className="form-group">
            <label>Bạn muốn đi đâu? *</label>
            <div className="input-wrapper">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder=""
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {!destination && (
                <span className="animated-placeholder">
                  Nhập địa điểm muốn đến
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Ngày đi</label>
            <input
              type="date"
              value={date}
              min={today}
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

          <button className="search-btn" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;