package com.tourbooking.backend.mapper;

import com.tourbooking.backend.dto.boking.BookingResponse;
import com.tourbooking.backend.entity.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    @Mapping(source = "tour.title", target = "tourTitle")
    @Mapping(source = "tour.mainImage", target = "mainImage")
    public BookingResponse toBookingResponse(Booking booking);

    @Mapping(source = "tour.title", target = "tourTitle")
    @Mapping(source = "tour.mainImage", target = "mainImage")
    public List<BookingResponse> toBookingResponses(List<Booking> bookings);
}
