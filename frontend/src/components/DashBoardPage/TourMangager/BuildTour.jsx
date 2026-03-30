export const BuildTour = (data) => {
  const tours = data?.content || [];
  const total = tours.length;
  const booked = tours.filter((t) => t.id % 2 === 0).length;
  const available = total - booked;
  const full = tours.filter((t) => t.id % 3 === 0).length;

  return [
    {
      description: "Tổng số tour",
      value: total,
      change: `+${total}`, 
      trend: "up",
      note: "Tổng số tour hiện có",
      sub: "Trong hệ thống",
    },
    {
      description: "Tour đã được đặt",
      value: booked,
      change: `+${booked}`,
      trend: "up",
      note: "Khách đang quan tâm",
      sub: "Số lượt đặt",
    },
    {
      description: "Tour còn chỗ",
      value: available,
      change: `+${available}`,
      trend: "up",
      note: "Có thể đặt",
      sub: "Tour khả dụng",
    },
    {
      description: "Tour hết chỗ",
      value: full,
      change: `+${full}`,
      trend: "down",
      note: "Đã đủ khách",
      sub: "Không thể đặt",
    },
  ];
};