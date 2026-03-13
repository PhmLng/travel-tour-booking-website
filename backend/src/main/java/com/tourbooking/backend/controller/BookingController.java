package com.tourbooking.backend.controller;

import com.tourbooking.backend.dto.boking.BookingRequest;
import com.tourbooking.backend.dto.boking.BookingResponse;
import com.tourbooking.backend.dto.payment.RemainingAmountResponse;
import com.tourbooking.backend.enums.BookingStatus;
import com.tourbooking.backend.service.BookingService;
import com.tourbooking.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final PaymentService paymentService;

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
    @GetMapping("/filter")
    public ResponseEntity<List<BookingResponse>> getBookingByStatus(@RequestParam BookingStatus status) {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getBookingByStatus(status));
    }
    @PostMapping("")
    public ResponseEntity<BookingResponse> creatBooking(@RequestBody BookingRequest bookingRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBooking(bookingRequest));
    }
    @PostMapping("{id}/request-cancel")
    public ResponseEntity<Void> requestCancelBooking(@PathVariable Long id){
        bookingService.requestCancelBooking(id);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }
    @PostMapping("{id}/approval-cancel")
    public ResponseEntity<Void> approvalCancelBooking(@PathVariable Long id){
        bookingService.approveCancelBooking(id);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable long id) {
        bookingService.deleteBookingById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

}
