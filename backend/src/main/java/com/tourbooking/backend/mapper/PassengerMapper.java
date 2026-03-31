package com.tourbooking.backend.mapper;

import com.tourbooking.backend.dto.passenger.PassengerRequest;
import com.tourbooking.backend.dto.passenger.PassengerResponse;
import com.tourbooking.backend.entity.Passenger;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.lang.annotation.Target;

@Mapper(componentModel = "spring")
public interface PassengerMapper {

    public Passenger toPassenger (PassengerRequest passengerRequest);
    @Mapping(target = "bookingId", source = "booking.id")
    public PassengerResponse toPassengerResponse (Passenger passenger);
}
