package com.tourbooking.backend.dto.tour;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.tourbooking.backend.dto.category.CategoryResponse;
import com.tourbooking.backend.dto.tour_image.TourImageResponse;
import com.tourbooking.backend.entity.Category;
import com.tourbooking.backend.enums.TourStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@JsonPropertyOrder({
        "id", "title", "description", "price", "startDate",
        "duration", "departureLocation", "transport",
        "maxSlots", "remainingSlots", "status",
        "mainImage", "categories", "gallery",
        "itinerary", "policy", "registrationGuide"
})
public class TourDetailResponse {

    private Long id;

    private String title;

    private String description;

    private BigDecimal adultPrice;

    private BigDecimal childPrice;

    private LocalDate startDate;

    private String duration;

    private String departureLocation;

    private String transport;

    private int maxSlots;

    private int remainingSlots;

    private TourStatus status;

    private String itinerary;

    private String policy;

    private String registrationGuide;

    private String mainImage;

    private List<CategoryResponse> categories;

    private List<TourImageResponse> gallery;
}
