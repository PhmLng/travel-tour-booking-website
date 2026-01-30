import React from 'react';
import { Heart, Clock, MapPin, Calendar, Users } from 'lucide-react';

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
          <Clock size={14} />
          <span>Giờ chốt</span>
          <span className="time">{timeLeft}</span>
        </div>
      </div>

      <div className="tour-card-content">
        <h3 className="tour-title">{title}</h3>
        
        <div className="tour-details">
          <div className="detail-item">
            <span className="detail-icon">🎫</span>
            <span className="detail-text">{code}</span>
          </div>
          
          <div className="detail-item">
            <MapPin size={16} />
            <span className="detail-text">Khởi hành: <strong>{departure}</strong></span>
          </div>
          
          <div className="detail-item">
            <Calendar size={16} />
            <span className="detail-text">Ngày khởi hành: {departureDate}</span>
          </div>
          
          <div className="detail-row">
            <div className="detail-item">
              <Clock size={16} />
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

// Demo component with multiple tour cards
const TourCardDemo = () => {
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
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          background: linear-gradient(135deg, #e8f4f8 0%, #f5f9fc 100%);
          padding: 40px 20px;
          min-height: 100vh;
        }

        .app {
          max-width: 1400px;
          margin: 0 auto;
        }

        h1 {
          font-family: 'Georgia', serif;
          font-size: 2.5rem;
          color: #1a5490;
          margin-bottom: 12px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .subtitle {
          color: #546e7a;
          font-size: 1.1rem;
          margin-bottom: 40px;
          font-weight: 400;
        }

        .tour-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
          margin-bottom: 60px;
        }

        .tour-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tour-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }

        .tour-card-image-wrapper {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .tour-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tour-card:hover .tour-card-image {
          transform: scale(1.08);
        }

        .favorite-btn {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 2;
        }

        .favorite-btn:hover {
          background: white;
          transform: scale(1.1);
        }

        .favorite-btn.active {
          background: #ffe0e6;
        }

        .countdown-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #d32f2f;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
          z-index: 2;
        }

        .countdown-badge .time {
          color: #d32f2f;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .hot-deal-badge {
          position: absolute;
          top: 50%;
          right: -45px;
          transform: translateY(-50%) rotate(45deg);
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
          color: white;
          padding: 8px 60px;
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(238, 90, 111, 0.4);
          z-index: 3;
          letter-spacing: 0.5px;
        }

        .tour-card-content {
          padding: 20px;
        }

        .tour-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
          line-height: 1.5;
          min-height: 66px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tour-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #546e7a;
          font-size: 0.9rem;
        }

        .detail-icon {
          font-size: 1rem;
        }

        .detail-item svg {
          color: #1a5490;
          flex-shrink: 0;
        }

        .detail-text {
          line-height: 1.4;
        }

        .detail-text strong {
          color: #1a1a1a;
          font-weight: 700;
        }

        .detail-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .seats-left {
          color: #d32f2f;
          font-weight: 700;
        }

        .tour-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 16px;
          border-top: 1px solid #e8ecf0;
        }

        .price-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .original-price {
          font-size: 0.85rem;
          color: #78909c;
        }

        .original-price span {
          text-decoration: line-through;
          margin-left: 4px;
        }

        .discount-price {
          font-size: 1.5rem;
          font-weight: 800;
          color: #d32f2f;
          letter-spacing: -0.5px;
        }

        .book-btn {
          background: linear-gradient(135deg, #1a5490 0%, #1976d2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(26, 84, 144, 0.25);
        }

        .book-btn:hover {
          background: linear-gradient(135deg, #155082 0%, #1565c0 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(26, 84, 144, 0.35);
        }

        .book-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .tour-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          h1 {
            font-size: 2rem;
          }
        }
      `}</style>

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

export default TourCardDemo;
