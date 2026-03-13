package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.boking.BookingRequest;
import com.tourbooking.backend.dto.boking.BookingResponse;
import com.tourbooking.backend.dto.passenger.PassengerRequest;
import com.tourbooking.backend.entity.*;
import com.tourbooking.backend.enums.BookingStatus;
import com.tourbooking.backend.enums.TourStatus;
import com.tourbooking.backend.exception.NotFoundException;
import com.tourbooking.backend.mapper.BookingMapper;
import com.tourbooking.backend.mapper.PassengerMapper;
import com.tourbooking.backend.repository.BookingRepository;
import com.tourbooking.backend.repository.TourRepository;
import com.tourbooking.backend.repository.UserRepository;
import com.tourbooking.backend.service.BookingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final TourRepository tourRepository;
    private final UserRepository userRepository;
    private final PassengerMapper passengerMapper;
    private final BookingMapper bookingMapper;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public BookingResponse createBooking(BookingRequest bookingRequest) {
        Tour tour = tourRepository.findById(bookingRequest.getTourId()).orElseThrow(()->new RuntimeException("tour not found"));
        User user = userRepository.findById(bookingRequest.getUserId()).orElseThrow(()->new RuntimeException("user not found"));
        int bookingQuantity = bookingRequest.getAdultQuantity()+bookingRequest.getChildQuantity();
        if(bookingQuantity > tour.getRemainingSlots()){
            throw new RuntimeException("booking quantity exceeds tour limit");
        }
        BigDecimal totalPrice = new BigDecimal(bookingRequest.getAdultQuantity()).
                                    multiply(tour.getAdultPrice()).
                                    add(new BigDecimal(bookingRequest.getChildQuantity()).multiply(tour.getChildPrice())) ;
        Booking booking = new Booking();
        booking.setTour(tour);
        booking.setUser(user);
        booking.setAdultQuantity(bookingRequest.getAdultQuantity());
        booking.setChildQuantity(bookingRequest.getChildQuantity());
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
        if (tour.getRemainingSlots() ==0){
            tour.setStatus(TourStatus.FULL);
        }
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
        Booking booking = bookingRepository.findById(id).orElseThrow(()->new NotFoundException("booking not found"));
        return bookingMapper.toBookingResponse(booking);
    }

    @Override
    public List<BookingResponse> getBookingByStatus(BookingStatus status) {
        List<Booking> bookings = bookingRepository.findBookingByStatus(status);
        return  bookingMapper.toBookingResponses(bookings);
    }

    @Override
    public void deleteBookingById(long id) {
       bookingRepository.deleteById(id);
    }

    @Override
    public void requestCancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(()->new NotFoundException("booking not found"));
        Tour tour = booking.getTour();
        if(tour.getStatus() != TourStatus.DEPARTING){
            booking.setStatus(BookingStatus.CANCELED_PENDING);
            bookingRepository.save(booking);
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void approveCancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(()->new NotFoundException("booking not found"));

        if(booking.getStatus() == BookingStatus.CANCELED_PENDING){
            Tour tour = booking.getTour();
            int totalSlots = booking.getAdultQuantity()+booking.getChildQuantity();
            tour.setRemainingSlots(tour.getRemainingSlots()+totalSlots);

            if(tour.getStatus() == TourStatus.FULL){
                tour.setStatus(TourStatus.AVAILABLE);
            }
            booking.setStatus(BookingStatus.CANCELED);
            tourRepository.save(tour);
            bookingRepository.save(booking);
        }
    }
}
