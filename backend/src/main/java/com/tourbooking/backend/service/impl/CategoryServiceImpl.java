package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.category.CategoryCreationRequest;
import com.tourbooking.backend.dto.category.CategoryResponse;
import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.entity.Category;
import com.tourbooking.backend.entity.Tour;
import com.tourbooking.backend.mapper.CategoryMapper;
import com.tourbooking.backend.repository.CategoryRepository;
import com.tourbooking.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public List<CategoryResponse> getAllCategories() {
        List<CategoryResponse> categoryResponses = categoryMapper.toCategoryResponseList(categoryRepository.findAll());
        return categoryResponses;
    }

    @Override
    public CategoryResponse createCategory(CategoryCreationRequest categoryCreationRequest) {
        Category category = categoryMapper.toCategory(categoryCreationRequest);
        categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).get();
        List<Tour> tours = category.getTours();
        for (Tour tour : tours) {
            tour.getCategories().remove(category);
        }
        categoryRepository.delete(category);
    }
}
