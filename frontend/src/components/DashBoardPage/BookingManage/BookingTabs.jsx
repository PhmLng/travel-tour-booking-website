const tabs = [
  { label: "Tất cả", value: "all" },
  { label: "Đã xác nhận", value: "CONFIRMED" },
  { label: "Đã thanh toán", value: "PAID" },
  { label: "Thanh toán 1 phần", value: "PARTIALLY_PAID" },
  { label: "Chờ huỷ", value: "CANCELED_PENDING" },
  { label: "Đã huỷ", value: "CANCELED" },
  { label: "Chưa thanh toán", value: "PENDING" },
];

export const BookingTabs = ({ active, setActive, counts }) => {
  return (
    <div className="flex gap-3 mb-4 ">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActive(tab.value)}
          className={`px-4 py-2 rounded text-sm border hover:bg-primary/10
            ${
              active === tab.value
                ? "bg-primary text-white"
                : "bg-muted text-gray-600"
            }`}
        >
          {tab.label} ({counts[tab.value] || 0})
        </button>
      ))}
    </div>
  );
};
