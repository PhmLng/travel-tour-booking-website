package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.tour.TourCreationRequest;
import com.tourbooking.backend.dto.tour.TourDetailResponse;
import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.dto.tour.TourUpdateRequest;
import com.tourbooking.backend.entity.Tour;

import java.util.List;

public interface TourService {
    public List<TourResponse> getAllTours();
    public TourDetailResponse getTourById(Long id);
    public List<TourResponse> SearchTourByTitle(String title);
    public TourDetailResponse createTour(TourCreationRequest tour);
    public TourDetailResponse updateTour(Long id,TourUpdateRequest tourUpdateRequest );

    public void deleteTour(Long id);
}
