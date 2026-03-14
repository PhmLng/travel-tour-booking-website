package com.tourbooking.backend.dto.payment;

import com.tourbooking.backend.enums.PaymentMethod;
import com.tourbooking.backend.enums.PaymentType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {
    private Long bookingId;
    private PaymentType paymentType;
    private PaymentMethod paymentMethod;
}