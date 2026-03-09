import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faUser, faCreditCard, faCheckCircle,
  faPlane, faUsers, faTag, faInfoCircle, faMinus, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import './BookingPage.css';

const BASE_URL = 'http://localhost:8080/api/v1';

// ─── API helpers ─────────────────────────────────────────────────────────────
export const bookingApi = {
  create: (payload) =>
    fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
  getById: (id) => fetch(`${BASE_URL}/bookings/${id}`),
  getAll: () => fetch(`${BASE_URL}/bookings`),
  deleteById: (id) => fetch(`${BASE_URL}/bookings/${id}`, { method: 'DELETE' }),
};

export const paymentApi = {
  create: (payload) =>
    fetch(`${BASE_URL}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
};

// ─── Constants ────────────────────────────────────────────────────────────────
const STEPS = ['NHẬP THÔNG TIN', 'THANH TOÁN', 'HOÀN TẤT'];

const PAYMENT_OPTIONS = [
  {
    key: 'FULL',
    label: 'Thanh toán toàn bộ',
    desc: 'Thanh toán 100% tổng giá trị đơn hàng',
    ratio: 1,
  },
  {
    key: 'HALF',
    label: 'Thanh toán một nửa',
    desc: 'Đặt cọc 50%, thanh toán phần còn lại trước ngày khởi hành',
    ratio: 0.5,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const PassengerCounter = ({ label, sub, value, onDecrease, onIncrease }) => (
  <div className="passenger-counter">
    <div>
      <div className="counter-label">{label}</div>
      <div className="counter-sub">{sub} <FontAwesomeIcon icon={faInfoCircle} /></div>
    </div>
    <div className="counter-controls">
      <button className="counter-btn" onClick={onDecrease}><FontAwesomeIcon icon={faMinus} /></button>
      <span className="counter-value">{value}</span>
      <button className="counter-btn" onClick={onIncrease}><FontAwesomeIcon icon={faPlus} /></button>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({ fullName: '', phone: '', email: '', address: '' });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [adultDetails, setAdultDetails] = useState([{ fullName: '', gender: 'Nam', dob: '', singleRoom: false }]);
  const [childDetails, setChildDetails] = useState([]);
  const [infantDetails, setInfantDetails] = useState([]);
  const [note, setNote] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [agreePolicy, setAgreePolicy] = useState(true);
  const [errors, setErrors] = useState({});

  // Payment
  const [paymentOption, setPaymentOption] = useState('FULL');

  // API state
  const [bookingResult, setBookingResult] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);
  const [submitting, setSubmitting] = useState(false); // booking loading
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [paymentError, setPaymentError] = useState('');

  // ── Fetch tour ──
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTourData(data);
      } catch {
        setTourData({
          id, title: 'Singapore 4 ngày 3 đêm (Tặng vé tham quan Cloud Forest và Flower Dome, Khu vườn giác quan Sensory Scape)',
          tourCode: 'NNSGN193-004-120326SQ-D', mainImage: '/no-image.jpg',
          price: 17590000, adultPrice: 17590000, childPrice: 14000000,
          infantPrice: 3000000, singleRoomSurcharge: 6000000,
          departureLocation: 'Hồ Chí Minh', startDate: '2026-03-12', endDate: '2026-03-15',
          duration: '4 ngày 3 đêm', transport: 'Máy bay',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  // ── Sync passenger arrays ──
  useEffect(() => {
    setAdultDetails(prev => {
      const next = [...prev];
      while (next.length < adults) next.push({ fullName: '', gender: 'Nam', dob: '', singleRoom: false });
      return next.slice(0, adults);
    });
  }, [adults]);

  useEffect(() => {
    setChildDetails(prev => {
      const next = [...prev];
      while (next.length < children) next.push({ fullName: '', gender: 'Nam', dob: '' });
      return next.slice(0, children);
    });
  }, [children]);

  useEffect(() => {
    setInfantDetails(prev => {
      const next = [...prev];
      while (next.length < infants) next.push({ fullName: '', gender: 'Nam', dob: '' });
      return next.slice(0, infants);
    });
  }, [infants]);

  // ── Pricing ──
  const adultPrice = tourData?.adultPrice || tourData?.price || 0;
  const childPrice = tourData?.childPrice || Math.round(adultPrice * 0.8);
  const infantPrice = tourData?.infantPrice || Math.round(adultPrice * 0.1);
  const singleSurcharge = tourData?.singleRoomSurcharge || 6000000;
  const singleRoomCount = adultDetails.filter(p => p.singleRoom).length;

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  const totalAmount = adults * adultPrice + children * childPrice + infants * infantPrice + singleRoomCount * singleSurcharge;
  const payableAmount = paymentOption === 'FULL' ? totalAmount : Math.round(totalAmount * 0.5);

  // ── Handlers ──
  const updateList = (setter, index, field, value) => {
    setter(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const validateStep0 = () => {
    const errs = {};
    if (!contact.fullName.trim()) errs.fullName = 'Họ tên không được để trống';
    if (!contact.phone.trim()) errs.phone = 'Số điện thoại không được để trống';
    if (!contact.email.trim()) errs.email = 'Email không được để trống';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return;
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  // Step 1: tạo booking → rồi thanh toán
  const handleSubmitBooking = async () => {
    setSubmitting(true);
    setBookingError('');

    const allPassengers = [
      ...adultDetails.map((p, i) => ({
        fullName: p.fullName || (i === 0 ? contact.fullName : ''),
        phoneNumber: i === 0 ? contact.phone : '',
        address: i === 0 ? contact.address : '',
        birth: p.dob || '',
        email: i === 0 ? contact.email : '',
      })),
      ...childDetails.map(p => ({ fullName: p.fullName, phoneNumber: '', address: '', birth: p.dob || '', email: '' })),
      ...infantDetails.map(p => ({ fullName: p.fullName, phoneNumber: '', address: '', birth: p.dob || '', email: '' })),
    ];

    const payload = {
      tourId: Number(id),
      userId: 1, // TODO: thay bằng userId từ auth context
      quantity: adults + children + infants,
      passengers: allPassengers,
    };

    try {
      const res = await bookingApi.create(payload);
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || `Lỗi ${res.status}: Đặt tour thất bại`);
      }
      const created = await res.json();

      // Fetch chi tiết nếu cần
      let detail = created;
      if (created?.id) {
        try {
          const detailRes = await bookingApi.getById(created.id);
          if (detailRes.ok) detail = await detailRes.json();
        } catch (_) {}
      }
      setBookingResult(detail);

      // Tiếp tục thanh toán ngay sau khi booking thành công
      await handlePayment(detail.id);
    } catch (err) {
      setBookingError(err.message || 'Đã có lỗi xảy ra, vui lòng thử lại.');
      setSubmitting(false);
    }
  };

  // Thanh toán giả lập
  const handlePayment = async (bookingId) => {
    setPaymentLoading(true);
    setPaymentError('');

    const paymentPayload = {
      bookingId,
      amount: payableAmount,
      paymentMethod: 'MOCK_PAYMENT',
    };

    try {
      const res = await paymentApi.create(paymentPayload);
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || `Lỗi ${res.status}: Thanh toán thất bại`);
      }
      const result = await res.json();
      setPaymentResult(result);
      setStep(2);
      window.scrollTo(0, 0);
    } catch (err) {
      setPaymentError(err.message || 'Thanh toán thất bại, vui lòng thử lại.');
    } finally {
      setPaymentLoading(false);
      setSubmitting(false);
    }
  };

  const isProcessing = submitting || paymentLoading;

  // ── Render ──
  if (loading) return (
    <><Header /><div className="booking-loading"><div className="spinner" /><p>Đang tải...</p></div><Footer /></>
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

          {/* Steps */}
          <div className="booking-steps">
            {STEPS.map((s, i) => (
              <React.Fragment key={i}>
                <div className={`booking-step ${i === step ? 'active' : i < step ? 'done' : ''}`}>
                  <div className="step-circle">
                    {i < step ? <FontAwesomeIcon icon={faCheckCircle} /> :
                      i === 0 ? <FontAwesomeIcon icon={faUser} /> :
                        i === 1 ? <FontAwesomeIcon icon={faCreditCard} /> :
                          <FontAwesomeIcon icon={faCheckCircle} />}
                  </div>
                  <span className="step-label">{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`step-arrow ${i < step ? 'done' : ''}`}>→</div>}
              </React.Fragment>
            ))}
          </div>

          <div className="booking-body">
            <div className="booking-left">

              {/* ── STEP 0 ── */}
              {step === 0 && (
                <>
                  <section className="booking-section">
                    <h2 className="section-title">THÔNG TIN LIÊN LẠC</h2>
                    <div className="login-hint">
                      <FontAwesomeIcon icon={faUser} />
                      <span><a href="/login">Đăng nhập</a> để nhận ưu đãi, tích điểm và quản lý đơn hàng dễ dàng hơn!</span>
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Họ tên <span className="required">*</span></label>
                        <input type="text" value={contact.fullName}
                          onChange={e => setContact({ ...contact, fullName: e.target.value })}
                          placeholder="Họ và tên" className={errors.fullName ? 'error' : ''} />
                        {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
                      </div>
                      <div className="form-group">
                        <label>Điện thoại <span className="required">*</span></label>
                        <input type="tel" value={contact.phone}
                          onChange={e => setContact({ ...contact, phone: e.target.value })}
                          placeholder="Số điện thoại" className={errors.phone ? 'error' : ''} />
                        {errors.phone && <span className="error-msg">{errors.phone}</span>}
                      </div>
                      <div className="form-group">
                        <label>Email <span className="required">*</span></label>
                        <input type="email" value={contact.email}
                          onChange={e => setContact({ ...contact, email: e.target.value })}
                          placeholder="Email" className={errors.email ? 'error' : ''} />
                        {errors.email && <span className="error-msg">{errors.email}</span>}
                      </div>
                      <div className="form-group">
                        <label>Địa chỉ</label>
                        <input type="text" value={contact.address}
                          onChange={e => setContact({ ...contact, address: e.target.value })}
                          placeholder="Địa chỉ" />
                      </div>
                    </div>
                  </section>

                  <section className="booking-section">
                    <h2 className="section-title">HÀNH KHÁCH</h2>
                    <div className="passenger-counters">
                      <PassengerCounter label="Người lớn" sub="Từ 12 trở lên" value={adults}
                        onDecrease={() => setAdults(a => Math.max(1, a - 1))}
                        onIncrease={() => setAdults(a => a + 1)} />
                      <PassengerCounter label="Trẻ em" sub="Từ 2 - 11 tuổi" value={children}
                        onDecrease={() => setChildren(c => Math.max(0, c - 1))}
                        onIncrease={() => setChildren(c => c + 1)} />
                      <PassengerCounter label="Em bé" sub="Dưới 2 tuổi" value={infants}
                        onDecrease={() => setInfants(i => Math.max(0, i - 1))}
                        onIncrease={() => setInfants(i => i + 1)} />
                    </div>
                  </section>

                  <section className="booking-section">
                    <h2 className="section-title">GHI CHÚ</h2>
                    <p className="note-hint">Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi</p>
                    <textarea className="note-textarea" rows={4} value={note}
                      onChange={e => setNote(e.target.value)}
                      placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Anh hoặc tiếng Việt" />
                  </section>
                </>
              )}

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <>
                  <section className="booking-section">
                    <h2 className="section-title">XÁC NHẬN THÔNG TIN</h2>
                    <div className="confirm-info">
                      <p><strong>Họ tên:</strong> {contact.fullName}</p>
                      <p><strong>Điện thoại:</strong> {contact.phone}</p>
                      <p><strong>Email:</strong> {contact.email}</p>
                      {contact.address && <p><strong>Địa chỉ:</strong> {contact.address}</p>}
                    </div>
                  </section>

                  <section className="booking-section">
                    <h2 className="section-title">HÌNH THỨC THANH TOÁN</h2>
                    <div className="payment-options">
                      {PAYMENT_OPTIONS.map(opt => (
                        <label
                          key={opt.key}
                          className={`payment-option-card ${paymentOption === opt.key ? 'selected' : ''}`}
                          onClick={() => setPaymentOption(opt.key)}
                        >
                          <div className="payment-option-radio">
                            <input
                              type="radio"
                              name="paymentOption"
                              checked={paymentOption === opt.key}
                              onChange={() => setPaymentOption(opt.key)}
                            />
                          </div>
                          <div className="payment-option-info">
                            <div className="payment-option-label">{opt.label}</div>
                            <div className="payment-option-desc">{opt.desc}</div>
                          </div>
                          <div className="payment-option-amount">
                            {formatPrice(Math.round(totalAmount * opt.ratio))}
                          </div>
                        </label>
                      ))}
                    </div>

                    {paymentOption === 'HALF' && (
                      <div className="payment-half-notice">
                        💡 Số tiền còn lại <strong>{formatPrice(totalAmount - payableAmount)}</strong> sẽ cần thanh toán trước ngày khởi hành.
                      </div>
                    )}
                  </section>

                  {/* Loading giả lập */}
                  {isProcessing && (
                    <div className="payment-processing">
                      <div className="spinner" />
                      <p>{submitting ? 'Đang tạo đơn đặt tour...' : 'Đang xử lý thanh toán...'}</p>
                    </div>
                  )}

                  {(bookingError || paymentError) && !isProcessing && (
                    <div className="booking-error-msg">
                      ⚠️ {bookingError || paymentError}
                    </div>
                  )}
                </>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <section className="booking-section success-section">
                  <div className="success-icon">✅</div>
                  <h2>Đặt tour thành công!</h2>
                  <p>Cảm ơn bạn đã đặt tour. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.</p>
                  <p>Thông tin xác nhận sẽ được gửi đến: <strong>{contact.email}</strong></p>

                  {bookingResult && (
                    <div className="booking-result-summary">
                      {bookingResult.id && <p><strong>Mã đặt chỗ:</strong> #{bookingResult.id}</p>}
                      {bookingResult.tourTitle && <p><strong>Tour:</strong> {bookingResult.tourTitle}</p>}
                      {bookingResult.quantity && <p><strong>Số khách:</strong> {bookingResult.quantity}</p>}
                      {bookingResult.totalPrice != null && <p><strong>Tổng tiền:</strong> {formatPrice(bookingResult.totalPrice)}</p>}
                      {bookingResult.status && (
                        <p><strong>Trạng thái booking:</strong>{' '}
                          <span className={`booking-status ${bookingResult.status.toLowerCase()}`}>{bookingResult.status}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {paymentResult && (
                    <div className="payment-result-summary">
                      <h3>Thông tin thanh toán</h3>
                      {paymentResult.transactionCode && <p><strong>Mã giao dịch:</strong> {paymentResult.transactionCode}</p>}
                      {paymentResult.amount != null && <p><strong>Số tiền đã thanh toán:</strong> {formatPrice(paymentResult.amount)}</p>}
                      {paymentOption === 'HALF' && (
                        <p><strong>Số tiền còn lại:</strong> {formatPrice(totalAmount - payableAmount)}</p>
                      )}
                      {paymentResult.status && (
                        <p><strong>Trạng thái:</strong>{' '}
                          <span className={`booking-status ${paymentResult.status.toLowerCase()}`}>{paymentResult.status}</span>
                        </p>
                      )}
                      {paymentResult.paymentDate && (
                        <p><strong>Ngày thanh toán:</strong> {new Date(paymentResult.paymentDate).toLocaleString('vi-VN')}</p>
                      )}
                    </div>
                  )}

                  <button className="btn-primary large" onClick={() => navigate('/')}>Về trang chủ</button>
                </section>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="booking-right">
              <div className="summary-card">
                <h3 className="summary-title">TÓM TẮT CHUYẾN ĐI</h3>
                <div className="summary-tour">
                  <img src={tourData?.mainImage || '/no-image.jpg'} alt={tourData?.title}
                    onError={e => { e.target.src = '/no-image.jpg'; }}
                    className="summary-tour-img" />
                  <div className="summary-tour-info">
                    <p className="summary-tour-name">{tourData?.title}</p>
                    <div className="summary-tour-code">
                      <FontAwesomeIcon icon={faTag} />
                      <span>Mã tour {tourData?.tourCode || `TOUR-${id}`}</span>
                    </div>
                  </div>
                </div>

                <div className="summary-flight">
                  <div className="summary-flight-header">
                    <FontAwesomeIcon icon={faPlane} /> THÔNG TIN CHUYẾN ĐI
                  </div>
                  <div className="flight-info-list">
                    <div className="flight-info-row">
                      <span className="flight-info-label">Điểm khởi hành</span>
                      <span className="flight-info-value">{tourData?.departureLocation || '—'}</span>
                    </div>
                    <div className="flight-info-row">
                      <span className="flight-info-label">Ngày đi</span>
                      <span className="flight-info-value">
                        {tourData?.startDate
                          ? new Date(tourData.startDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                          : '—'}
                      </span>
                    </div>
                    <div className="flight-info-row">
                      <span className="flight-info-label">Phương tiện</span>
                      <span className="flight-info-value">{tourData?.transport || '—'}</span>
                    </div>
                  </div>
                </div>

                <div className="summary-price-section">
                  <div className="price-breakdown-title">
                    <FontAwesomeIcon icon={faUsers} /> KHÁCH HÀNG + PHỤ THU
                  </div>
                  <div className="price-breakdown-list">
                    {adults > 0 && (
                      <div className="price-breakdown-row">
                        <span>Người lớn × {adults}</span>
                        <span>{formatPrice(adults * adultPrice)}</span>
                      </div>
                    )}
                    {children > 0 && (
                      <div className="price-breakdown-row">
                        <span>Trẻ em × {children}</span>
                        <span>{formatPrice(children * childPrice)}</span>
                      </div>
                    )}
                    {infants > 0 && (
                      <div className="price-breakdown-row">
                        <span>Em bé × {infants}</span>
                        <span>{formatPrice(infants * infantPrice)}</span>
                      </div>
                    )}
                    {singleRoomCount > 0 && (
                      <div className="price-breakdown-row surcharge">
                        <span>Phụ thu phòng đơn × {singleRoomCount}</span>
                        <span>{formatPrice(singleRoomCount * singleSurcharge)}</span>
                      </div>
                    )}
                  </div>

                  <div className="discount-row">
                    <div className="discount-label">
                      <FontAwesomeIcon icon={faTag} /> MÃ GIẢM GIÁ
                    </div>
                    <div className="discount-input-row">
                      <input type="text" placeholder="Nhập mã giảm giá"
                        value={discountCode} onChange={e => setDiscountCode(e.target.value)}
                        className="discount-input" />
                      <button className="btn-discount">Áp dụng</button>
                    </div>
                  </div>

                  <div className="policy-agree-inline">
                    <input type="checkbox" id="agreeInline" checked={agreePolicy}
                      onChange={e => setAgreePolicy(e.target.checked)} />
                    <label htmlFor="agreeInline">
                      Tôi đồng ý với <a href="#">Chính sách</a> bảo vệ dữ liệu cá nhân và <a href="#">các điều khoản.</a>
                    </label>
                  </div>
                </div>

                <div className="summary-total">
                  <span>Tổng tiền</span>
                  <span className="total-price">{formatPrice(totalAmount)}</span>
                </div>

                {/* Hiển thị số tiền cần thanh toán ở step 1 */}
                {step === 1 && paymentOption === 'HALF' && (
                  <div className="summary-payable">
                    <span>Thanh toán ngay</span>
                    <span className="payable-price">{formatPrice(payableAmount)}</span>
                  </div>
                )}

                {step === 0 && (
                  <button className="btn-book-now" onClick={handleNext}>Tiếp tục</button>
                )}
                {step === 1 && (
                  <>
                    <button
                      className="btn-book-now"
                      onClick={handleSubmitBooking}
                      disabled={!agreePolicy || isProcessing}
                    >
                      {isProcessing ? 'Đang xử lý...' : `Thanh toán ${formatPrice(payableAmount)}`}
                    </button>
                    <button
                      className="btn-secondary-full"
                      onClick={() => { setStep(0); setBookingError(''); setPaymentError(''); }}
                      disabled={isProcessing}
                    >
                      Quay lại
                    </button>
                  </>
                )}

                <button className="btn-support">💬 Gửi yêu cầu hỗ trợ ngay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;