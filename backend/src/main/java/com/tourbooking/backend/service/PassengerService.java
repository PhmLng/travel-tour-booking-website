package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.passenger.PassengerResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PassengerService {

    public Page<PassengerResponse> getAllPassengers(int page, int size);
    public PassengerResponse getPassengerById(Long id);
    public void deletePassengerById(int id);
}
