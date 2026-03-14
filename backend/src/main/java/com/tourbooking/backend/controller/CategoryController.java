package com.tourbooking.backend.controller;

import com.tourbooking.backend.dto.category.CategoryCreationRequest;
import com.tourbooking.backend.dto.category.CategoryResponse;
import com.tourbooking.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllCategories());
    }
    @PostMapping("")
    public ResponseEntity<CategoryResponse> creatCategory(@RequestBody CategoryCreationRequest categoryCreationRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.createCategory(categoryCreationRequest));
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

}
