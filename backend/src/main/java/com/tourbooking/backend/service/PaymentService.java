package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.payment.PaymentRequest;
import com.tourbooking.backend.dto.payment.PaymentResponse;
import com.tourbooking.backend.dto.payment.RemainingAmountResponse;

import java.math.BigDecimal;

public interface PaymentService {
    public PaymentResponse processMockPayment(PaymentRequest paymentRequest);
    public RemainingAmountResponse getRemainingAmount(Long bookingId);
}
