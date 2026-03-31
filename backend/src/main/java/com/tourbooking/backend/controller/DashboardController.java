package com.tourbooking.backend.controller;

import com.tourbooking.backend.dto.dashboard.DashboardResponse;
import com.tourbooking.backend.repository.UserRepository;
import com.tourbooking.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/dashboards")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("")
    public ResponseEntity<DashboardResponse> getDashboard() {
        return ResponseEntity.status(HttpStatus.OK).body(dashboardService.getDashboardStats());
    }
}
