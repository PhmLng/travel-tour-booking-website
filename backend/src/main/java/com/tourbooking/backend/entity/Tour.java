package com.tourbooking.backend.entity;

import com.tourbooking.backend.enums.TourStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;
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

    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @Column(name = "adultPrice",nullable = false)
    private BigDecimal adultPrice;

    @Column(name = "childPrice", nullable = false)
    private BigDecimal childPrice;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TourStatus status;

    @Column(name="itinerary", columnDefinition = "TEXT")
    private String itinerary;

    @Column(name = "policy",columnDefinition = "TEXT")
    private String policy;

    @Column(name = "registrationGuide",columnDefinition = "TEXT")
    private String registrationGuide;

    @Column(name = "mainImage",nullable = false)
    private String mainImage;

    @Column(name = "isDeleted")
    private boolean isDeleted =false;
    @ManyToMany()
    @JoinTable(
            name = "tours_categories",
            joinColumns = @JoinColumn(name = "tour_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<TourImage> gallery;
}
