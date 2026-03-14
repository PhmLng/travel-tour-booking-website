package com.tourbooking.backend.controller;

import com.tourbooking.backend.dto.payment.PaymentRequest;
import com.tourbooking.backend.dto.payment.PaymentResponse;
import com.tourbooking.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("")
    public ResponseEntity<PaymentResponse> processPayment(@RequestBody PaymentRequest paymentRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.processMockPayment(paymentRequest));
    }
}
