package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.payment.PaymentRequest;
import com.tourbooking.backend.dto.payment.PaymentResponse;
import com.tourbooking.backend.dto.payment.RemainingAmountResponse;
import com.tourbooking.backend.entity.Booking;
import com.tourbooking.backend.entity.BookingStatus;
import com.tourbooking.backend.entity.Payment;
import com.tourbooking.backend.entity.PaymentStatus;
import com.tourbooking.backend.exception.NotFoundException;
import com.tourbooking.backend.mapper.PaymentMapper;
import com.tourbooking.backend.repository.BookingRepository;
import com.tourbooking.backend.repository.PaymentRepository;
import com.tourbooking.backend.service.PaymentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private PaymentMapper paymentMapper;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public PaymentResponse processMockPayment(PaymentRequest paymentRequest) {
        Booking booking = bookingRepository.findById(paymentRequest.getBookingId()).orElseThrow(() -> new RuntimeException("Booking not found"));

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(paymentRequest.getAmount());
        payment.setTransactionCode("MOCK_PAYMENT"+ System.currentTimeMillis());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus(PaymentStatus.SUCCESS);
        if(paymentRequest.getPaymentMethod()!=null) {
            payment.setPaymentMethod(paymentRequest.getPaymentMethod());
        }
        paymentRepository.save(payment);

        BigDecimal totalPaid = paymentRepository.sumPaidAmountByBookingId(booking.getId());

        if(totalPaid.compareTo(booking.getTotalPrice())>=0) {
            booking.setStatus(BookingStatus.PAID);
        }
        else {
            booking.setStatus(BookingStatus.PARTIALLY_PAID);
        }
        bookingRepository.save(booking);

        return paymentMapper.toPaymentResponse(payment);
    }
    @Override
    public RemainingAmountResponse getRemainingAmount(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new NotFoundException("Booking not found"));

        BigDecimal totalPaid = paymentRepository.sumPaidAmountByBookingId(bookingId);
        BigDecimal remainingAmount = totalPaid.subtract(booking.getTotalPrice());

        RemainingAmountResponse remainingAmountResponse = new RemainingAmountResponse();

        remainingAmountResponse.setBookingId(bookingId);
        remainingAmountResponse.setRemainingAmount(remainingAmount);

        return remainingAmountResponse;
    }
}
