import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faUser, faCreditCard, faCheckCircle,
  faPlane, faUsers, faTag, faInfoCircle, faMinus, faPlus,
  faBaby, faChild
} from '@fortawesome/free-solid-svg-icons';
import './BookingPage.css';

const STEPS = ['NHẬP THÔNG TIN', 'THANH TOÁN', 'HOÀN TẤT'];

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

const PassengerDetailCard = ({ index, passenger, showSingleRoom, singleRoomPrice, errors, errorKey, onChange }) => (
  <div className="passenger-detail-card">
    <div className="passenger-card-index">Hành khách #{index}</div>
    <div className="passenger-detail-grid">
      <div className="form-group pd-name">
        <label>Họ tên <span className="required">*</span></label>
        <input type="text" value={passenger.fullName}
          onChange={e => onChange('fullName', e.target.value)}
          placeholder="Nhập họ và tên"
          className={errors[errorKey] ? 'error' : ''} />
        {errors[errorKey] && <span className="error-msg">{errors[errorKey]}</span>}
      </div>
      <div className="form-group">
        <label>Giới tính <span className="required">*</span></label>
        <select value={passenger.gender} onChange={e => onChange('gender', e.target.value)}>
          <option>Nam</option>
          <option>Nữ</option>
          <option>Khác</option>
        </select>
      </div>
      <div className="form-group">
        <label>Ngày sinh <span className="required">*</span></label>
        <input type="date" value={passenger.dob} onChange={e => onChange('dob', e.target.value)} />
      </div>
      {showSingleRoom && (
        <div className="form-group single-room-group">
          <label>Phòng đơn</label>
          <div className="single-room-row">
            <label className="toggle-switch">
              <input type="checkbox" checked={passenger.singleRoom}
                onChange={e => onChange('singleRoom', e.target.checked)} />
              <span className="toggle-slider" />
            </label>
            <span className="single-room-price">+{singleRoomPrice}</span>
          </div>
        </div>
      )}
    </div>
  </div>
);

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

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/tours/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTourData(data);
      } catch (err) {
        setTourData({
          id, title: 'Singapore 4 ngày 3 đêm (Tặng vé tham quan Cloud Forest và Flower Dome, Khu vườn giác quan Sensory Scape)',
          tourCode: 'NNSGN193-004-120326SQ-D', mainImage: '/no-image.jpg',
          price: 17590000, adultPrice: 17590000, childPrice: 14000000,
          infantPrice: 3000000, singleRoomSurcharge: 6000000,
          departureLocation: 'Hồ Chí Minh', startDate: '2026-03-12', endDate: '2026-03-15',
          duration: '4 ngày 3 đêm', transport: 'Máy bay', maxSlots: 30, remainingSlots: 15, status: 'AVAILABLE',
          flightInfo: {
            departure: { date: '12/03/2026', depart: '12:15', arrive: '15:20' },
            return: { date: '15/03/2026', depart: '17:30', arrive: '18:40' }
          }
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

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

  const adultPrice = tourData?.adultPrice || tourData?.price || 0;
  const childPrice = tourData?.childPrice || Math.round(adultPrice * 0.8);
  const infantPrice = tourData?.infantPrice || Math.round(adultPrice * 0.1);
  const singleSurcharge = tourData?.singleRoomSurcharge || 6000000;
  const singleRoomCount = adultDetails.filter(p => p.singleRoom).length;

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  const calcTotal = () => adults * adultPrice + children * childPrice + infants * infantPrice + singleRoomCount * singleSurcharge;

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
    adultDetails.forEach((p, i) => { if (!p.fullName.trim()) errs[`adult_${i}_name`] = 'Thông tin bắt buộc'; });
    childDetails.forEach((p, i) => { if (!p.fullName.trim()) errs[`child_${i}_name`] = 'Thông tin bắt buộc'; });
    infantDetails.forEach((p, i) => { if (!p.fullName.trim()) errs[`infant_${i}_name`] = 'Thông tin bắt buộc'; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return;
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const handleSubmitBooking = async () => {
    // Map tất cả hành khách sang format API
    const allPassengers = [
      // Người lớn - người đầu tiên dùng thông tin liên lạc
      ...adultDetails.map((p, i) => ({
        fullName: p.fullName || (i === 0 ? contact.fullName : ''),
        phoneNumber: i === 0 ? contact.phone : '',
        address: i === 0 ? contact.address : '',
        birth: p.dob || '',
        email: i === 0 ? contact.email : '',
      })),
      // Trẻ em
      ...childDetails.map(p => ({
        fullName: p.fullName,
        phoneNumber: '',
        address: '',
        birth: p.dob || '',
        email: '',
      })),
      // Em bé
      ...infantDetails.map(p => ({
        fullName: p.fullName,
        phoneNumber: '',
        address: '',
        birth: p.dob || '',
        email: '',
      })),
    ];

    const payload = {
      tourId: Number(id),
      userId: 1, // hardcode tạm userId = 1 để test, thay sau khi có auth
      quantity: adults + children + infants,
      passengers: allPassengers,
    };

    try {
      const res = await fetch('http://localhost:8080/api/v1/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Booking failed');
    } catch (err) {
      console.error('Booking error:', err);
    }
    setStep(2);
    window.scrollTo(0, 0);
  };

  if (loading) return (
    <><Header /><div className="booking-loading"><div className="spinner" /><p>Đang tải...</p></div><Footer /></>
  );

  const flightInfo = tourData?.flightInfo || {
    departure: { date: tourData?.startDate, depart: '12:15', arrive: '15:20' },
    return: { date: tourData?.endDate, depart: '17:30', arrive: '18:40' }
  };

  return (
    <>
      <Header />
      <div className="booking-page">
        <div className="booking-container">
          <button className="booking-back" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
          </button>
          <h1 className="booking-title">ĐẶT TOUR</h1>

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
                        <input type="text" value={contact.fullName} onChange={e => setContact({ ...contact, fullName: e.target.value })} placeholder="Họ và tên" className={errors.fullName ? 'error' : ''} />
                        {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
                      </div>
                      <div className="form-group">
                        <label>Điện thoại <span className="required">*</span></label>
                        <input type="tel" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} placeholder="Số điện thoại" className={errors.phone ? 'error' : ''} />
                        {errors.phone && <span className="error-msg">{errors.phone}</span>}
                      </div>
                      <div className="form-group">
                        <label>Email <span className="required">*</span></label>
                        <input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="Email" className={errors.email ? 'error' : ''} />
                        {errors.email && <span className="error-msg">{errors.email}</span>}
                      </div>
                      <div className="form-group">
                        <label>Địa chỉ</label>
                        <input type="text" value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} placeholder="Địa chỉ" />
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
                    <h2 className="section-title">THÔNG TIN HÀNH KHÁCH</h2>
                    <div className="passenger-group-label">
                      <FontAwesomeIcon icon={faUsers} /><span>Người lớn</span><span className="age-note">(Từ 12 trở lên)</span>
                    </div>
                    {adultDetails.map((p, i) => (
                      <PassengerDetailCard key={`adult-${i}`} index={i + 1} passenger={p}
                        showSingleRoom={true} singleRoomPrice={formatPrice(singleSurcharge)}
                        errors={errors} errorKey={`adult_${i}_name`}
                        onChange={(field, value) => updateList(setAdultDetails, i, field, value)} />
                    ))}

                    {children > 0 && (
                      <>
                        <div className="passenger-group-label" style={{ marginTop: '20px' }}>
                          <FontAwesomeIcon icon={faChild} /><span>Trẻ em</span><span className="age-note">(Từ 2 - 11 tuổi)</span>
                        </div>
                        {childDetails.map((p, i) => (
                          <PassengerDetailCard key={`child-${i}`} index={i + 1} passenger={p}
                            showSingleRoom={false} errors={errors} errorKey={`child_${i}_name`}
                            onChange={(field, value) => updateList(setChildDetails, i, field, value)} />
                        ))}
                      </>
                    )}

                    {infants > 0 && (
                      <>
                        <div className="passenger-group-label" style={{ marginTop: '20px' }}>
                          <FontAwesomeIcon icon={faBaby} /><span>Em bé</span><span className="age-note">(Dưới 2 tuổi)</span>
                        </div>
                        {infantDetails.map((p, i) => (
                          <PassengerDetailCard key={`infant-${i}`} index={i + 1} passenger={p}
                            showSingleRoom={false} errors={errors} errorKey={`infant_${i}_name`}
                            onChange={(field, value) => updateList(setInfantDetails, i, field, value)} />
                        ))}
                      </>
                    )}
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
                    <h2 className="section-title">PHƯƠNG THỨC THANH TOÁN</h2>
                    <div className="payment-methods">
                      {['Thanh toán online (ATM/Visa/Mastercard)', 'Chuyển khoản ngân hàng', 'Thanh toán tại văn phòng'].map((m, i) => (
                        <label key={i} className="payment-option">
                          <input type="radio" name="payment" defaultChecked={i === 0} />
                          <span>{m}</span>
                        </label>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {step === 2 && (
                <section className="booking-section success-section">
                  <div className="success-icon">✅</div>
                  <h2>Đặt tour thành công!</h2>
                  <p>Cảm ơn bạn đã đặt tour. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.</p>
                  <p>Thông tin xác nhận sẽ được gửi đến: <strong>{contact.email}</strong></p>
                  <button className="btn-primary large" onClick={() => navigate('/')}>Về trang chủ</button>
                </section>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
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

                {/* summary-flight */}
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
                  <span className="total-price">{formatPrice(calcTotal())}</span>
                </div>

                {step === 0 && (
                  <button className="btn-book-now" onClick={handleNext}>Tiếp tục</button>
                )}
                {step === 1 && (
                  <>
                    <button className="btn-book-now" onClick={handleSubmitBooking} disabled={!agreePolicy}>
                      Xác nhận đặt tour
                    </button>
                    <button className="btn-secondary-full" onClick={() => setStep(0)}>Quay lại</button>
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