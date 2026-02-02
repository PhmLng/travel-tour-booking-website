package com.tourbooking.backend.dto.tour;

import com.tourbooking.backend.dto.category.CategoryResponse;
import com.tourbooking.backend.entity.Category;
import com.tourbooking.backend.entity.TourImage;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
public class TourUpdateRequest {

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

    private List<CategoryResponse> categories;

    private List<TourResponse> gallery;
}
