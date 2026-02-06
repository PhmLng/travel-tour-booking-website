import React, { useState } from 'react';
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
  faPlane,
  faUtensils
} from '@fortawesome/free-solid-svg-icons';

const TourDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeMonth, setActiveMonth] = useState('2/2026');
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedNote, setExpandedNote] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dữ liệu tour (có thể fetch từ API based on id)
  const tourData = {
    id: 1,
    title: 'Đài Loan: Đài Bắc - Công viên Dương Minh Sơn - Đài Trung - Phố cổ Lộc Cảng - Cao Hùng - Phật Quang Sơn I Mừng 1 Tết',
    breadcrumb: ['Du lịch', 'Nước ngoài', 'Châu Á', 'Đài Loan'],
    images: [
      '/tours/taiwan1.jpg',
      '/tours/taiwan2.jpg',
      '/tours/taiwan3.jpg',
      '/tours/taiwan4.jpg',
      '/tours/taiwan5.jpg'
    ],
    oldPrice: '30.990.000',
    price: '29.490.000',
    promotion: 'Đặt ngay để nhận được Ưu đãi giờ chót tiết kiệm thêm 1,500K',
    code: 'NNSGN4581-001-170226VN-D',
    departure: 'TP. Hồ Chí Minh',
    departureDate: '17-02-2026',
    duration: '5N4D',
    seatsLeft: 9,
    schedule: {
      month: '17/02/2026',
      transport: 'Phương tiện di chuyển',
      flights: {
        outbound: {
          code: 'VN570',
          departure: { time: '16:50', airport: 'SGN', date: '17/02/2026' },
          arrival: { time: '21:10', airport: 'TPE' }
        },
        return: {
          code: 'VN581',
          departure: { time: '07:30', airport: 'KHH', date: '21/02/2026' },
          arrival: { time: '09:30', airport: 'SGN' }
        }
      },
      prices: {
        adult: { label: 'Người lớn', price: '30.990.000', note: '(Từ 12 tuổi trở lên)' },
        child: { label: 'Em bé', price: '9.297.000', note: '(Dưới 2 tuổi)' },
        childBed: { label: 'Trẻ em', price: '23.242.500', note: '(Từ 2 đến 11 tuổi)' },
        singleRoom: { label: 'Phụ thu phòng đơn', price: '10.000.000' }
      },
      notes: [
        'CHỈ NHẬN KHÁCH EVISA VÀ GTNN MIỄN VISA.',
        'CHỈ CÓ 4 TWIN + 2 DBL + 2 TRIP.',
        'Chưa bao gồm tip 133.000vnd/ngày/ khách (tương đương 5 usd/ngày/ khách), Tour không tách đoàn',
        'Đã bao gồm 10kg hành lý xách tay và 23kg hành lý ký gửi',
        'Phòng 3 đang yêu cầu - túy vào tình hình thực tế tại khách sạn'
      ]
    },
    itinerary: {
      summary: {
        time: 'Tháng 2',
        transport: 'Máy bay, Xe du lịch',
        promotion: 'Đã bao gồm ưu đãi trong giá tour'
      },
      days: [
        {
          day: 1,
          title: 'Tp.Hồ Chí Minh - Đài Bắc',
          meals: [],
          activities: [
            'Tập trung tại sân bay Tân Sơn Nhất',
            'Khởi hành chuyến bay đi Đài Bắc',
            'Đến sân bay Đào Viên, xe đưa đoàn về khách sạn nghỉ ngơi'
          ]
        },
        {
          day: 2,
          title: 'Đài Bắc',
          meals: ['sáng', 'trưa', 'tối'],
          activities: [
            'Tham quan Công viên Dương Minh Sơn',
            'Phố cổ Cửu Phần',
            'Thả đèn trời tại Thập Phần',
            'Chợ đêm Thập Phần'
          ]
        },
        {
          day: 3,
          title: 'Đài Bắc - Đài Trung',
          meals: ['sáng', 'trưa', 'tối'],
          activities: [
            'Tham quan Hồ Nhật Nguyệt',
            'Chùa Văn Vũ',
            'Làng cổ Lộc Cảng',
            'Di chuyển về Đài Trung'
          ]
        },
        {
          day: 4,
          title: 'Đài Trung - Cao Hùng',
          meals: ['sáng', 'trưa', 'tối'],
          activities: [
            'Tham quan chùa Phật Quang Sơn',
            'Thành phố cảng Cao Hùng',
            'Chợ đêm Lục Hợp',
            'Nghỉ đêm tại Cao Hùng'
          ]
        },
        {
          day: 5,
          title: 'Cao Hùng - Tp. Hồ Chí Minh',
          meals: ['sáng'],
          activities: [
            'Ăn sáng tại khách sạn',
            'Tự do mua sắm',
            'Ra sân bay về TP.HCM',
            'Kết thúc chuyến đi'
          ]
        }
      ]
    },
    notes: [
      {
        title: 'Giá tour bao gồm',
        items: [
          'Vé máy bay khứ hồi',
          'Khách sạn 3-4 sao',
          'Các bữa ăn theo chương trình',
          'Vé tham quan các điểm trong chương trình',
          'Hướng dẫn viên tiếng Việt',
          'Bảo hiểm du lịch'
        ]
      },
      {
        title: 'Giá tour không bao gồm',
        items: [
          'Chi phí làm hộ chiếu',
          'Phí tip cho HDV và tài xế',
          'Chi phí cá nhân',
          'Phụ thu phòng đơn'
        ]
      },
      {
        title: 'Lưu ý giá trẻ em',
        items: [
          'Trẻ em dưới 2 tuổi: 30% giá tour',
          'Trẻ em từ 2-11 tuổi: 75% giá tour',
          'Trẻ em từ 12 tuổi: tính như người lớn'
        ]
      },
      {
        title: 'Điều kiện thanh toán',
        items: [
          'Đặt cọc: 50% tổng giá tour',
          'Thanh toán còn lại: trước 7 ngày khởi hành',
          'Hủy tour sau 15 ngày: không hoàn cọc',
          'Hủy tour sau 7 ngày: không hoàn tiền'
        ]
      },
      {
        title: 'Điều kiện đăng ký',
        items: [
          'Hộ chiếu còn hạn trên 6 tháng',
          'Chỉ nhận khách có eVisa hoặc miễn visa',
          'Khách tự túc visa'
        ]
      },
      {
        title: 'Lưu ý về chuyến hoặc hủy tour',
        items: [
          'Tour có thể hoãn/hủy do thiên tai, dịch bệnh',
          'Công ty sẽ thông báo trước 7 ngày',
          'Hoàn lại 100% nếu công ty hủy tour'
        ]
      },
      {
        title: 'Các điều kiện hủy tour đối với ngày thường',
        items: [
          'Hủy trước 20 ngày: phí 30%',
          'Hủy từ 15-20 ngày: phí 50%',
          'Hủy từ 7-15 ngày: phí 70%',
          'Hủy dưới 7 ngày: phí 100%'
        ]
      },
      {
        title: 'Trường hợp bất khả kháng',
        items: [
          'Thiên tai, dịch bệnh, chiến tranh',
          'Hủy chuyến bay do hãng hàng không',
          'Từ chối nhập cảnh do cơ quan xuất nhập cảnh'
        ]
      },
      {
        title: 'Liên hệ',
        items: [
          'Hotline: 1800 646 888',
          'Email: support@travel.com',
          'Website: www.travel.com.vn'
        ]
      },
      {
        title: 'Thông tin Visa',
        items: [
          'Đài Loan yêu cầu eVisa hoặc visa thông thường',
          'Thời gian xử lý: 5-7 ngày làm việc',
          'Chi phí visa: Khách tự túc'
        ]
      }
    ]
  };

  const toggleDay = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  const toggleNote = (noteIndex) => {
    setExpandedNote(expandedNote === noteIndex ? null : noteIndex);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === tourData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? tourData.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="tour-details">
      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="container">
          <div className="breadcrumb">
            {tourData.breadcrumb.map((item, index) => (
              <span key={index}>
                {index > 0 && ' / '}
                <a href="#">{item}</a>
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
            {/* Title */}
            <h1 className="tour-title">{tourData.title}</h1>

            {/* Image Gallery */}
            <div className="tour-gallery">
              <div className="main-image">
                <img src={tourData.images[currentImageIndex]} alt="Tour" />
                <button className="gallery-nav prev" onClick={prevImage}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="gallery-nav next" onClick={nextImage}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
              <div className="thumbnail-grid">
                {tourData.images.slice(0, 4).map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                    {index === 3 && tourData.images.length > 4 && (
                      <div className="more-images">+{tourData.images.length - 4}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="tour-tabs">
              <button
                className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Tổng quan
              </button>
              <button
                className={`tab ${activeTab === 'schedule' ? 'active' : ''}`}
                onClick={() => setActiveTab('schedule')}
              >
                Lịch khởi hành
              </button>
              <button
                className={`tab ${activeTab === 'itinerary' ? 'active' : ''}`}
                onClick={() => setActiveTab('itinerary')}
              >
                Lịch trình
              </button>
              <button
                className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                Lưu ý
              </button>
              <button
                className={`tab ${activeTab === 'program' ? 'active' : ''}`}
                onClick={() => setActiveTab('program')}
              >
                Chương trình khác
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'schedule' && (
                <div className="schedule-content">
                  <h2>LỊCH KHỞI HÀNH</h2>

                  <div className="schedule-header">
                    <button className="month-selector">Chọn tháng<br />{activeMonth}</button>
                    <div className="schedule-nav">
                      <button className="nav-btn">
                        <FontAwesomeIcon icon={faChevronLeft} /> Quay lại
                      </button>
                      <div className="current-date">{tourData.schedule.month}</div>
                    </div>
                  </div>

                  <div className="flight-info">
                    <h3>Phương tiện di chuyển</h3>

                    {/* Outbound Flight */}
                    <div className="flight-row">
                      <div className="flight-detail">
                        <div className="flight-label">Ngày đi - {tourData.schedule.flights.outbound.departure.date}</div>
                        <div className="flight-code">
                          <FontAwesomeIcon icon={faPlane} /> {tourData.schedule.flights.outbound.code}
                        </div>
                      </div>
                      <div className="flight-route">
                        <div className="route-point">
                          <div className="time">{tourData.schedule.flights.outbound.departure.time}</div>
                          <div className="airport">{tourData.schedule.flights.outbound.departure.airport}</div>
                        </div>
                        <div className="route-line"></div>
                        <div className="route-point">
                          <div className="time">{tourData.schedule.flights.outbound.arrival.time}</div>
                          <div className="airport">{tourData.schedule.flights.outbound.arrival.airport}</div>
                        </div>
                      </div>
                      <div className="airline-logo">
                        <img src="/vietnam-airlines.png" alt="Vietnam Airlines" />
                      </div>
                    </div>

                    {/* Return Flight */}
                    <div className="flight-row">
                      <div className="flight-detail">
                        <div className="flight-label">Ngày về - {tourData.schedule.flights.return.departure.date}</div>
                        <div className="flight-code">
                          <FontAwesomeIcon icon={faPlane} /> {tourData.schedule.flights.return.code}
                        </div>
                      </div>
                      <div className="flight-route">
                        <div className="route-point">
                          <div className="time">{tourData.schedule.flights.return.departure.time}</div>
                          <div className="airport">{tourData.schedule.flights.return.departure.airport}</div>
                        </div>
                        <div className="route-line"></div>
                        <div className="route-point">
                          <div className="time">{tourData.schedule.flights.return.arrival.time}</div>
                          <div className="airport">{tourData.schedule.flights.return.arrival.airport}</div>
                        </div>
                      </div>
                      <div className="airline-logo">
                        <img src="/vietnam-airlines.png" alt="Vietnam Airlines" />
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="pricing-table">
                    <h3>Giá</h3>
                    <div className="price-grid">
                      {Object.entries(tourData.schedule.prices).map(([key, item]) => (
                        <div key={key} className="price-item">
                          <div className="price-label">
                            {item.label}
                            {item.note && <div className="price-note">{item.note}</div>}
                          </div>
                          <div className="price-value">{item.price} đ</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Notes */}
                  <div className="schedule-notes">
                    {tourData.schedule.notes.map((note, index) => (
                      <div key={index} className="note-item">{note}</div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="itinerary-content">
                  <div className="itinerary-summary">
                    <div className="summary-item">
                      <strong>Thời gian lý tưởng</strong>
                      <div>{tourData.itinerary.summary.time}</div>
                    </div>
                    <div className="summary-item">
                      <strong>Phương tiện</strong>
                      <div>{tourData.itinerary.summary.transport}</div>
                    </div>
                    <div className="summary-item">
                      <strong>Khuyến mại</strong>
                      <div>{tourData.itinerary.summary.promotion}</div>
                    </div>
                  </div>

                  <h2>LỊCH TRÌNH</h2>

                  <div className="itinerary-timeline">
                    {tourData.itinerary.days.map((day, index) => (
                      <div key={index} className={`day-item ${expandedDay === index ? 'expanded' : ''}`}>
                        <div className="day-header" onClick={() => toggleDay(index)}>
                          <div className="day-title">
                            <h3>Ngày {day.day}: {day.title}</h3>
                            {day.meals.length > 0 && (
                              <div className="meals">
                                <FontAwesomeIcon icon={faUtensils} />
                                Số bữa ăn: {day.meals.length < 3 ? `0${day.meals.length}` : day.meals.length} bữa ({day.meals.join(', ')})
                              </div>
                            )}
                          </div>
                          <FontAwesomeIcon icon={expandedDay === index ? faChevronUp : faChevronDown} />
                        </div>
                        {expandedDay === index && (
                          <div className="day-content">
                            <ul className="activities-list">
                              {day.activities.map((activity, idx) => (
                                <li key={idx}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="itinerary-footer">
                    <h3>NHỮNG THÔNG TIN CẦN LƯU Ý</h3>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="notes-content">
                  <h2>NHỮNG THÔNG TIN CẦN LƯU Ý</h2>

                  <div className="notes-accordion">
                    {tourData.notes.map((note, index) => (
                      <div key={index} className={`note-accordion-item ${expandedNote === index ? 'expanded' : ''}`}>
                        <div className="note-header" onClick={() => toggleNote(index)}>
                          <h3>{note.title}</h3>
                          <FontAwesomeIcon icon={expandedNote === index ? faChevronUp : faChevronDown} />
                        </div>
                        {expandedNote === index && (
                          <div className="note-content">
                            <ul>
                              {note.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Booking Info */}
          <div className="tour-right">
            <div className="booking-card">
              <div className="price-section">
                <div className="price-label">Giá:</div>
                <div className="old-price">{tourData.oldPrice} đ / Khách</div>
                <div className="current-price">{tourData.price} đ <span>/ Khách</span></div>
              </div>

              <div className="promotion-box">
                <FontAwesomeIcon icon={faGift} />
                <span>{tourData.promotion}</span>
              </div>

              <div className="tour-info-list">
                <div className="info-item">
                  <FontAwesomeIcon icon={faTicket} />
                  <span>Mã tour: <strong>{tourData.code}</strong></span>
                </div>
                <div className="info-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>Khởi hành: <strong>{tourData.departure}</strong></span>
                </div>
                <div className="info-item">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>Ngày khởi hành: <strong>{tourData.departureDate}</strong></span>
                </div>
                <div className="info-item">
                  <FontAwesomeIcon icon={faClock} />
                  <span>Thời gian: <strong>{tourData.duration}</strong></span>
                </div>
                <div className="info-item">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Số chỗ còn: <strong>{tourData.seatsLeft}</strong></span>
                </div>
              </div>

              <div className="booking-actions">
                <button className="btn-secondary">
                  <FontAwesomeIcon icon={faCalendar} />
                  Ngày khác
                </button>
                <button className="btn-primary">Đặt ngay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
