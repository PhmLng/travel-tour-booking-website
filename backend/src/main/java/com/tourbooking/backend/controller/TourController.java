package com.tourbooking.backend.controller;

import com.tourbooking.backend.dto.tour.TourDetailResponse;
import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.dto.tour.TourUpdateRequest;
import com.tourbooking.backend.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/tours")
public class TourController {
    @Autowired
    private TourService tourService;

    @GetMapping("")
    public ResponseEntity<List<TourResponse>> getAllTours() {
        return ResponseEntity.status(HttpStatus.OK).body(tourService.getAllTours());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourDetailResponse> getTourById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(tourService.getTourById(id));
    }
    @GetMapping("/search")
    public ResponseEntity<List<TourResponse>> searchTourByTitle(@RequestParam String title) {
        return ResponseEntity.status(HttpStatus.OK).body(tourService.SearchTourByTitle(title));
    }
    @PutMapping("/{id}")
    public ResponseEntity<TourDetailResponse> updateTour(@PathVariable Long id, @RequestBody TourUpdateRequest tourUpdateRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(tourService.updateTour(id, tourUpdateRequest));
    }

}
