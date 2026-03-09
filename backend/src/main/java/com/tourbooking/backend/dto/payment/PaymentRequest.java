package com.tourbooking.backend.dto.payment;

import com.tourbooking.backend.entity.PaymentMethod;
import com.tourbooking.backend.entity.PaymentType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import java.math.BigDecimal;

@Getter
@Setter
public class PaymentRequest {
    private Long bookingId;
    private BigDecimal amount;
    private PaymentType paymentType;
    private PaymentMethod paymentMethod;
}