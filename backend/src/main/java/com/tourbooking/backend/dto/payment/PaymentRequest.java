package com.tourbooking.backend.dto.payment;

import com.tourbooking.backend.entity.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PaymentRequest {
    private Long bookingId;
    private BigDecimal amount;
    private PaymentMethod paymentMethod;
}
