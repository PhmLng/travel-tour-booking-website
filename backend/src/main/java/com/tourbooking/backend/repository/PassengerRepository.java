package com.tourbooking.backend.repository;

import com.tourbooking.backend.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PassengerRepository extends JpaRepository<Passenger, Integer> {
    Optional<Passenger> findById(Long id);
}
