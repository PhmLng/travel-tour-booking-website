/* ─── DATA & CONSTANTS ─────────────────────────────── */

export const dashStats = [
  { label: 'Doanh thu tháng', value: '124,5M', change: '+12%', up: true, icon: '💰', cls: 'c1' },
  { label: 'Đặt tour tháng này', value: '1,234', change: '+5.2%', up: true, icon: '📅', cls: 'c2' },
  { label: 'Tour đang hoạt động', value: '45', change: '-2.4%', up: false, icon: '🗺', cls: 'c3' },
  { label: 'Khách hàng mới', value: '340', change: '+8.1%', up: true, icon: '👤', cls: 'c4' },
];

export const topTours = [
  { name: 'Thái Lan - Bangkok', pct: 85, gradient: 'linear-gradient(90deg,#f59e0b,#ef4444)' },
  { name: 'Nhật Bản - Tokyo', pct: 72, gradient: 'linear-gradient(90deg,#3b82f6,#6366f1)' },
  { name: 'Phú Quốc - Đảo ngọc', pct: 58, gradient: 'linear-gradient(90deg,#10b981,#06b6d4)' },
  { name: 'Hạ Long - Vịnh biển', pct: 45, gradient: 'linear-gradient(90deg,#8b5cf6,#ec4899)' },
  { name: 'Đà Lạt - Thành phố hoa', pct: 38, gradient: 'linear-gradient(90deg,#f43f5e,#f97316)' },
];

export const dashBookings = [
  { id: '#BK-7829', name: 'Sarah Jenkins', initials: 'SJ', avatar: 'linear-gradient(135deg,#f59e0b,#ef4444)', tour: 'Bali Paradise Week', date: '24/10/2023', amount: '$1,240', status: 'confirmed' },
  { id: '#BK-7830', name: 'Michael Chen', initials: 'MC', avatar: 'linear-gradient(135deg,#3b82f6,#6366f1)', tour: 'Tokyo City Lights', date: '24/10/2023', amount: '$850', status: 'pending' },
  { id: '#BK-7831', name: 'Emma Wilson', initials: 'EW', avatar: 'linear-gradient(135deg,#10b981,#06b6d4)', tour: 'Swiss Alps Hiking', date: '23/10/2023', amount: '$2,100', status: 'confirmed' },
  { id: '#BK-7832', name: 'James Rodriguez', initials: 'JR', avatar: 'linear-gradient(135deg,#8b5cf6,#ec4899)', tour: 'Safari Kenya', date: '22/10/2023', amount: '$3,450', status: 'cancelled' },
  { id: '#BK-7833', name: 'Lisa Wong', initials: 'LW', avatar: 'linear-gradient(135deg,#f43f5e,#f97316)', tour: 'Paris Culinary Tour', date: '22/10/2023', amount: '$650', status: 'confirmed' },
];

