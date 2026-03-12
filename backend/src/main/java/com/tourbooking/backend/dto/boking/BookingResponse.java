package com.tourbooking.backend.dto.boking;

import com.tourbooking.backend.enums.BookingStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class BookingResponse {
   private Long Id;
   private String tourTitle;
   private String mainImage;
   private BigDecimal totalPrice;
   private int quantity;
   private BookingStatus status;
   private LocalDateTime bookingDate;
}
