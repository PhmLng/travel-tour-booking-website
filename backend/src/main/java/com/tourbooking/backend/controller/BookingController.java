package com.tourbooking.backend.controller;

import com.tourbooking.backend.dto.boking.BookingRequest;
import com.tourbooking.backend.dto.boking.BookingResponse;
import com.tourbooking.backend.dto.payment.RemainingAmountResponse;
import com.tourbooking.backend.service.BookingService;
import com.tourbooking.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("api/v1/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private PaymentService paymentService;

    @GetMapping("")
    public ResponseEntity<List<BookingResponse>> getAllBooking() {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getAllBooking());
    }
    @GetMapping("{id}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getBookingById(id));
    }
    @GetMapping("{id}/remaining")
    public ResponseEntity<RemainingAmountResponse> getRemainingAmount(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(paymentService.getRemainingAmount(id));
    }
    @PostMapping("")
    public ResponseEntity<BookingResponse> creatBooking(@RequestBody BookingRequest bookingRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBooking(bookingRequest));
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable long id) {
        bookingService.deleteBookingById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

}
