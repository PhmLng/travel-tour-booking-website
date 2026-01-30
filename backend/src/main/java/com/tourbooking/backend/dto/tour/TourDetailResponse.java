package com.tourbooking.backend.dto.tour;

import com.tourbooking.backend.entity.Category;
import com.tourbooking.backend.entity.TourImage;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

public class TourDetailResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Double price;

    private LocalDate startDate;

    private String duration;

    private String departureLocation;

    private String transport;

    private int maxSlots;

    private int remainingSlots;

    private String status;

    private String itinerary;

    private String policy;

    private String registrationGuide;

    private String mainImage;

    private Category category;

    private List<TourImage> gallery;
}
