// src/utils/notificationUtils.js

const STORAGE_KEY = "user_notifications";

export const getNotifications = (userId) => {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return all[userId] || [];
  } catch {
    return [];
  }
};

export const saveNotifications = (userId, notifications) => {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    all[userId] = notifications;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {}
};

export const addNotification = (userId, { title, message, type = "info", bookingId }) => {
  const notifications = getNotifications(userId);
  const newNotif = {
    id: Date.now(),
    title,
    message,
    type,        // "success" | "warning" | "error" | "info"
    bookingId,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  const updated = [newNotif, ...notifications].slice(0, 50);
  saveNotifications(userId, updated);
  window.dispatchEvent(new Event("notifications-updated"));
  return updated;
};

export const markAllAsRead = (userId) => {
  const notifications = getNotifications(userId).map((n) => ({ ...n, isRead: true }));
  saveNotifications(userId, notifications);
  window.dispatchEvent(new Event("notifications-updated"));
};

export const markAsRead = (userId, notifId) => {
  const notifications = getNotifications(userId).map((n) =>
    n.id === notifId ? { ...n, isRead: true } : n
  );
  saveNotifications(userId, notifications);
  window.dispatchEvent(new Event("notifications-updated"));
};

export const getUnreadCount = (userId) =>
  getNotifications(userId).filter((n) => !n.isRead).length;

export const STATUS_NOTIFICATION_MAP = {
  CONFIRMED: {
    title: "Tour đã được xác nhận ✅",
    message: (code) => `Đơn đặt tour #${code} đã được xác nhận. Cảm ơn bạn đã tin tưởng!`,
    type: "success",
  },
  PAID: {
    title: "Thanh toán thành công 💳",
    message: (code) => `Đơn #${code} đã thanh toán đầy đủ. Chúc bạn có chuyến đi vui vẻ!`,
    type: "success",
  },
  PARTIALLY_PAID: {
    title: "Thanh toán một phần 💰",
    message: (code) => `Đơn #${code} đã thanh toán một phần. Vui lòng thanh toán phần còn lại.`,
    type: "warning",
  },
  CANCELED: {
    title: "Tour đã bị hủy ❌",
    message: (code) => `Đơn #${code} đã bị hủy bởi quản trị viên.`,
    type: "error",
  },
  CANCELED_PENDING: {
    title: "Yêu cầu hủy đang chờ xử lý ⏳",
    message: (code) => `Yêu cầu hủy đơn #${code} đang được xem xét.`,
    type: "warning",
  },
};
