package com.tourbooking.backend.dto.passenger;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Setter
@Getter
public class PassengerRequest {
    private String fullName;
    private String phoneNumber;
    private String address;
    private String email;
    private LocalDate birth;
}
