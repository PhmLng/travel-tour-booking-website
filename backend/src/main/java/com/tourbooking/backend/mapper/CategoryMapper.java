package com.tourbooking.backend.mapper;

import com.tourbooking.backend.dto.category.CategoryResponse;
import com.tourbooking.backend.entity.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    public CategoryResponse toCategoryResponse(Category category);
    public List<CategoryResponse> toCategoryResponseList(List<Category> categoryList);
}
