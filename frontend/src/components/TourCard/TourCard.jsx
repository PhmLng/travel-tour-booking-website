import React from 'react';
import { Heart, Users } from 'lucide-react'; // vẫn dùng lucide cho Heart và Users
import "./TourCard.css";

const TourCard = ({ 
  image, 
  title, 
  code, 
  departure, 
  departureDate, 
  duration, 
  seats, 
  originalPrice, 
  discountPrice,
  isHotDeal = false 
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const calculateTimeLeft = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const [timeLeft] = React.useState(calculateTimeLeft());

  return (
    <div 
      className="tour-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="tour-card-image-wrapper">
        <img src={image} alt={title} className="tour-card-image" />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart size={20} fill={isFavorite ? '#ff4757' : 'none'} />
        </button>
        <div className="countdown-badge">
          <i className="fa-solid fa-clock"></i>
          <span>Giờ chốt</span>
          <span className="time">{timeLeft}</span>
        </div>
      </div>

      <div className="tour-card-content">
        <h3 className="tour-title">{title}</h3>
        
        <div className="tour-details">
          <div className="detail-item">
            <span className="detail-icon"><i className="fa-solid fa-ticket"></i></span>
            <span className="detail-text">{code}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon"><i className="fa-solid fa-location-dot"></i></span>
            <span className="detail-text">Khởi hành: <strong>{departure}</strong></span>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon"><i className="fa-solid fa-calendar-days"></i></span>
            <span className="detail-text">Ngày khởi hành: {departureDate}</span>
          </div>
          
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-icon"><i className="fa-solid fa-clock"></i></span>
              <span className="detail-text">{duration}</span>
            </div>
            <div className="detail-item">
              <Users size={16} />
              <span className="detail-text">Số chỗ còn: <strong className="seats-left">{seats}</strong></span>
            </div>
          </div>
        </div>

        <div className="tour-footer">
          <div className="price-section">
            <div className="original-price">Giá từ: <span>{originalPrice.toLocaleString('vi-VN')} đ</span></div>
            <div className="discount-price">{discountPrice.toLocaleString('vi-VN')} đ</div>
          </div>
          <button className="book-btn">Đặt ngay</button>
        </div>
      </div>

      {isHotDeal && (
        <div className="hot-deal-badge">
          Siêu Sale
        </div>
      )}
    </div>
  );
};

// Component hiển thị nhiều tour
const TourCardItem = () => {
  const tours = [
    {
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      title: "Miền Tây: Sa Đéc Vào Xuân - Khám Phá Mùa Hoa Nở",
      code: "NDSGN818-003-010226XE-H",
      departure: "TP. Hồ Chí Minh",
      departureDate: "01/02/2026",
      duration: "Trong ngày",
      seats: 4,
      originalPrice: 899000,
      discountPrice: 799000,
      isHotDeal: false
    },
    {
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
      title: "Sapa - Fansipan - Hà Nội - Yên Tử - Hạ Long - Ninh Bình - Tràng An - Bái Đính",
      code: "NDSGN186-043-010226VU-V",
      departure: "TP. Hồ Chí Minh",
      departureDate: "01/02/2026",
      duration: "6N5D",
      seats: 2,
      originalPrice: 10990000,
      discountPrice: 10190000,
      isHotDeal: false
    },
    {
      image: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&q=80",
      title: "Phú Quốc: Khám phá Nam Đảo - Bãi Sao - Thị Trấn Hoàng Hôn - Chợ Đêm",
      code: "NDSGN870-002-010226VU-H",
      departure: "TP. Hồ Chí Minh",
      departureDate: "01/02/2026",
      duration: "3N2D",
      seats: 2,
      originalPrice: 3790000,
      discountPrice: 3590000,
      isHotDeal: true
    },
    {
      image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80",
      title: "Đà Nẵng - Phố cổ Hội An - Huế - Cầu Vàng - Vườn Tượng Apec",
      code: "NDSGN307-011-020226VU-H",
      departure: "TP. Hồ Chí Minh",
      departureDate: "02/02/2026",
      duration: "3N2D",
      seats: 8,
      originalPrice: 4690000,
      discountPrice: 4390000,
      isHotDeal: false
    }
  ];

  return (
    <div className="app">
      <h1>Ưu Đãi Giờ Chót</h1>
      <p className="subtitle">Nhanh tay nắm bắt cơ hội giảm giá cuối cùng. Đặt ngay để không bỏ lỡ!</p>
      
      <div className="tour-grid">
        {tours.map((tour, index) => (
          <TourCard key={index} {...tour} />
        ))}
      </div>
    </div>
  );
};

export default TourCardItem;
