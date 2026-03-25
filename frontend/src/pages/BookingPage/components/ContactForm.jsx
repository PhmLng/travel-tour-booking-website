import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ContactForm = ({ contact, onChange, errors, currentUser }) => {
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    onChange("phone", value);
  };

  return (
    <section className="booking-section">
      <h2 className="section-title">THÔNG TIN LIÊN LẠC</h2>

      {!currentUser && (
        <div className="login-hint">
          <FontAwesomeIcon icon={faUser} />
          <span>
            <Link to="/signin">Đăng nhập</Link> để điền thông tin nhanh hơn
          </span>
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label>Họ tên <span className="required">*</span></label>
          <input
            type="text"
            value={contact.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Họ và tên"
            className={errors.fullName ? "error" : ""}
          />
          {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Điện thoại <span className="required">*</span></label>
          <input
            type="tel"
            value={contact.phone}
            onChange={handlePhoneChange}
            placeholder="Số điện thoại"
            maxLength={11}
            inputMode="numeric"
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <span className="error-msg">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Email <span className="required">*</span></label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="Email"
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Địa chỉ</label>
          <input
            type="text"
            value={contact.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Địa chỉ"
          />
        </div>

        <div className="form-group">
          <label>Ngày sinh <span className="required">*</span></label>
          <input
            type="date"
            value={contact.dob}
            onChange={(e) => onChange("dob", e.target.value)}
            className={errors.dob ? "error" : ""}
          />
          {errors.dob && <span className="error-msg">{errors.dob}</span>}
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <select
            value={contact.gender}
            onChange={(e) => onChange("gender", e.target.value)}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
      </div>
    </section>
  );
};
export default ContactForm;