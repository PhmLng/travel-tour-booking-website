package com.tourbooking.backend.mapper;

import com.tourbooking.backend.dto.tour_image.TourImageResponse;
import com.tourbooking.backend.entity.TourImage;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TourImageMapper {
    public TourImageResponse toTourImageResponse(TourImage tourImage);
    public List<TourImageResponse> toTourImageResponses(List<TourImage> tourImages);
}