export const bookingsData = [
  { id: '#ORD-7829', name: 'Alice Johnson', email: 'alice@example.com', initials: 'AJ', avatar: 'linear-gradient(135deg,#f59e0b,#3b82f6)', tour: 'Sunset City Tour', departure: 'Oct 24, 2023', amount: '$120.00', status: 'paid' },
  { id: '#ORD-7830', name: 'Bob Smith', email: 'bob.smith@test.com', initials: 'BS', avatar: 'linear-gradient(135deg,#6366f1,#3b82f6)', tour: 'Mountain Trek 3-Day', departure: 'Nov 02, 2023', amount: '$450.00', status: 'partial' },
  { id: '#ORD-7831', name: 'Charlie Brown', email: 'charlie.b@mail.net', initials: 'CB', avatar: 'linear-gradient(135deg,#8b5cf6,#ec4899)', tour: 'Island Hopping', departure: 'Oct 28, 2023', amount: '$200.00', status: 'refunded' },
  { id: '#ORD-7832', name: 'Dana White', email: 'dana.w@example.com', initials: 'DW', avatar: 'linear-gradient(135deg,#10b981,#06b6d4)', tour: 'Historical Walk', departure: 'Oct 25, 2023', amount: '$50.00', status: 'paid' },
  { id: '#ORD-7833', name: 'Evan Wright', email: 'evan.wright@tech.io', initials: 'EW', avatar: 'linear-gradient(135deg,#f43f5e,#f97316)', tour: 'Night Safari', departure: 'Nov 10, 2023', amount: '$180.00', status: 'paid' },
  { id: '#ORD-7834', name: 'Fiona Green', email: 'fiona.g@nature.org', initials: 'FG', avatar: 'linear-gradient(135deg,#10b981,#f59e0b)', tour: 'River Cruise', departure: 'Oct 30, 2023', amount: '$90.00', status: 'partial' },
  { id: '#ORD-7835', name: 'George Hall', email: 'george.hall@edu.com', initials: 'GH', avatar: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', tour: 'Museum Pass', departure: 'Oct 24, 2023', amount: '$30.00', status: 'paid' },
  { id: '#ORD-7836', name: 'Hannah Lee', email: 'h.lee@design.net', initials: 'HL', avatar: 'linear-gradient(135deg,#ef4444,#f59e0b)', tour: 'Food Tasting Tour', departure: 'Nov 05, 2023', amount: '$110.00', status: 'paid' },
];

export const customersData = [
  { name: 'Alice Johnson', contact: 'alice@example.com', type: 'email', initials: 'AJ', bg: 'linear-gradient(135deg,#f59e0b,#3b82f6)', spent: '$1,200', status: 'online' },
  { name: 'Bob Smith', contact: '+1 555-0102', type: 'phone', initials: 'BS', bg: 'linear-gradient(135deg,#6366f1,#3b82f6)', spent: '$850', status: 'offline' },
  { name: 'Charlie Brown', contact: 'charlie@corp.com', type: 'email', initials: 'CB', bg: 'linear-gradient(135deg,#8b5cf6,#ec4899)', spent: '$2,300', status: 'online' },
  { name: 'Diana Prince', contact: 'diana@example.com', type: 'email', initials: 'DP', bg: 'linear-gradient(135deg,#ec4899,#f43f5e)', spent: '$4,500', status: 'online' },
  { name: 'Ethan Hunt', contact: '+1 555-0105', type: 'phone', initials: 'EH', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', spent: '$670', status: 'away' },
  { name: 'Fiona Gallagher', contact: 'fiona@example.com', type: 'email', initials: 'FG', bg: 'linear-gradient(135deg,#10b981,#06b6d4)', spent: '$1,100', status: 'online' },
  { name: 'George Martin', contact: 'george@example.com', type: 'email', initials: 'GM', bg: 'linear-gradient(135deg,#3b82f6,#6366f1)', spent: '$3,200', status: 'online' },
  { name: 'Hannah Lee', contact: '+1 555-0108', type: 'phone', initials: 'HL', bg: 'linear-gradient(135deg,#f43f5e,#f97316)', spent: '$900', status: 'online' },
];

export const navItems = [
  { icon: '▦', label: 'Dashboard', key: 'dashboard', badge: null },
  { icon: '📅', label: 'Đặt tour', key: 'bookings', badge: 12 },
  { icon: '🗺', label: 'Quản lý tour', key: 'tours', badge: null },
  { icon: '👥', label: 'Khách hàng', key: 'customers', badge: null },
  { icon: '📊', label: 'Thống kê', key: 'analytics', badge: null },
];

export const systemItems = [
  { icon: '⚙', label: 'Cài đặt', key: 'settings' },
  { icon: '❓', label: 'Trợ giúp', key: 'help' },
];

export const dashStatusMap = {
  confirmed: { label: 'Xác nhận', cls: 's-confirmed' },
  pending:   { label: 'Chờ duyệt', cls: 's-pending' },
  cancelled: { label: 'Đã hủy',    cls: 's-cancelled' },
};

export const bkStatusMap = {
  paid:     { label: 'Paid',           cls: 's-paid' },
  partial:  { label: 'Partially Paid', cls: 's-partial' },
  refunded: { label: 'Refunded',       cls: 's-refunded' },
  pending:  { label: 'Chờ duyệt',     cls: 's-pending' },
};

export const pageTitles = {
  dashboard: 'Tổng quan',
  bookings:  'Đặt tour',
  tours:     'Quản lý tour',
  customers: 'Khách hàng',
  analytics: 'Thống kê',
  settings:  'Cài đặt',
  help:      'Trợ giúp',
};
