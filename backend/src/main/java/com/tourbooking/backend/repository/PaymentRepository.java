package com.tourbooking.backend.repository;

import com.tourbooking.backend.dto.dashboard.MonthlyRevenueResponse;
import com.tourbooking.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.booking.id= :bookingId")
    public BigDecimal sumPaidAmountByBookingId(@Param("bookingId") Long bookingId);

//    @Query("SELECT new com.tourbooking.dto.MonthlyRevenueDTO(" +
//            "FUNCTION('DATE_FORMAT', p.paymentDate, '%Y-%m'), SUM(p.amount)) " +
//            "FROM Payment p " +
//            "WHERE p.status = 'SUCCESS' " +
//            "GROUP BY FUNCTION('DATE_FORMAT', p.paymentDate, '%Y-%m') " +
//            "ORDER BY FUNCTION('DATE_FORMAT', p.paymentDate, '%Y-%m') ASC")
//    public List<MonthlyRevenueResponse> getMonthlyRevenue();

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 'SUCCESS'")
    public BigDecimal getTotalRevenue();
}
