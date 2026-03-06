package com.tourbooking.backend.service;

import com.tourbooking.backend.dto.category.CategoryCreationRequest;
import com.tourbooking.backend.dto.category.CategoryResponse;
import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.entity.Category;

import java.util.List;

public interface CategoryService {
    public List<CategoryResponse> getAllCategories();
    public CategoryResponse createCategory(CategoryCreationRequest category);
    public void deleteCategory(Long categoryId);
}
