import React, { useState } from 'react';
import './PopularDestinations.css';

const PopularDestinations = () => {
  // Regions (tab)
  const regions = [
    { id: 'north', name: 'Miền Bắc' },
    { id: 'central', name: 'Miền Trung' },
    { id: 'south', name: 'Miền Nam' },
    { id: 'asia', name: 'Châu Á' },
    { id: 'europe', name: 'Châu Âu' }
  ];

  // Destinations theo region
  const destinationsByRegion = {
    north: [
      { id: 1, name: 'QUẢNG NINH', image: '/destinations/quangninh.jpg' },
      { id: 2, name: 'HÀ GIANG', image: '/destinations/hagiang.jpg' },
      { id: 3, name: 'HÀ NỘI', image: '/destinations/hanoi.jpg' }
    ],
    central: [
      { id: 4, name: 'HUẾ', image: '/destinations/laocai.jpg' },
      { id: 5, name: 'ĐÀ NẴNG', image: '/destinations/ninhbinh.jpg' },
      { id: 6, name: 'QUẢNG NAM', image: '/destinations/yenbai.png' }
    ],
    south: [
      { id: 7, name: 'TP. HỒ CHÍ MINH', image: '/destinations/caobang.jpg' },
      { id: 8, name: 'VŨNG TÀU', image: '/destinations/sonla.webp' }
    ],
    asia: [
      { id: 9, name: 'TOKYO', image: '/destinations/tokyo.webp' },
      { id: 10, name: 'SEOUL', image: '/destinations/seoul.jpg' }
    ],
    europe: [
      { id: 11, name: 'PARIS', image: '/destinations/paris.jpg' },
      { id: 12, name: 'ROME', image: '/destinations/rome.jpg' }
    ]
  };

  // State region đang active
  const [activeRegion, setActiveRegion] = useState('north');

  return (
    <section className="popular-destinations">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">ĐIỂM ĐẾN YÊU THÍCH</h2>
          <p className="section-subtitle">
            Hãy chọn một điểm đến du lịch nổi tiếng dưới đây để khám phá các chuyến đi độc quyền của
            chúng tôi với mức giá vô cùng hợp lý.
          </p>
        </div>

        {/* Region Tabs */}
        <div className="region-tabs">
          {regions.map(region => (
            <button
              key={region.id}
              className={`region-tab ${activeRegion === region.id ? 'active' : ''}`}
              onClick={() => setActiveRegion(region.id)}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="destinations-grid">
          {destinationsByRegion[activeRegion]?.map(destination => (
            <a
              key={destination.id}
              href="#"
              className="destination-card"
              style={{ backgroundImage: `url(${destination.image})` }}
            >
              <div className="destination-overlay">
                <h3 className="destination-name">{destination.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
