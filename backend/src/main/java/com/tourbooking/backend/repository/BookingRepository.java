package com.tourbooking.backend.repository;

import com.tourbooking.backend.dto.boking.BookingRequest;
import com.tourbooking.backend.dto.boking.BookingResponse;
import com.tourbooking.backend.entity.Booking;
import com.tourbooking.backend.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findBookingByStatus(BookingStatus status);
    List<Booking> findBookingByUserId(Long id);

    List<Booking> findBookingByUserIdAndStatus(Long userId, BookingStatus status);
}
