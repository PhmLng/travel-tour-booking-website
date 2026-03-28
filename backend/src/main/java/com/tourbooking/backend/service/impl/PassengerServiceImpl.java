package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.passenger.PassengerResponse;
import com.tourbooking.backend.entity.Passenger;
import com.tourbooking.backend.mapper.PassengerMapper;
import com.tourbooking.backend.mapper.TourMapper;
import com.tourbooking.backend.repository.PassengerRepository;
import com.tourbooking.backend.service.PassengerService;
import com.tourbooking.backend.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PassengerServiceImpl implements PassengerService {
    private final PassengerRepository passengerRepository;
    private final PassengerMapper passengerMapper;
    private final TourMapper tourMapper;

    @Override
    public Page<PassengerResponse> getAllPassengers(int page, int size) {
        Pageable pageable1 = PageRequest.of(page-1, size);
        Page<Passenger> passengers = passengerRepository.findAll(pageable1);
        Page<PassengerResponse> passengerResponses = passengers.
                map(passenger -> passengerMapper.toPassengerResponse(passenger));
        return passengerResponses;
    }

    @Override
    public PassengerResponse getPassengerById(Long id) {
        Passenger passenger = passengerRepository.findById(id).get();
        return passengerMapper.toPassengerResponse(passenger);
    }

    @Override
    public void deletePassengerById(int id) {
        passengerRepository.deleteById(id);
    }
}
