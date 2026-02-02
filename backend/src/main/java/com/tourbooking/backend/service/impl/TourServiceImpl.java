package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.tour.TourCreationRequest;
import com.tourbooking.backend.dto.tour.TourDetailResponse;
import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.dto.tour.TourUpdateRequest;
import com.tourbooking.backend.entity.Tour;
import com.tourbooking.backend.mapper.TourMapper;
import com.tourbooking.backend.repository.TourRepository;
import com.tourbooking.backend.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourServiceImpl implements TourService {

    @Autowired
    private TourRepository repository;

    @Autowired
    private TourMapper tourMapper;
    @Autowired
    private TourRepository tourRepository;

    @Override
    public List<TourResponse> getAllTours() {
        List<Tour> tours = repository.findAll();
        List<TourResponse> tourResponses = tourMapper.tourListTourResponses(tours) ;;
        return tourResponses;
    }

    @Override
    public TourDetailResponse getTourById(Long id) {
        Tour tour = repository.findById(id).orElseThrow(() ->new RuntimeException("Tour is not exist"));
        TourDetailResponse tourDetailResponse = tourMapper.toTourDetailResponse(tour);
        return tourDetailResponse;
    }

    @Override
    public List<TourResponse> SearchTourByTitle(String title) {
        List<Tour> tours = tourRepository.searchByName(title);
        List<TourResponse> tourResponses =tourMapper.tourListTourResponses(tours);
        return tourResponses;
    }

    @Override
    public TourDetailResponse createTour(TourCreationRequest tour) {
        return null;
    }

    @Override
    public TourDetailResponse updateTour(Long id, TourUpdateRequest tourUpdateRequest) {
        Tour tour = repository.findById(id).orElseThrow(() ->new RuntimeException("Tour is not exist"));
        tourMapper.updateTour(tour,tourUpdateRequest);
        Tour updateTour = tourRepository.save(tour);
        return tourMapper.toTourDetailResponse(updateTour);
    }

    @Override
    public void deleteTour(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Tour is not exist");
        }
        repository.deleteById(id);
    }
}
