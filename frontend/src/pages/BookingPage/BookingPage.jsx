import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BookingSteps from "./components/BookingSteps";
import ContactForm from "./components/ContactForm";
import PassengerSection from "./components/PassengerSection";
import PaymentStep from "./components/PaymentStep";
import BookingSuccess from "./components/BookingSuccess";
import BookingSummary from "./components/BookingSummary";
import { addNotification } from "../../api/notificationUtils";
import "./BookingPage.css";

const BASE_URL = "http://localhost:8080/api/v1";

// ─── API helpers ──────────────────────────────────────────────────────────────
export const bookingApi = {
  create: (payload) => 
    fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  getById: (id) => fetch(`${BASE_URL}/bookings/${id}`),
  getAll: () => fetch(`${BASE_URL}/bookings`),
  deleteById: (id) =>
    fetch(`${BASE_URL}/bookings/${id}`, { method: "DELETE" }),
};

export const paymentApi = {
  create: (payload) =>
    fetch(`${BASE_URL}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
};

export const discountApi = {
  validate: (code) =>
    fetch(`${BASE_URL}/discounts/validate?code=${encodeURIComponent(code)}`),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN").format(price) + " đ";

const getCurrentUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// ─── Main component ───────────────────────────────────────────────────────────
const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [step, setStep] = useState(0);
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Contact
  const [contact, setContact] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
    gender: "Nam",
    singleRoom: false,
  });

  // Số lượng hành khách
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // Extras
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountStatus, setDiscountStatus] = useState(null);
  const [discountValidating, setDiscountValidating] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [errors, setErrors] = useState({});

  // Payment / booking
  const [paymentOption, setPaymentOption] = useState("FULL");
  const [bookingResult, setBookingResult] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [paymentError, setPaymentError] = useState("");

  // ── Fetch tour ──
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tours/${id}`);
        if (!res.ok) throw new Error("Không thể tải thông tin tour");
        setTourData(await res.json());
      } catch (err) {
        console.error("Fetch tour error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  // ── Pricing ──
  const adultPrice = tourData?.adultPrice || tourData?.price || 0;
  const childPrice = tourData?.childPrice || Math.round(adultPrice * 0.8);
  const infantPrice = tourData?.infantPrice || Math.round(adultPrice * 0.1);
  const singleSurcharge = tourData?.singleRoomSurcharge || 6000000;
  const singleRoomCount = contact.singleRoom ? 1 : 0;

  const subtotal =
    adults * adultPrice +
    children * childPrice +
    singleRoomCount * singleSurcharge;

  const totalAmount = Math.max(0, subtotal - discountAmount);
  const payableAmount =
    paymentOption === "FULL" ? totalAmount : Math.round(totalAmount * 0.5);

  // ── Discount ──
  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    setDiscountValidating(true);
    setDiscountStatus(null);
    setDiscountAmount(0);
    try {
      const res = await discountApi.validate(discountCode.trim());
      if (!res.ok) throw new Error("Mã không hợp lệ");
      const data = await res.json();
      const amount =
        data.discountAmount ??
        Math.round(subtotal * (data.discountPercent ?? 0) / 100);
      setDiscountAmount(amount);
      setDiscountStatus("valid");
    } catch {
      setDiscountStatus("invalid");
      setDiscountAmount(0);
    } finally {
      setDiscountValidating(false);
    }
  };

  const handleDiscountCodeChange = (value) => {
    setDiscountCode(value);
    if (discountStatus !== null) {
      setDiscountStatus(null);
      setDiscountAmount(0);
    }
  };

  // ── Validation ──
  const validateStep0 = () => {
    const errs = {};
    if (!contact.fullName.trim())
      errs.fullName = "Họ tên không được để trống";
    if (!contact.phone.trim()) {
      errs.phone = "Số điện thoại không được để trống";
    } else if (!/^0\d{9,10}$/.test(contact.phone)) {
      errs.phone = "Số điện thoại không hợp lệ (VD: 0912345678)";
    }
    if (!contact.email.trim()) {
      errs.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      errs.email = "Email không đúng định dạng (VD: example@gmail.com)";
    }
    if (!contact.dob)
      errs.dob = "Vui lòng nhập ngày sinh";
    if (!agreePolicy)
      errs.agreePolicy = "Vui lòng đồng ý với điều khoản để tiếp tục";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return;
    setStep((s) => s + 1);
    window.scrollTo(0, 0);
  };

  // ── Payment ──
  const handlePayment = async (bookingId) => {
    setPaymentLoading(true);
    setPaymentError("");
    if (!bookingId) {
      setPaymentError("Không lấy được mã booking. Vui lòng liên hệ hỗ trợ.");
      setPaymentLoading(false);
      setSubmitting(false);
      return;
    }
    try {
      const res = await paymentApi.create({
        bookingId,
        paymentType: paymentOption === "FULL" ? "DEPOSIT_FULL" : "DEPOSIT_HALF",
        paymentMethod: "MOCK_PAYMENT",
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || `Lỗi ${res.status}: Thanh toán thất bại`);
      }

      const paymentData = await res.json();
      setPaymentResult(paymentData);

      // ── Thông báo đặt tour + thanh toán thành công ──
      if (currentUser?.id) {
        addNotification(currentUser.id, {
          title: "Đặt tour thành công 🎉",
          message: `Đơn #BOOK-${bookingId} - "${tourData?.title || "Tour"}" đã được đặt và thanh toán thành công!`,
          type: "success",
          bookingId,
        });
      }

      setStep(2);
      window.scrollTo(0, 0);
    } catch (err) {
      setPaymentError(
        `Đặt tour thành công (mã #${bookingId}) nhưng thanh toán thất bại. ` +
        `Vui lòng liên hệ hỗ trợ. Chi tiết: ${err.message}`
      );

      // ── Thông báo đặt tour thành công nhưng thanh toán lỗi ──
      if (currentUser?.id) {
        addNotification(currentUser.id, {
          title: "Đặt tour thành công, thanh toán chưa hoàn tất ⚠️",
          message: `Đơn #BOOK-${bookingId} đã tạo nhưng thanh toán thất bại. Vui lòng liên hệ hỗ trợ.`,
          type: "warning",
          bookingId,
        });
      }
    } finally {
      setPaymentLoading(false);
      setSubmitting(false);
    }
  };

  // ── Booking ──
  const handleSubmitBooking = async () => {
    if (isProcessing) return;
    setSubmitting(true);
    setBookingError("");

    const payload = {
      tourId: Number(id),
      userId: currentUser?.id ?? null,
      adultQuantity: adults,
      childQuantity: children,
      passengers: [
        {
          fullName: contact.fullName,
          phoneNumber: contact.phone,
          address: contact.address,
          email: contact.email,
          birth: contact.dob || null,
        },
      ],
    };

    try {
      const res = await bookingApi.create(payload);
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || `Lỗi ${res.status}: Đặt tour thất bại`);
      }
      const created = await res.json();
      const bookingId = created?.Id ?? created?.id;

      let detail = created;
      if (bookingId) {
        try {
          const detailRes = await bookingApi.getById(bookingId);
          if (detailRes.ok) detail = await detailRes.json();
        } catch (enrichErr) {
          console.warn("getById failed (non-critical):", enrichErr);
        }
      }
      setBookingResult(detail);
      await handlePayment(bookingId);
    } catch (err) {
      setBookingError(err.message || "Đã có lỗi xảy ra, vui lòng thử lại.");
      setSubmitting(false);
    }
  };

  const isProcessing = submitting || paymentLoading;

  if (loading)
    return (
      <>
        <Header />
        <div className="booking-loading">
          <div className="spinner" />
          <p>Đang tải...</p>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <div className="booking-page">
        <div className="booking-container">
          <button className="booking-back" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
          </button>
          <h1 className="booking-title">ĐẶT TOUR</h1>

          <BookingSteps currentStep={step} />

          <div className="booking-body">
            <div className="booking-left">
              {step === 0 && (
                <>
                  <ContactForm
                    contact={contact}
                    onChange={(field, value) =>
                      setContact((c) => ({ ...c, [field]: value }))
                    }
                    errors={errors}
                    currentUser={currentUser}
                    singleSurcharge={singleSurcharge}
                    formatPrice={formatPrice}
                  />
                  <PassengerSection
                    adults={adults}
                    children={children}
                    onAdultsChange={setAdults}
                    onChildrenChange={setChildren}
                  />
                </>
              )}

              {step === 1 && (
                <PaymentStep
                  contact={contact}
                  paymentOption={paymentOption}
                  onPaymentOptionChange={setPaymentOption}
                  totalAmount={totalAmount}
                  payableAmount={payableAmount}
                  formatPrice={formatPrice}
                  isProcessing={isProcessing}
                  submitting={submitting}
                  bookingError={bookingError}
                  paymentError={paymentError}
                />
              )}

              {step === 2 && (
                <BookingSuccess
                  contact={contact}
                  bookingResult={bookingResult}
                  paymentResult={paymentResult}
                  paymentOption={paymentOption}
                  totalAmount={totalAmount}
                  payableAmount={payableAmount}
                  formatPrice={formatPrice}
                />
              )}
            </div>

            <div className="booking-right">
              <BookingSummary
                tourData={tourData}
                tourId={id}
                step={step}
                paymentOption={paymentOption}
                payableAmount={payableAmount}
                totalAmount={totalAmount}
                adults={adults}
                adultPrice={adultPrice}
                children={children}
                childPrice={childPrice}
                infants={0}
                infantPrice={infantPrice}
                singleRoomCount={singleRoomCount}
                singleSurcharge={singleSurcharge}
                discountCode={discountCode}
                discountAmount={discountAmount}
                discountStatus={discountStatus}
                discountValidating={discountValidating}
                onDiscountCodeChange={handleDiscountCodeChange}
                onApplyDiscount={handleApplyDiscount}
                agreePolicy={agreePolicy}
                onAgreePolicyChange={(checked) => {
                  setAgreePolicy(checked);
                  if (checked)
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.agreePolicy;
                      return next;
                    });
                }}
                errors={errors}
                isProcessing={isProcessing}
                formatPrice={formatPrice}
                onNext={handleNext}
                onSubmit={handleSubmitBooking}
                onBack={() => {
                  setStep(0);
                  setBookingError("");
                  setPaymentError("");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;