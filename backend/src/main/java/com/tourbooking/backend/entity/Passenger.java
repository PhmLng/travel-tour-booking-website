package com.tourbooking.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "passengers")
@Data
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "fullName", nullable = false)
    private String fullName;
    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "birth", nullable = false)
    private LocalDate birth;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "isLead")
    private boolean isLead=true;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;
}
