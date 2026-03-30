package com.tourbooking.backend.dto.passenger;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.tourbooking.backend.entity.Booking;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.tourbooking.backend.entity.Booking;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonPropertyOrder({"id", "fullName", "birth", "email", "phoneNumber", "address", "bookingId"})
public class PassengerResponse {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String email;
    private LocalDate birth;
    private Long bookingId;
}
