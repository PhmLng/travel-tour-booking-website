package com.tourbooking.backend.dto.tour;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@JsonPropertyOrder({ "id", "title", "price", "startDate", "duration", "departureLocation" })
public class TourResponse {
    private Long id;
    private String title;
    private BigDecimal adultPrice;
    private LocalDate startDate;
    private String duration;
    private String departureLocation;
    private String mainImage;
}
    