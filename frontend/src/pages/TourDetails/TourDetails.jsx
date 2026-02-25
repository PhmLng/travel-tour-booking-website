import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TourDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faClock,
  faUsers,
  faMapMarkerAlt,
  faTicket,
  faGift,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faBus,
  faInfoCircle,
  faCheckCircle,
  faTag
} from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const TourDetails = () => {
  const { id } = useParams();
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedNote, setExpandedNote] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch tour data (có thể thay bằng API call)
  useEffect(() => {

    const fetchTourData = async () => {

      try {

        const response = await fetch(`http://localhost:8080/api/v1/tours/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setTourData(data);
        setLoading(false);

      } catch (error) {

        console.error('Error fetching tour data:', error);
        setLoading(false);

      }

    };

    fetchTourData();

  }, [id]);

  // Parse itinerary từ string sang array
  const parseItinerary = (itineraryString) => {
    if (!itineraryString) return [];

    const days = itineraryString.split('.').filter(day => day.trim());
    return days.map((day, index) => {
      const parts = day.trim().split(':');
      return {
        day: index + 1,
        title: parts[0]?.replace(/Ngày \d+/, '').trim() || `Ngày ${index + 1}`,
        activities: parts[1]?.split('-').map(a => a.trim()).filter(a => a) || []
      };
    });
  };

  // Parse policy thành sections
  const parsePolicy = (policyString) => {
    if (!policyString) return [];

    const sections = policyString.split('.').filter(s => s.trim());
    return sections.map((section, index) => ({
      id: index,
      title: section.includes('bao gồm') ? 'Giá tour bao gồm' : 'Giá tour không bao gồm',
      content: section.trim()
    }));
  };

  const toggleDay = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  const toggleNote = (noteIndex) => {
    setExpandedNote(expandedNote === noteIndex ? null : noteIndex);
  };

  const nextImage = () => {
    if (!tourData?.gallery) return;
    setCurrentImageIndex((prev) =>
      prev === tourData.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!tourData?.gallery) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? tourData.gallery.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'AVAILABLE': { text: 'Còn chỗ', color: '#4caf50' },
      'ALMOST_FULL': { text: 'Sắp đầy', color: '#ff9800' },
      'FULL': { text: 'Hết chỗ', color: '#f44336' },
      'CANCELLED': { text: 'Đã hủy', color: '#9e9e9e' }
    };
    return statusMap[status] || statusMap['AVAILABLE'];
  };

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

  const itineraryDays = parseItinerary(tourData.itinerary);
  const policySections = parsePolicy(tourData.policy);
  // Luôn đặt mainImage đầu tiên, gallery phía sau
  const images = [
    { imageUrl: tourData.mainImage },
    ...(tourData.gallery
      ?.filter(img => img.imageUrl && !img.imageUrl.includes('example.com'))
      .map(img => ({ imageUrl: img.imageUrl })) || [])
  ];

  const statusBadge = getStatusBadge(tourData.status);

  return (
    <>
      <Header />
      <div className="tour-details">
        {/* Breadcrumb */}
        <div className="breadcrumb-container">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Du lịch</a>
              {tourData.categories?.map((cat, index) => (
                <span key={cat.id}>
                  {' / '}
                  <a href={`/category/${cat.id}`}>{cat.name}</a>
                </span>
              ))}
              {' / '}
              <span className="current">{tourData.title}</span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="tour-details-content">
            {/* Left Content */}
            <div className="tour-left">
              {/* Title & Categories */}
              <div className="tour-header">
                <h1 className="tour-title">{tourData.title}</h1>
                <div className="tour-meta">
                  {tourData.categories?.map((cat) => (
                    <span key={cat.id} className="category-badge">
                      <FontAwesomeIcon icon={faTag} />
                      {cat.name}
                    </span>
                  ))}
                  <span
                    className="status-badge"
                    style={{ backgroundColor: statusBadge.color }}
                  >
                    {statusBadge.text}
                  </span>
                </div>
              </div>

              {/* Description */}
              {tourData.description && (
                <div className="tour-description">
                  <p>{tourData.description}</p>
                </div>
              )}

              {/* Image Gallery */}
              <div className="tour-gallery">
                <div className="main-image">
                  <img
                    src={images[currentImageIndex]?.imageUrl}
                    alt={`${tourData.title} - ${currentImageIndex + 1}`}
                    onError={(e) => { e.target.src = "/no-image.jpg"; }}
                  />
                  {images.length > 1 && (
                    <>
                      <button className="gallery-nav prev" onClick={prevImage}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <button className="gallery-nav next" onClick={nextImage}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="thumbnail-grid">
                    {images.slice(0, 4).map((img, index) => (
                      <div
                        key={index}
                        className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img src={img.imageUrl} alt={`Thumbnail ${index + 1}`} />
                        {index === 3 && images.length > 4 && (
                          <div className="more-images">+{images.length - 4}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="tour-tabs">
                <button
                  className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Tổng quan
                </button>
                <button
                  className={`tab ${activeTab === 'itinerary' ? 'active' : ''}`}
                  onClick={() => setActiveTab('itinerary')}
                >
                  <FontAwesomeIcon icon={faCalendar} />
                  Lịch trình
                </button>
                <button
                  className={`tab ${activeTab === 'policy' ? 'active' : ''}`}
                  onClick={() => setActiveTab('policy')}
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Chính sách
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="overview-content">
                    <h2>THÔNG TIN CHUNG</h2>

                    <div className="overview-grid">
                      <div className="overview-item">
                        <div className="overview-icon">
                          <FontAwesomeIcon icon={faCalendar} />
                        </div>
                        <div className="overview-info">
                          <div className="overview-label">Ngày khởi hành</div>
                          <div className="overview-value">{formatDate(tourData.startDate)}</div>
                        </div>
                      </div>

                      <div className="overview-item">
                        <div className="overview-icon">
                          <FontAwesomeIcon icon={faClock} />
                        </div>
                        <div className="overview-info">
                          <div className="overview-label">Thời gian</div>
                          <div className="overview-value">{tourData.duration}</div>
                        </div>
                      </div>

                      <div className="overview-item">
                        <div className="overview-icon">
                          <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </div>
                        <div className="overview-info">
                          <div className="overview-label">Điểm khởi hành</div>
                          <div className="overview-value">{tourData.departureLocation}</div>
                        </div>
                      </div>

                      <div className="overview-item">
                        <div className="overview-icon">
                          <FontAwesomeIcon icon={faBus} />
                        </div>
                        <div className="overview-info">
                          <div className="overview-label">Phương tiện</div>
                          <div className="overview-value">{tourData.transport}</div>
                        </div>
                      </div>

                      <div className="overview-item">
                        <div className="overview-icon">
                          <FontAwesomeIcon icon={faUsers} />
                        </div>
                        <div className="overview-info">
                          <div className="overview-label">Số chỗ</div>
                          <div className="overview-value">
                            {tourData.remainingSlots}/{tourData.maxSlots} còn trống
                          </div>
                        </div>
                      </div>

                      <div className="overview-item">
                        <div className="overview-icon">
                          <FontAwesomeIcon icon={faTicket} />
                        </div>
                        <div className="overview-info">
                          <div className="overview-label">Trạng thái</div>
                          <div className="overview-value" style={{ color: statusBadge.color }}>
                            {statusBadge.text}
                          </div>
                        </div>
                      </div>
                    </div>

                    {tourData.description && (
                      <div className="description-section">
                        <h3>Mô tả chi tiết</h3>
                        <p>{tourData.description}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <div className="itinerary-content">
                    <h2>LỊCH TRÌNH TOUR</h2>

                    {tourData.itinerary ? (
                      <div className="itinerary-list">
                        {tourData.itinerary
                          .split('|')
                          .filter(item => item.trim())
                          .map((item, index) => (
                            <div key={index} className="itinerary-item">
                              <div className="itinerary-dot"></div>
                              <p>{item.trim()}</p>
                            </div>
                          ))
                        }
                      </div>
                    ) : (
                      <p>Thông tin lịch trình đang được cập nhật.</p>
                    )}
                  </div>
                )}

                {/* Policy Tab */}
                {activeTab === 'policy' && (
                  <div className="policy-content">
                    <h2>CHÍNH SÁCH & ĐIỀU KIỆN</h2>

                    {/* Policy from JSON */}
                    {tourData.policy && (
                      <div className="policy-section">
                        <h3>Chính sách tour</h3>
                        <div className="policy-text">
                          {policySections.map((section, index) => (
                            <div key={index} className="policy-item">
                              <FontAwesomeIcon icon={faCheckCircle} className="policy-icon" />
                              <p>{section.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Registration Guide */}
                    {tourData.registrationGuide && (
                      <div className="registration-section">
                        <h3>Hướng dẫn đăng ký</h3>
                        <div className="registration-box">
                          <FontAwesomeIcon icon={faInfoCircle} />
                          <p>{tourData.registrationGuide}</p>
                        </div>
                      </div>
                    )}

                    {/* Additional Policies Accordion */}
                    <div className="notes-accordion">
                      <div className={`note-accordion-item ${expandedNote === 0 ? 'expanded' : ''}`}>
                        <div className="note-header" onClick={() => toggleNote(0)}>
                          <h3>Điều kiện hủy tour</h3>
                          <FontAwesomeIcon icon={expandedNote === 0 ? faChevronUp : faChevronDown} />
                        </div>
                        {expandedNote === 0 && (
                          <div className="note-content">
                            <ul>
                              <li>Hủy trước 30 ngày: hoàn lại 100% tiền cọc</li>
                              <li>Hủy từ 15-30 ngày: hoàn lại 70% tiền cọc</li>
                              <li>Hủy từ 7-15 ngày: hoàn lại 50% tiền cọc</li>
                              <li>Hủy dưới 7 ngày: không hoàn tiền</li>
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className={`note-accordion-item ${expandedNote === 1 ? 'expanded' : ''}`}>
                        <div className="note-header" onClick={() => toggleNote(1)}>
                          <h3>Lưu ý quan trọng</h3>
                          <FontAwesomeIcon icon={expandedNote === 1 ? faChevronUp : faChevronDown} />
                        </div>
                        {expandedNote === 1 && (
                          <div className="note-content">
                            <ul>
                              <li>Mang theo giấy tờ tùy thân (CMND/CCCD/Hộ chiếu)</li>
                              <li>Trẻ em dưới 5 tuổi được miễn phí</li>
                              <li>Tuân thủ lịch trình và quy định của hướng dẫn viên</li>
                              <li>Mua bảo hiểm du lịch để đảm bảo an toàn</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Booking Info */}
            <div className="tour-right">
              <div className="booking-card">
                <div className="price-section">
                  <div className="price-label">Giá tour:</div>
                  <div className="current-price">
                    {formatPrice(tourData.price)} đ
                    <span className="price-per"> / Khách</span>
                  </div>
                </div>

                {tourData.remainingSlots < 10 && tourData.remainingSlots > 0 && (
                  <div className="promotion-box warning">
                    <FontAwesomeIcon icon={faGift} />
                    <span>Chỉ còn {tourData.remainingSlots} chỗ trống! Đặt ngay để không bỏ lỡ!</span>
                  </div>
                )}

                <div className="tour-info-list">
                  <div className="info-item">
                    <FontAwesomeIcon icon={faTicket} />
                    <span>Mã tour: <strong>TOUR-{tourData.id}</strong></span>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>Khởi hành: <strong>{tourData.departureLocation}</strong></span>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>Ngày đi: <strong>{formatDate(tourData.startDate)}</strong></span>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faClock} />
                    <span>Thời gian: <strong>{tourData.duration}</strong></span>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Số chỗ còn: <strong>{tourData.remainingSlots}/{tourData.maxSlots}</strong></span>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faBus} />
                    <span>Phương tiện: <strong>{tourData.transport}</strong></span>
                  </div>
                </div>

                <div className="booking-actions">
                  {tourData.status === 'AVAILABLE' ? (
                    <>
                      <button className="btn-secondary">
                        <FontAwesomeIcon icon={faCalendar} />
                        Ngày khác
                      </button>
                      <button className="btn-primary">
                        Đặt ngay
                      </button>
                    </>
                  ) : (
                    <button className="btn-disabled" disabled>
                      {tourData.status === 'FULL' ? 'Hết chỗ' : 'Không khả dụng'}
                    </button>
                  )}
                </div>

                {tourData.registrationGuide && (
                  <div className="booking-note">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <p>{tourData.registrationGuide}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default TourDetails;