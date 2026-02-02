import React, { useState } from 'react';
import './BestCombos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faCalendar, faHotel, faCar,faArrowRight } from '@fortawesome/free-solid-svg-icons';

const BestCombos = () => {
  const combos = [
    {
      id: 1,
      from: 'TP. HỒ CHÍ MINH',
      to: 'ĐÀ NẴNG',
      code: 'FESGN3032-005-270226VU-V',
      date: '27/02/2026',
      hotel: 'Khách sạn tương...',
      transport: 'Máy bay',
      price: '4.690.000',
      image: '/combos/yenbai.png'
    },
    {
      id: 2,
      from: 'TP. HỒ CHÍ MINH',
      to: 'TRUNG QUỐC',
      code: 'FMSGN331-003-010326XE-H',
      date: '01/03/2026',
      hotel: 'Khách sạn tương...',
      transport: 'Xe',
      price: '5.990.000',
      image: '/combos/tokyo.webp'
    },
    {
      id: 3,
      from: 'TP. HỒ CHÍ MINH',
      to: 'TRUNG QUỐC',
      code: 'FMSGN332-003-010326XE-H',
      date: '01/03/2026',
      hotel: 'Khách sạn tương...',
      transport: 'Xe',
      price: '7.290.000',
      image: '/combos/sonla.webp'
    },
    {
      id: 4,
      from: 'TP. HỒ CHÍ MINH',
      to: 'TRUNG QUỐC',
      code: 'FMSGN321-003-030326XE-H',
      date: '03/03/2026',
      hotel: 'Khách sạn tương...',
      transport: 'Xe',
      price: '6.990.000',
      image: '/combos/seoul.jpg'
    },
    {
      id: 5,
      from: 'TP. HỒ CHÍ MINH',
      to: 'TRUNG QUỐC',
      code: 'FMSGN322-003-030326XE-H',
      date: '03/03/2026',
      hotel: 'Khách sạn tương...',
      transport: 'Xe',
      price: '7.990.000',
      image: '/combos/yenbai.png'
    },
    {
      id: 6,
      from: 'TP. HỒ CHÍ MINH',
      to: 'ĐÀ NẴNG',
      code: 'FESGN3021-006-090326VU-V',
      date: '09/03/2026',
      hotel: 'Khách sạn tương...',
      transport: 'Máy bay',
      price: '3.690.000',
      image: '/combos/yenbai.png'
    },
    {
      id: 7,
      from: 'TP. HỒ CHÍ MINH',
      to: 'SINGAPORE',
      code: 'FMSGN190-001-120326SQ-V',
      date: '12/03/2026',
      hotel: 'Khách sạn tương...',
      transport: 'Máy bay',
      price: '12.790.000',
      image: '/combos/yenbai.png'
    },
    {
      id: 8,
      from: 'TP. HỒ CHÍ MINH',
      to: 'BÀ RỊA - VŨNG...',
      code: 'FESGN8041-004-010226XE-V',
      date: '01/02/2026',
      hotel: 'Khách sạn tương...',
      transport: 'Xe',
      price: '1.290.000',
      image: '/combos/yenbai.png'
    }
  ];

  // Tabs
  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'plane', label: 'Máy bay + Khách sạn' },
    { id: 'car', label: 'Xe + Khách sạn' }
  ];

  const [activeTab, setActiveTab] = useState('all');

  // Lọc combo theo tab
  const filteredCombos = combos.filter(combo => {
    if (activeTab === 'all') return true;
    if (activeTab === 'plane') return combo.transport === 'Máy bay';
    if (activeTab === 'car') return combo.transport === 'Xe';
    return true;
  });

  return (
    <section className="best-combos">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">COMBO GIÁ TỐT</h2>
          <p className="section-subtitle">
            Với sự hợp tác giảm giá ưu đãi cùng hệ thống đối tác lớn, chúng tôi tự tin mang đến cho quý
            khách combo vé máy bay và khách sạn với giá tốt nhất!
          </p>
        </div>

        {/* Tabs */}
        <div className="combo-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`combo-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Combos Grid */}
        <div className="combos-grid">
          {filteredCombos.map(combo => (
            <div key={combo.id} className="combo-card">
              <div className="combo-card-inner">

                {/* MẶT TRƯỚC */}
                <div className="combo-card-front">
                  <div className="combo-header">
                    <h3 className="combo-route">
                      {combo.from} → {combo.to}
                    </h3>
                  </div>

                  <div className="combo-details">
                    <div className="detail-row">
                      <FontAwesomeIcon icon={faTicket} className="icon" />
                      <span className="label">Mã tour:</span>
                      <span className="value">{combo.code}</span>
                    </div>

                    <div className="detail-row">
                      <FontAwesomeIcon icon={faCalendar} className="icon" />
                      <span className="label">Khởi hành:</span>
                      <span className="value">{combo.date}</span>
                    </div>

                    <div className="detail-row">
                      <FontAwesomeIcon icon={faHotel} className="icon" />
                      <span className="label">Khách sạn:</span>
                      <span className="value">{combo.hotel}</span>
                    </div>

                    <div className="detail-row">
                      <FontAwesomeIcon icon={faCar} className="icon" />
                      <span className="label">Phương tiện:</span>
                      <span className="value">{combo.transport}</span>
                    </div>
                  </div>

                  <div className="combo-footer">
                    <div className="price-section">
                      <span className="price-label">Giá từ</span>
                      <span className="price-amount">{combo.price} đ</span>
                      <span className="price-per">/ Khách</span>
                    </div>
                  </div>
                </div>

                <div
                  className="combo-card-back"
                  style={{
                    backgroundImage: `url(${combo.image})`
                  }}
                >
                  <div className="back-overlay">
                    <span className="view-detail">
                      Xem chi tiết <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                    </span>
                  </div>
                </div>


              </div>
            </div>

          ))}
        </div>

        {/* <button className="view-all-btn">Xem tất cả</button> */}
      </div>
    </section>
  );
};

export default BestCombos;
