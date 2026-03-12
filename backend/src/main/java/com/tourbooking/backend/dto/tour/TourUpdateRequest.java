package com.tourbooking.backend.dto.tour;

import com.tourbooking.backend.dto.category.CategoryLinkRequest;
import com.tourbooking.backend.dto.category.CategoryResponse;
import com.tourbooking.backend.dto.tour_image.TourImageRequest;
import com.tourbooking.backend.entity.Category;
import com.tourbooking.backend.entity.TourImage;
import com.tourbooking.backend.enums.TourStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
public class TourUpdateRequest {

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

    private List<CategoryLinkRequest> categories;

    private List<TourImageRequest> gallery;
}
