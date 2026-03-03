package com.tourbooking.backend.dto.boking;

import com.tourbooking.backend.dto.passenger.PassengerRequest;
import com.tourbooking.backend.entity.BookingStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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
