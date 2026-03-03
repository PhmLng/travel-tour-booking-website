package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.boking.BookingRequest;
import com.tourbooking.backend.dto.boking.BookingResponse;
import com.tourbooking.backend.dto.passenger.PassengerRequest;
import com.tourbooking.backend.entity.*;
import com.tourbooking.backend.mapper.BookingMapper;
import com.tourbooking.backend.mapper.PassengerMapper;
import com.tourbooking.backend.repository.BookingRepository;
import com.tourbooking.backend.repository.TourRepository;
import com.tourbooking.backend.repository.UserRepository;
import com.tourbooking.backend.service.BookingService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private TourRepository tourRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PassengerMapper passengerMapper;
    @Autowired
    private BookingMapper bookingMapper;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public BookingResponse createBooking(BookingRequest bookingRequest) {
        Tour tour = tourRepository.findById(bookingRequest.getTourId()).orElseThrow(()->new RuntimeException("tour not found"));
        User user = userRepository.findById(bookingRequest.getUserId()).orElseThrow(()->new RuntimeException("user not found"));
        int bookingQuantity = bookingRequest.getQuantity();
        if(bookingQuantity > tour.getRemainingSlots()){
            throw new RuntimeException("booking quantity exceeds tour limit");
        }
        BigDecimal totalPrice = new BigDecimal(bookingQuantity).multiply(tour.getPrice());

        Booking booking = new Booking();
        booking.setTour(tour);
        booking.setUser(user);
        booking.setQuantity(bookingQuantity);
        booking.setTotalPrice(totalPrice);
        booking.setStatus(BookingStatus.PENDING);
    
        List<Passenger> passengers = new ArrayList<>();
        for(PassengerRequest passengerRequest : bookingRequest.getPassengers()){
            Passenger passenger = passengerMapper.toPassenger(passengerRequest);
            passenger.setBooking(booking);
            passengers.add(passenger);
        }
        booking.setPassengers(passengers);
        bookingRepository.save(booking);
        tour.setRemainingSlots(tour.getRemainingSlots()-bookingQuantity);
        tourRepository.save(tour);
        return bookingMapper.toBookingResponse(booking);
    }

    @Override
    public List<BookingResponse> getAllBooking() {
        List<Booking> bookings = bookingRepository.findAll();
        return  bookingMapper.toBookingResponses(bookings);
    }

    @Override
    public BookingResponse getBookingById(long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow(()->new RuntimeException("booking not found"));
        return bookingMapper.toBookingResponse(booking);
    }

    @Override
    public void deleteBookingById(long id) {
       bookingRepository.deleteById(id);
    }
}
