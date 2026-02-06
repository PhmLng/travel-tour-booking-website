package com.tourbooking.backend.mapper;

import com.tourbooking.backend.dto.category.CategoryCreationRequest;
import com.tourbooking.backend.dto.category.CategoryResponse;
import com.tourbooking.backend.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    public CategoryResponse toCategoryResponse(Category category);

    @Mapping(target = "tours", ignore = true)
    public Category toCategory(CategoryCreationRequest categoryCreationRequest);

    public List<CategoryResponse> toCategoryResponseList(List<Category> categoryList);
}
