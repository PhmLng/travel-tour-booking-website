package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.boking.BookingRequest;
import com.tourbooking.backend.dto.boking.BookingResponse;

import java.util.List;

public interface BookingService {
    public BookingResponse createBooking(BookingRequest bookingRequest);
    public List<BookingResponse> getAllBooking();
    public BookingResponse getBookingById(long id);
    public void deleteBookingById(long id);
}
