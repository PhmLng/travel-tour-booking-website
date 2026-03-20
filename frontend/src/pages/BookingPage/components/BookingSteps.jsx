import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCreditCard, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const STEPS = ["NHẬP THÔNG TIN", "THANH TOÁN", "HOÀN TẤT"];

const STEP_ICONS = [faUser, faCreditCard, faCheckCircle];

const BookingSteps = ({ currentStep }) => (
  <div className="booking-steps">
    {STEPS.map((s, i) => (
      <React.Fragment key={i}>
        <div className={`booking-step ${i === currentStep ? "active" : i < currentStep ? "done" : ""}`}>
          <div className="step-circle">
            {i < currentStep
              ? <FontAwesomeIcon icon={faCheckCircle} />
              : <FontAwesomeIcon icon={STEP_ICONS[i]} />}
          </div>
          <span className="step-label">{s}</span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={`step-arrow ${i < currentStep ? "done" : ""}`}>→</div>
        )}
      </React.Fragment>
    ))}
  </div>
);

export default BookingSteps;
