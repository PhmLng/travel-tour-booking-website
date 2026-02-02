package com.tourbooking.backend.mapper;

import com.tourbooking.backend.dto.tour.TourDetailResponse;
import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.dto.tour.TourUpdateRequest;
import com.tourbooking.backend.entity.Tour;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class, TourImageMapper.class})
public interface TourMapper {
    public TourDetailResponse toTourDetailResponse(Tour tour);
    public List<TourResponse> tourListTourResponses(List<Tour> tours);
    public void updateTour(@MappingTarget Tour tour, TourUpdateRequest tourUpdateRequest);
}
