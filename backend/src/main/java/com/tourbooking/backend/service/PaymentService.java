package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.payment.PaymentRequest;
import com.tourbooking.backend.dto.payment.PaymentResponse;

import java.math.BigDecimal;

public interface PaymentService {
    public PaymentResponse processMockPayment(PaymentRequest paymentRequest);
    public BigDecimal getRemainingAmount(Long bookingId);
}
