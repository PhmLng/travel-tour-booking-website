package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.category.CategoryLinkRequest;
import com.tourbooking.backend.dto.category.CategoryResponse;
import com.tourbooking.backend.dto.tour.TourCreationRequest;
import com.tourbooking.backend.dto.tour.TourDetailResponse;
import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.dto.tour.TourUpdateRequest;
import com.tourbooking.backend.dto.tour_image.TourImageRequest;
import com.tourbooking.backend.entity.Category;
import com.tourbooking.backend.entity.Tour;
import com.tourbooking.backend.entity.TourImage;
import com.tourbooking.backend.exception.NotFoundException;
import com.tourbooking.backend.mapper.TourMapper;
import com.tourbooking.backend.repository.CategoryRepository;
import com.tourbooking.backend.repository.TourRepository;
import com.tourbooking.backend.service.TourService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TourServiceImpl implements TourService {

    private final TourMapper tourMapper;
    private final TourRepository tourRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Page<TourResponse> getAllTours(int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        Page<Tour> tourPage = tourRepository.findByActiveTour(pageable);

        Page<TourResponse> tourResponsePage = tourPage.map(tour -> tourMapper.toTourResponse(tour));
        return tourResponsePage;
    }

    @Override
    public TourDetailResponse getTourById(Long id) {
        Tour tour = tourRepository.findById(id).orElseThrow(() ->new NotFoundException("Tour is not exist"));
        TourDetailResponse tourDetailResponse = tourMapper.toTourDetailResponse(tour);
        return tourDetailResponse;
    }

    @Override
    public List<TourResponse> getAllToursByCategory(Long id) {
        List<Tour> tours = tourRepository.findByCategoriesId(id);
        List<TourResponse> tourResponses = tourMapper.tourListTourResponses(tours) ;;
        return tourResponses;
    }

    @Override
    public List<TourResponse> SearchTourByTitle(String title) {
        List<Tour> tours = tourRepository.searchByName(title);
        List<TourResponse> tourResponses =tourMapper.tourListTourResponses(tours);
        return tourResponses;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public TourDetailResponse createTour(TourCreationRequest tourCreationRequest) {
        Tour tour = tourMapper.toTour(tourCreationRequest);

        if(tourCreationRequest.getCategories() != null) {
            List<Category> categoryList = new ArrayList<>();
            for (CategoryLinkRequest catDto : tourCreationRequest.getCategories()) {
                Category category = categoryRepository.findById(catDto.getId()).orElseThrow(()->new NotFoundException("Category is not exist"));
                categoryList.add(category);
            }
            tour.setCategories(categoryList);
        }
        if(tourCreationRequest.getGallery() != null) {
            List<TourImage> tourImageList = new ArrayList<>();
            for (TourImageRequest tourImageDto : tourCreationRequest.getGallery()) {
                TourImage tourImage = new TourImage();
                tourImage.setImageUrl(tourImageDto.getImageUrl());
                tourImage.setTour(tour);
                tourImageList.add(tourImage);
            }
            tour.setGallery(tourImageList);
        }
        tourRepository.save(tour);
        return tourMapper.toTourDetailResponse(tour);
    }

    @Override
    public TourDetailResponse updateTour(Long id, TourUpdateRequest tourUpdateRequest) {
        Tour tour = tourRepository.findById(id).orElseThrow(() ->new RuntimeException("Tour is not exist"));
        tourMapper.updateTour(tour,tourUpdateRequest);

        if(tourUpdateRequest.getCategories() != null) {
            List<Category> categoryList = new ArrayList<>();
            for (CategoryLinkRequest catDto : tourUpdateRequest.getCategories()) {
                Category category = categoryRepository.findById(catDto.getId()).orElseThrow(()->new RuntimeException("Category is not exist"));
                categoryList.add(category);
            }
            tour.setCategories(categoryList);
        }
        if(tourUpdateRequest.getGallery() != null) {
            List<TourImage> tourImageList = tour.getGallery();

            Iterator<TourImage> iterator = tourImageList.iterator();
            while(iterator.hasNext()) {
                TourImage tourImage = iterator.next();
                boolean stillExists = false;
                for (TourImageRequest tourImageDto : tourUpdateRequest.getGallery()) {
                    if(tourImageDto.getImageUrl().equals(tourImage.getImageUrl())) {
                        stillExists = true;
                        break;
                    }
                }
                if (stillExists==false) {
                    iterator.remove();
                }
            }
            List<TourImage> tourImagesTmp = new ArrayList<>();
            for (TourImageRequest tourImageDto : tourUpdateRequest.getGallery()) {
                boolean isAlreadyExists = false;
                for(TourImage tourImage : tourImageList) {
                    if(tourImageDto.getImageUrl().equals(tourImage.getImageUrl())) {
                        isAlreadyExists = true;
                        break;
                    }
                }
                if (isAlreadyExists == false) {
                    TourImage newTourImage = new TourImage();
                    newTourImage.setImageUrl(tourImageDto.getImageUrl());
                    newTourImage.setTour(tour);
                    tourImagesTmp.add(newTourImage);
                }
            }
            tourImageList.addAll(tourImagesTmp);
        }
        tourRepository.save(tour);
        return tourMapper.toTourDetailResponse(tour);
    }

    @Override
    public void deleteTour(Long id) {
        if (!tourRepository.existsById(id)) {
            throw new RuntimeException("Tour is not exist");
        }
        Tour tour = tourRepository.findById(id).orElseThrow(()->new NotFoundException("Tour is not exist"));
        tour.setDeleted(true);
        tourRepository.save(tour);
    }
}
