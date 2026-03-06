package com.tourbooking.backend.mapper;

import com.tourbooking.backend.dto.payment.PaymentResponse;
import com.tourbooking.backend.entity.Payment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    public PaymentResponse toPaymentResponse(Payment payment);
}
