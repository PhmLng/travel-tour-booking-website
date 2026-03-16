package com.tourbooking.backend.controller;

import com.tourbooking.backend.dto.tour.TourCreationRequest;
import com.tourbooking.backend.dto.tour.TourDetailResponse;
import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.dto.tour.TourUpdateRequest;
import com.tourbooking.backend.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/tours")
@RequiredArgsConstructor
public class TourController {

    private final TourService tourService;

    @GetMapping("")
    public ResponseEntity<Page<TourResponse>> getAllTours(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "9") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(tourService.getAllTours(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourDetailResponse> getTourById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(tourService.getTourById(id));
    }
    @GetMapping(params = "categoryId")
    public ResponseEntity<List<TourResponse>> getToursByCategoryId(@RequestParam("categoryId") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(tourService.getAllToursByCategory(id));
    }
    @GetMapping("/search")
    public ResponseEntity<List<TourResponse>> searchTourByTitle(@RequestParam String title) {
        return ResponseEntity.status(HttpStatus.OK).body(tourService.SearchTourByTitle(title));
    }
    @GetMapping("/filter")
    public ResponseEntity<List<TourResponse>> filterTour(@RequestParam String departure, @RequestParam String priceRange, @RequestParam LocalDateTime startDate) {
        return ResponseEntity.status(HttpStatus.OK).body(tourService.searchTours(departure, priceRange, startDate));
    }
    @PostMapping("")
    public ResponseEntity<TourDetailResponse> createTour(@RequestBody TourCreationRequest tourCreationRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tourService.createTour(tourCreationRequest));
    }
    @PutMapping("/{id}")
    public ResponseEntity<TourDetailResponse> updateTour(@PathVariable Long id, @RequestBody TourUpdateRequest tourUpdateRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(tourService.updateTour(id, tourUpdateRequest));
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
