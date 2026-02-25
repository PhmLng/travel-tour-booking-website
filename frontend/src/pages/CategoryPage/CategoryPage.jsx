import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt, faCalendar, faClock, faBus, faHeart,
  faChevronDown, faChevronUp, faSlidersH, faSearch, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import './CategoryPage.css';

// Map destination name to description
const destinationInfo = {
  'Thái Lan': {
    title: 'DU LỊCH THÁI LAN',
    description: 'Thiên đường du lịch Thái Lan với con người thân thiện, nền văn hóa lâu đời và cảnh quan nhiệt đới tuyệt đẹp. Những ngôi đền rực rỡ, bãi biển vàng và nụ cười tươi thắm khiến tour Thái Lan luôn là lựa chọn hấp dẫn cho du khách.',
    highlights: ['Bangkok', 'Pattaya', 'Phuket', 'Phi Phi', 'Phang Nga', 'Udon Thani'],
    breadcrumb: 'Du lịch nước ngoài'
  },
  'Singapore': {
    title: 'DU LỊCH SINGAPORE',
    description: 'Singapore – thành phố sư tử với sự kết hợp hoàn hảo giữa hiện đại và truyền thống. Khám phá Gardens by the Bay, Marina Bay Sands và ẩm thực đường phố đa dạng.',
    highlights: ['Marina Bay', 'Sentosa', 'Orchard Road', 'Chinatown'],
    breadcrumb: 'Du lịch nước ngoài'
  },
  'Nhật Bản': {
    title: 'DU LỊCH NHẬT BẢN',
    description: 'Xứ sở hoa anh đào với nền văn hóa độc đáo, ẩm thực tinh tế và phong cảnh bốn mùa tuyệt đẹp. Từ Tokyo nhộn nhịp đến Kyoto cổ kính, Nhật Bản luôn hấp dẫn du khách.',
    highlights: ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido', 'Fuji'],
    breadcrumb: 'Du lịch nước ngoài'
  },
  'Pháp': {
    title: 'DU LỊCH PHÁP',
    description: 'Paris hoa lệ – kinh đô ánh sáng với tháp Eiffel biểu tượng, bảo tàng Louvre đỉnh cao nghệ thuật và ẩm thực Pháp nổi tiếng thế giới.',
    highlights: ['Paris', 'Nice', 'Lyon', 'Bordeaux'],
    breadcrumb: 'Du lịch châu Âu'
  },
  'Ý': {
    title: 'DU LỊCH Ý',
    description: 'Đất nước hình chiếc ủng với lịch sử hàng nghìn năm, nghệ thuật đỉnh cao và ẩm thực pasta, pizza nổi tiếng toàn cầu.',
    highlights: ['Rome', 'Venice', 'Florence', 'Milan'],
    breadcrumb: 'Du lịch châu Âu'
  },
  'Thụy Sĩ': {
    title: 'DU LỊCH THỤY SĨ',
    description: 'Đất nước của những đỉnh núi Alps tuyết phủ, hồ nước trong xanh và đồng hồ thủ công tinh tế. Thụy Sĩ là thiên đường cho những ai yêu thích thiên nhiên hùng vĩ.',
    highlights: ['Zurich', 'Geneva', 'Interlaken', 'Lucerne'],
    breadcrumb: 'Du lịch châu Âu'
  },
  'Hà Nội': { title: 'DU LỊCH HÀ NỘI', description: 'Thủ đô ngàn năm văn hiến với hồ Hoàn Kiếm, phố cổ 36 phường và ẩm thực phong phú đặc sắc.', highlights: ['Hồ Hoàn Kiếm', 'Phố Cổ', 'Văn Miếu', 'Ba Đình'], breadcrumb: 'Du lịch trong nước' },
  'Hạ Long': { title: 'DU LỊCH HẠ LONG', description: 'Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi hùng vĩ, hang động kỳ ảo giữa vịnh biển xanh ngắt.', highlights: ['Vịnh Hạ Long', 'Hang Sửng Sốt', 'Đảo Ti Tốp'], breadcrumb: 'Du lịch trong nước' },
  'Sapa': { title: 'DU LỊCH SAPA', description: 'Thị trấn trong mây với ruộng bậc thang tuyệt đẹp, văn hóa các dân tộc thiểu số phong phú và đỉnh Fansipan huyền thoại.', highlights: ['Fansipan', 'Bản Cát Cát', 'Ruộng bậc thang'], breadcrumb: 'Du lịch trong nước' },
};

