package com.tourbooking.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tours")
@Getter
@Setter
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title",nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "startDate")
    private LocalDate startDate;

    @Column(name = "duration")
    private String duration;

    @Column(name = "departureLocation")
    private String departureLocation;

    @Column(name = "transport")
    private String transport;
    @Column(name = "maxSlots")
    private int maxSlots;
    @Column(name = "remainingSlots")
    private int remainingSlots;
    @Column(name = "status")
    private String status;

    @Column(name="itinerary", columnDefinition = "TEXT")
    private String itinerary;

    @Column(name = "policy",columnDefinition = "TEXT")
    private String policy;

    @Column(name = "registrationGuide",columnDefinition = "TEXT")
    private String registrationGuide;

    @Column(name = "mainImage",nullable = false)
    private String mainImage;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<TourImage> gallery;
}
