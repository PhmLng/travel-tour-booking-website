package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.passenger.PassengerResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PassengerService {
    public Page<PassengerResponse> getAllPassengers(Pageable pageable);
    public PassengerResponse getPassengerById(int id);
    public void deletePassengerById(int id);
}
