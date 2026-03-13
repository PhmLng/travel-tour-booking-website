// ─── Destination info map ─────────────────────────────────────────────────────
export const destinationInfo = {
  'Thái Lan': {
    title: 'DU LỊCH THÁI LAN',
    description: 'Thiên đường du lịch Thái Lan với con người thân thiện, nền văn hóa lâu đời và cảnh quan nhiệt đới tuyệt đẹp. Những ngôi đền rực rỡ, bãi biển vàng và nụ cười tươi thắm khiến tour Thái Lan luôn là lựa chọn hấp dẫn cho du khách.',
    highlights: ['Bangkok', 'Pattaya', 'Phuket', 'Phi Phi', 'Phang Nga', 'Udon Thani'],
    breadcrumb: 'Du lịch nước ngoài',
  },
  'Singapore': {
    title: 'DU LỊCH SINGAPORE',
    description: 'Singapore – thành phố sư tử với sự kết hợp hoàn hảo giữa hiện đại và truyền thống. Khám phá Gardens by the Bay, Marina Bay Sands và ẩm thực đường phố đa dạng.',
    highlights: ['Marina Bay', 'Sentosa', 'Orchard Road', 'Chinatown'],
    breadcrumb: 'Du lịch nước ngoài',
  },
  'Nhật Bản': {
    title: 'DU LỊCH NHẬT BẢN',
    description: 'Xứ sở hoa anh đào với nền văn hóa độc đáo, ẩm thực tinh tế và phong cảnh bốn mùa tuyệt đẹp. Từ Tokyo nhộn nhịp đến Kyoto cổ kính, Nhật Bản luôn hấp dẫn du khách.',
    highlights: ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido', 'Fuji'],
    breadcrumb: 'Du lịch nước ngoài',
  },
  'Pháp': {
    title: 'DU LỊCH PHÁP',
    description: 'Paris hoa lệ – kinh đô ánh sáng với tháp Eiffel biểu tượng, bảo tàng Louvre đỉnh cao nghệ thuật và ẩm thực Pháp nổi tiếng thế giới.',
    highlights: ['Paris', 'Nice', 'Lyon', 'Bordeaux'],
    breadcrumb: 'Du lịch châu Âu',
  },
  'Ý': {
    title: 'DU LỊCH Ý',
    description: 'Đất nước hình chiếc ủng với lịch sử hàng nghìn năm, nghệ thuật đỉnh cao và ẩm thực pasta, pizza nổi tiếng toàn cầu.',
    highlights: ['Rome', 'Venice', 'Florence', 'Milan'],
    breadcrumb: 'Du lịch châu Âu',
  },
  'Thụy Sĩ': {
    title: 'DU LỊCH THỤY SĨ',
    description: 'Đất nước của những đỉnh núi Alps tuyết phủ, hồ nước trong xanh và đồng hồ thủ công tinh tế. Thụy Sĩ là thiên đường cho những ai yêu thích thiên nhiên hùng vĩ.',
    highlights: ['Zurich', 'Geneva', 'Interlaken', 'Lucerne'],
    breadcrumb: 'Du lịch châu Âu',
  },
  'Hà Nội': {
    title: 'DU LỊCH HÀ NỘI',
    description: 'Thủ đô ngàn năm văn hiến với hồ Hoàn Kiếm, phố cổ 36 phường và ẩm thực phong phú đặc sắc.',
    highlights: ['Hồ Hoàn Kiếm', 'Phố Cổ', 'Văn Miếu', 'Ba Đình'],
    breadcrumb: 'Du lịch trong nước',
  },
  'Hạ Long': {
    title: 'DU LỊCH HẠ LONG',
    description: 'Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi hùng vĩ, hang động kỳ ảo giữa vịnh biển xanh ngắt.',
    highlights: ['Vịnh Hạ Long', 'Hang Sửng Sốt', 'Đảo Ti Tốp'],
    breadcrumb: 'Du lịch trong nước',
  },
  'Sapa': {
    title: 'DU LỊCH SAPA',
    description: 'Thị trấn trong mây với ruộng bậc thang tuyệt đẹp, văn hóa các dân tộc thiểu số phong phú và đỉnh Fansipan huyền thoại.',
    highlights: ['Fansipan', 'Bản Cát Cát', 'Ruộng bậc thang'],
    breadcrumb: 'Du lịch trong nước',
  },
};

export const getDestinationInfo = (decodedDest) =>
  destinationInfo[decodedDest] || {
    title: `DU LỊCH ${decodedDest.toUpperCase()}`,
    description: `Khám phá các tour du lịch ${decodedDest} hấp dẫn với nhiều lựa chọn phong phú.`,
    highlights: [],
    breadcrumb: 'Du lịch',
  };

// ─── Filter options ───────────────────────────────────────────────────────────
export const PRICE_RANGES = [
  { label: 'Dưới 5 triệu',    value: 'under-5m' },
  { label: 'Từ 5 - 10 triệu', value: '5m-10m'   },
  { label: 'Từ 10 - 20 triệu', value: '10m-20m' },
  { label: 'Trên 20 triệu',   value: 'over-20m' },
];

export const TOUR_TYPES = [
  { label: 'Cao cấp',    value: 'luxury'   },
  { label: 'Tiêu chuẩn', value: 'standard' },
  { label: 'Tiết kiệm', value: 'budget'   },
  { label: 'Giá tốt',   value: 'deal'     },
];

export const TRANSPORTS = [
  { label: 'Xe',       value: 'xe'      },
  { label: 'Máy bay',  value: 'may-bay' },
];

export const SORT_OPTIONS = [
  { label: 'Tất cả',       value: 'all'       },
  { label: 'Giá tăng dần', value: 'price-asc' },
  { label: 'Giá giảm dần', value: 'price-desc'},
  { label: 'Mới nhất',     value: 'newest'    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price);

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
};

export const getStatusBadge = (status) => {
  const map = {
    AVAILABLE:   { text: 'Còn chỗ',  color: '#22c55e' },
    ALMOST_FULL: { text: 'Sắp đầy',  color: '#f97316' },
    FULL:        { text: 'Hết chỗ',  color: '#ef4444' },
  };
  return map[status] || map['AVAILABLE'];
};
