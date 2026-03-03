package com.tourbooking.backend.dto.boking;

import com.tourbooking.backend.dto.passenger.PassengerRequest;
import lombok.Data;

import java.util.List;

@Data
public class BookingRequest {
    private Long tourId;
    private Long userId;
    private int quantity;
    private List<PassengerRequest> passengers;
}
