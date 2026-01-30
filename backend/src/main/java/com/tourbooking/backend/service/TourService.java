package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.entity.Tour;

import java.util.List;

public interface TourService {
    public List<TourResponse> getAllTours();
    public Tour getTourById(Long id);
    public List<TourResponse> SearchTourByTitle(String title);
    public Tour createTour(Tour tour);
    public Tour updateTour(Tour tour);
    public void deleteTour(Tour tour);
}
