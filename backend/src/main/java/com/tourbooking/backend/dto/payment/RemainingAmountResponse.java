package com.tourbooking.backend.dto.payment;

import com.tourbooking.backend.entity.Booking;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RemainingAmountResponse {
    private Long BookingId;
    private BigDecimal remainingAmount;
}