const priceRanges = [
  { label: 'Dưới 5 triệu', value: 'under-5m' },
  { label: 'Từ 5 - 10 triệu', value: '5m-10m' },
  { label: 'Từ 10 - 20 triệu', value: '10m-20m' },
  { label: 'Trên 20 triệu', value: 'over-20m' },
];

const tourTypes = [
  { label: 'Cao cấp', value: 'luxury' },
  { label: 'Tiêu chuẩn', value: 'standard' },
  { label: 'Tiết kiệm', value: 'budget' },
  { label: 'Giá tốt', value: 'deal' },
];

const transports = [
  { label: 'Xe', value: 'xe' },
  { label: 'Máy bay', value: 'may-bay' },
];

const sortOptions = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Giá tăng dần', value: 'price-asc' },
  { label: 'Giá giảm dần', value: 'price-desc' },
  { label: 'Mới nhất', value: 'newest' },
];

const CategoryPage = () => {
  const { destination } = useParams();
  const navigate = useNavigate();
  const decodedDest = decodeURIComponent(destination);
  const info = destinationInfo[decodedDest] || {
    title: `DU LỊCH ${decodedDest.toUpperCase()}`,
    description: `Khám phá các tour du lịch ${decodedDest} hấp dẫn với nhiều lựa chọn phong phú.`,
    highlights: [],
    breadcrumb: 'Du lịch'
  };

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [departureLocation, setDepartureLocation] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('all');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [departures, setDepartures] = useState(['Tất cả']);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:8080/api/v1/tours/search?title=${encodeURIComponent(decodedDest)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        let data = await response.json();
        data = Array.isArray(data) ? data : [];
        setTours(data);

        // Extract unique departure locations
        const locs = ['Tất cả', ...new Set(data.map(t => t.departureLocation).filter(Boolean))];
        setDepartures(locs);
      } catch (err) {
        console.error(err);
        // fallback - fetch all
        try {
          const res2 = await fetch('http://localhost:8080/api/v1/tours');
          let data2 = await res2.json();
          data2 = Array.isArray(data2) ? data2 : [];
          setTours(data2);
          const locs = ['Tất cả', ...new Set(data2.map(t => t.departureLocation).filter(Boolean))];
          setDepartures(locs);
        } catch (e) {
          setTours([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [decodedDest]);

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const applyFilters = () => {
    let filtered = [...tours];

    if (selectedPrice) {
      filtered = filtered.filter(t => {
        const p = t.price;
        if (selectedPrice === 'under-5m') return p < 5_000_000;
        if (selectedPrice === '5m-10m') return p >= 5_000_000 && p <= 10_000_000;
        if (selectedPrice === '10m-20m') return p > 10_000_000 && p <= 20_000_000;
        if (selectedPrice === 'over-20m') return p > 20_000_000;
        return true;
      });
    }

    if (departureDate) {
      const searchDate = new Date(departureDate);
      filtered = filtered.filter(t => {
        if (!t.startDate) return false;
        const tourDate = new Date(t.startDate);
        const diff = Math.abs((tourDate - searchDate) / (1000 * 60 * 60 * 24));
        return diff <= 15;
      });
    }

    if (departureLocation && departureLocation !== 'Tất cả') {
      filtered = filtered.filter(t => t.departureLocation === departureLocation);
    }

    if (selectedTransport) {
      filtered = filtered.filter(t => {
        const tp = t.transport?.toLowerCase() || '';
        if (selectedTransport === 'may-bay') return tp.includes('máy bay') || tp.includes('may bay') || tp.includes('bay');
        if (selectedTransport === 'xe') return tp.includes('xe');
        return true;
      });
    }

    if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    return filtered;
  };

  const filteredTours = applyFilters();

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getStatusBadge = (status) => {
    const map = {
      'AVAILABLE': { text: 'Còn chỗ', color: '#22c55e' },
      'ALMOST_FULL': { text: 'Sắp đầy', color: '#f97316' },
      'FULL': { text: 'Hết chỗ', color: '#ef4444' },
    };
    return map[status] || map['AVAILABLE'];
  };

  const resetFilters = () => {
    setSelectedPrice(null);
    setSelectedTransport(null);
    setSelectedType(null);
    setDepartureDate('');
    setDepartureLocation('Tất cả');
  };

  const FilterSidebar = () => (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3><FontAwesomeIcon icon={faSlidersH} /> BỘ LỌC TÌM KIẾM</h3>
        {(selectedPrice || selectedTransport || selectedType || departureDate || departureLocation !== 'Tất cả') && (
          <button className="reset-filter-btn" onClick={resetFilters}>
            <FontAwesomeIcon icon={faTimes} /> Xóa lọc
          </button>
        )}
      </div>

      {/* Budget */}
      <div className="filter-group">
        <h4>Ngân sách</h4>
        <div className="filter-tags">
          {priceRanges.map(p => (
            <button
              key={p.value}
              className={`filter-tag ${selectedPrice === p.value ? 'active' : ''}`}
              onClick={() => setSelectedPrice(selectedPrice === p.value ? null : p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Departure location */}
      <div className="filter-group">
        <h4>Điểm khởi hành</h4>
        <div className="filter-select-wrap">
          <select
            value={departureLocation}
            onChange={e => setDepartureLocation(e.target.value)}
            className="filter-select"
          >
            {departures.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <FontAwesomeIcon icon={faChevronDown} className="select-arrow" />
        </div>
      </div>

      {/* Destination already fixed by URL */}
      <div className="filter-group">
        <h4>Điểm đến</h4>
        <div className="filter-select-wrap">
          <select className="filter-select" value={decodedDest} disabled>
            <option>{decodedDest}</option>
          </select>
          <FontAwesomeIcon icon={faChevronDown} className="select-arrow" />
        </div>
      </div>

      {/* Departure date */}
      <div className="filter-group">
        <h4>Ngày đi</h4>
        <div className="filter-date-wrap">
          <FontAwesomeIcon icon={faCalendar} className="date-icon" />
          <input
            type="date"
            className="filter-date"
            value={departureDate}
            onChange={e => setDepartureDate(e.target.value)}
          />
        </div>
      </div>

      {/* Tour type */}
      <div className="filter-group">
        <h4>Dòng tour</h4>
        <div className="filter-tags">
          {tourTypes.map(t => (
            <button
              key={t.value}
              className={`filter-tag ${selectedType === t.value ? 'active' : ''}`}
              onClick={() => setSelectedType(selectedType === t.value ? null : t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transport */}
      <div className="filter-group">
        <h4>Phương tiện</h4>
        <div className="filter-tags">
          {transports.map(t => (
            <button
              key={t.value}
              className={`filter-tag ${selectedTransport === t.value ? 'active' : ''}`}
              onClick={() => setSelectedTransport(selectedTransport === t.value ? null : t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <button className="apply-filter-btn" onClick={() => setShowMobileFilter(false)}>
        Áp dụng
      </button>
    </div>
  );

  return (
    <>
      <Header />
      <div className="category-page">

        {/* Hero Section */}
        <div className="category-hero">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Điểm đến</a>
              <span>/</span>
              <a href="#">{info.breadcrumb}</a>
              <span>/</span>
              <span className="current">{decodedDest}</span>
            </div>
            <h1 className="category-title">{info.title}</h1>
            <p className="category-desc">{info.description}</p>
            {info.highlights.length > 0 && (
              <p className="category-highlights">
                Đăng ký tour <strong>{decodedDest}</strong> cùng chúng tôi, quý khách có thể đến khám phá:{' '}
                {info.highlights.map((h, i) => (
                  <span key={h}>
                    <a href="#" className="highlight-link">{h}</a>
                    {i < info.highlights.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="category-main">
          <div className="container">
            <div className="category-layout">

              {/* Desktop Sidebar */}
              <aside className="category-sidebar">
                <FilterSidebar />
              </aside>

              {/* Tours List */}
              <div className="category-content">

                {/* Toolbar */}
                <div className="content-toolbar">
                  <p className="result-count">
                    Chúng tôi tìm thấy{' '}
                    <strong>{filteredTours.length}</strong>{' '}
                    chương trình tour cho quý khách
                  </p>
                  <div className="toolbar-right">
                    <button
                      className="mobile-filter-btn"
                      onClick={() => setShowMobileFilter(true)}
                    >
                      <FontAwesomeIcon icon={faSlidersH} /> Bộ lọc
                    </button>
                    <div className="sort-dropdown" onClick={() => setShowSortMenu(!showSortMenu)}>
                      <span>Sắp xếp theo: </span>
                      <strong>{sortOptions.find(s => s.value === sortBy)?.label}</strong>
                      <FontAwesomeIcon icon={showSortMenu ? faChevronUp : faChevronDown} />
                      {showSortMenu && (
                        <div className="sort-menu">
                          {sortOptions.map(s => (
                            <div
                              key={s.value}
                              className={`sort-option ${sortBy === s.value ? 'active' : ''}`}
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

                {/* Loading */}
                {loading && (
                  <div className="loading-state">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="tour-card-skeleton">
                        <div className="skeleton-img" />
                        <div className="skeleton-content">
                          <div className="skeleton-line lg" />
                          <div className="skeleton-line md" />
                          <div className="skeleton-line sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty */}
                {!loading && filteredTours.length === 0 && (
                  <div className="empty-state">
                    <div className="empty-icon">😕</div>
                    <h3>Không tìm thấy tour phù hợp</h3>
                    <p>Vui lòng thử lại với điều kiện tìm kiếm khác</p>
                    <button className="reset-filter-btn large" onClick={resetFilters}>Xóa bộ lọc</button>
                  </div>
                )}

                {/* Tour Cards */}
                {!loading && filteredTours.map(tour => {
                  const status = getStatusBadge(tour.status);
                  const isFav = favorites.includes(tour.id);
                  return (
                    <Link to={`/tour/${tour.id}`} key={tour.id} className="tour-card-link">
                      <div className="tour-card">
                        <div className="tour-card-image">
                          <img
                            src={tour.mainImage || '/no-image.jpg'}
                            alt={tour.title}
                            onError={e => { e.target.src = '/no-image.jpg'; }}
                          />
                          <button
                            className={`fav-btn ${isFav ? 'active' : ''}`}
                            onClick={e => toggleFavorite(tour.id, e)}
                          >
                            <FontAwesomeIcon icon={isFav ? faHeart : faHeartRegular} />
                          </button>
                          {tour.status === 'ALMOST_FULL' && (
                            <span className="badge deal">Giá tốt</span>
                          )}
                          <span className="badge status" style={{ backgroundColor: status.color }}>
                            {status.text}
                          </span>
                        </div>

                        <div className="tour-card-body">
                          <h3 className="tour-card-title">{tour.title}</h3>

                          <div className="tour-card-meta">
                            <div className="meta-row">
                              <span className="meta-label">Mã tour:</span>
                              <span className="meta-value">TOUR-{tour.id}</span>
                              <span className="meta-label">Khởi hành:</span>
                              <span className="meta-value departure">{tour.departureLocation}</span>
                            </div>
                            <div className="meta-row">
                              <span className="meta-label">
                                <FontAwesomeIcon icon={faClock} /> Thời gian:
                              </span>
                              <span className="meta-value">{tour.duration}</span>
                              <span className="meta-label">
                                <FontAwesomeIcon icon={faBus} /> Phương tiện:
                              </span>
                              <span className="meta-value">{tour.transport || 'Đang cập nhật'}</span>
                            </div>
                            <div className="meta-row dates-row">
                              <span className="meta-label">
                                <FontAwesomeIcon icon={faCalendar} /> Ngày khởi hành:
                              </span>
                              <div className="date-tags">
                                <span className="date-tag">{formatDate(tour.startDate)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="tour-card-footer">
                            <div>
                              <span className="price-label">Giá từ:</span>
                              <span className="tour-price">{formatPrice(tour.price)} đ</span>
                            </div>
                            <button className="detail-btn">Xem chi tiết</button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {showMobileFilter && (
          <div className="mobile-filter-overlay" onClick={() => setShowMobileFilter(false)}>
            <div className="mobile-filter-drawer" onClick={e => e.stopPropagation()}>
              <div className="drawer-header">
                <h3>Bộ lọc</h3>
                <button onClick={() => setShowMobileFilter(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
