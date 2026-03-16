package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.boking.BookingRequest;
import com.tourbooking.backend.dto.boking.BookingResponse;
import com.tourbooking.backend.enums.BookingStatus;

import java.util.List;

public interface BookingService {
    public BookingResponse createBooking(BookingRequest bookingRequest);
    public BookingResponse getBookingById(long id);
    public List<BookingResponse> searchBookings(Long userId, BookingStatus status);
    public void deleteBookingById(long id);
    public void requestCancelBooking(Long bookingId);
    public void approveCancelBooking(Long bookingId);
}
