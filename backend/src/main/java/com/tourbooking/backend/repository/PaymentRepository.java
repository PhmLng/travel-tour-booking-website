package com.tourbooking.backend.repository;

import com.tourbooking.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.booking.id= :bookingId")
    public BigDecimal sumPaidAmountByBookingId(@Param("bookingId") Long bookingId);
}
