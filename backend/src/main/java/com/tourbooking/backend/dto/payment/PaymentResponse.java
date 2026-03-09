package com.tourbooking.backend.dto.payment;

import com.tourbooking.backend.entity.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
public class PaymentResponse {
    private Long id;
    private BigDecimal amount;
    private PaymentStatus status;
    private String transactionCode;
    private LocalDateTime paymentDate;
}
