package com.tourbooking.backend.repository;

import com.tourbooking.backend.dto.dashboard.MonthlyRevenueProjection;
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


    @Query(value = "SELECT MONTH(payment_date) as month, " +
            "YEAR(payment_date) as year, " +
            "SUM(amount) as revenue " +
            "FROM payments " +
            "WHERE status = 'SUCCESS' " +
            "GROUP BY year, month " +
            "ORDER BY year DESC, month DESC", nativeQuery = true)
    List<MonthlyRevenueProjection> getMonthlyRevenue();

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 'SUCCESS'")
    public BigDecimal getTotalRevenue();
}
