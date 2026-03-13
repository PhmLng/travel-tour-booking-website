import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

// ─── PassengerCounter ─────────────────────────────────────────────────────────
const PassengerCounter = ({ label, sub, value, onDecrease, onIncrease }) => (
  <div className="passenger-counter">
    <div>
      <div className="counter-label">{label}</div>
      <div className="counter-sub">
        {sub} <FontAwesomeIcon icon={faInfoCircle} />
      </div>
    </div>
    <div className="counter-controls">
      <button className="counter-btn" onClick={onDecrease}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <span className="counter-value">{value}</span>
      <button className="counter-btn" onClick={onIncrease}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  </div>
);

// ─── PassengerDetailCard ──────────────────────────────────────────────────────
const PassengerDetailCard = ({
  label, index, passenger, isLead, contactName,
  showSingleRoom, singleRoomPrice, errors, errorKey, onChange,
}) => (
  <div className="passenger-detail-card">
    <div className="passenger-card-header">
      <span className="passenger-card-badge">{index}</span>
      <span className="passenger-card-label">
        {label} {isLead && <span className="lead-tag">Liên lạc chính</span>}
      </span>
    </div>
    <div className="form-grid">
      {isLead ? (
        <div className="form-group">
          <label>Họ tên</label>
          <input
            type="text"
            value={contactName}
            disabled
            className="input-disabled"
            placeholder="Lấy từ thông tin liên lạc"
          />
        </div>
      ) : (
        <div className="form-group">
          <label>Họ tên <span className="required">*</span></label>
          <input
            type="text"
            value={passenger.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Họ và tên"
            className={errors[errorKey] ? "error" : ""}
          />
          {errors[errorKey] && <span className="error-msg">{errors[errorKey]}</span>}
        </div>
      )}

      <div className="form-group">
        <label>Ngày sinh <span className="required">*</span></label>
        <input
          type="date"
          value={passenger.dob}
          onChange={(e) => onChange("dob", e.target.value)}
          className={errors.dob && !passenger.dob ? "error" : ""}
        />
      </div>

      <div className="form-group">
        <label>Giới tính</label>
        <select
          value={passenger.gender || "Nam"}
          onChange={(e) => onChange("gender", e.target.value)}
        >
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>

      {showSingleRoom && (
        <div className="form-group form-group-checkbox">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={!!passenger.singleRoom}
              onChange={(e) => onChange("singleRoom", e.target.checked)}
            />
            <span>Phụ thu phòng đơn <strong>({singleRoomPrice})</strong></span>
          </label>
        </div>
      )}
    </div>
  </div>
);

// ─── PassengerSection ─────────────────────────────────────────────────────────
const PassengerSection = ({
  adults, children, infants,
  onAdultsChange, onChildrenChange, onInfantsChange,
  adultDetails, childDetails, infantDetails,
  onAdultChange, onChildChange, onInfantChange,
  contactName, singleSurcharge, formatPrice, errors,
}) => (
  <section className="booking-section">
    <h2 className="section-title">HÀNH KHÁCH</h2>

    <div className="passenger-counters">
      <PassengerCounter
        label="Người lớn" sub="Từ 12 trở lên" value={adults}
        onDecrease={() => onAdultsChange(Math.max(1, adults - 1))}
        onIncrease={() => onAdultsChange(adults + 1)}
      />
      <PassengerCounter
        label="Trẻ em" sub="Từ 2 - 11 tuổi" value={children}
        onDecrease={() => onChildrenChange(Math.max(0, children - 1))}
        onIncrease={() => onChildrenChange(children + 1)}
      />
      <PassengerCounter
        label="Em bé" sub="Dưới 2 tuổi" value={infants}
        onDecrease={() => onInfantsChange(Math.max(0, infants - 1))}
        onIncrease={() => onInfantsChange(infants + 1)}
      />
    </div>

    <div className="passenger-cards">
      {adultDetails.map((p, i) => (
        <PassengerDetailCard
          key={`adult-${i}`}
          label={`Người lớn ${i + 1}`}
          index={i + 1}
          passenger={p}
          isLead={i === 0}
          contactName={contactName}
          showSingleRoom={true}
          singleRoomPrice={formatPrice(singleSurcharge)}
          errors={errors}
          errorKey={`adult_${i}_name`}
          onChange={(field, value) => onAdultChange(i, field, value)}
        />
      ))}
      {childDetails.map((p, i) => (
        <PassengerDetailCard
          key={`child-${i}`}
          label={`Trẻ em ${i + 1}`}
          index={adults + i + 1}
          passenger={p}
          isLead={false}
          contactName=""
          showSingleRoom={false}
          singleRoomPrice=""
          errors={errors}
          errorKey={`child_${i}_name`}
          onChange={(field, value) => onChildChange(i, field, value)}
        />
      ))}
      {infantDetails.map((p, i) => (
        <PassengerDetailCard
          key={`infant-${i}`}
          label={`Em bé ${i + 1}`}
          index={adults + children + i + 1}
          passenger={p}
          isLead={false}
          contactName=""
          showSingleRoom={false}
          singleRoomPrice=""
          errors={errors}
          errorKey={`infant_${i}_name`}
          onChange={(field, value) => onInfantChange(i, field, value)}
        />
      ))}
    </div>

    {errors.dob && (
      <p className="error-msg" style={{ marginTop: "8px" }}>⚠️ {errors.dob}</p>
    )}
  </section>
);

export default PassengerSection;
