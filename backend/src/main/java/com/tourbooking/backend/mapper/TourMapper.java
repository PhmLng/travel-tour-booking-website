package com.tourbooking.backend.mapper;

import com.tourbooking.backend.dto.tour.TourCreationRequest;
import com.tourbooking.backend.dto.tour.TourDetailResponse;
import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.dto.tour.TourUpdateRequest;
import com.tourbooking.backend.entity.Tour;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class, TourImageMapper.class})
public interface TourMapper {
    public TourDetailResponse toTourDetailResponse(Tour tour);

    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "gallery", ignore = true)
    public Tour toTour(TourCreationRequest tourCreationRequest);

    public List<TourResponse> tourListTourResponses(List<Tour> tours);
    public TourResponse toTourResponse(Tour tour);
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "gallery", ignore = true)
    public void updateTour(@MappingTarget Tour tour, TourUpdateRequest tourUpdateRequest);
}
