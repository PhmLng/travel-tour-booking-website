import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle, faInfoCircle, faChevronDown, faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

const CANCEL_CONDITIONS = [
  "Hủy trước 30 ngày: hoàn lại 100% tiền cọc",
  "Hủy từ 15-30 ngày: hoàn lại 70% tiền cọc",
  "Hủy từ 7-15 ngày: hoàn lại 50% tiền cọc",
  "Hủy dưới 7 ngày: không hoàn tiền",
];

const IMPORTANT_NOTES = [
  "Mang theo giấy tờ tùy thân (CMND/CCCD/Hộ chiếu)",
  "Trẻ em dưới 5 tuổi được miễn phí",
  "Tuân thủ lịch trình và quy định của hướng dẫn viên",
  "Mua bảo hiểm du lịch để đảm bảo an toàn",
];

const AccordionItem = ({ title, items, isOpen, onToggle }) => (
  <div className={`note-accordion-item ${isOpen ? "expanded" : ""}`}>
    <div className="note-header" onClick={onToggle}>
      <h3>{title}</h3>
      <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
    </div>
    {isOpen && (
      <div className="note-content">
        <ul>
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    )}
  </div>
);

const TourPolicy = ({ policy, registrationGuide }) => {
  const [expandedNote, setExpandedNote] = useState(null);

  // Parse policy string bằng delimiter '|'
  const policySections = policy
    ? policy.split("|").filter((s) => s.trim()).map((s, i) => ({ id: i, content: s.trim() }))
    : [];

  const toggle = (index) => setExpandedNote(expandedNote === index ? null : index);

  return (
    <div className="policy-content">
      <h2>CHÍNH SÁCH & ĐIỀU KIỆN</h2>

      {policySections.length > 0 && (
        <div className="policy-section">
          <h3>Chính sách tour</h3>
          <div className="policy-text">
            {policySections.map((section) => (
              <div key={section.id} className="policy-item">
                <FontAwesomeIcon icon={faCheckCircle} className="policy-icon" />
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {registrationGuide && (
        <div className="registration-section">
          <h3>Hướng dẫn đăng ký</h3>
          <div className="registration-box">
            <FontAwesomeIcon icon={faInfoCircle} />
            <p>{registrationGuide}</p>
          </div>
        </div>
      )}

      <div className="notes-accordion">
        <AccordionItem
          title="Điều kiện hủy tour"
          items={CANCEL_CONDITIONS}
          isOpen={expandedNote === 0}
          onToggle={() => toggle(0)}
        />
        <AccordionItem
          title="Lưu ý quan trọng"
          items={IMPORTANT_NOTES}
          isOpen={expandedNote === 1}
          onToggle={() => toggle(1)}
        />
      </div>
    </div>
  );
};

export default TourPolicy;
