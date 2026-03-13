package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.dashboard.DashboardResponse;
import com.tourbooking.backend.dto.dashboard.MonthlyRevenueProjection;
import com.tourbooking.backend.dto.dashboard.MonthlyRevenueResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.tourbooking.backend.repository.BookingRepository;
import com.tourbooking.backend.repository.TourRepository;
import com.tourbooking.backend.repository.UserRepository;
import com.tourbooking.backend.repository.PaymentRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl {

    private final PaymentRepository paymentRepository;

    private final BookingRepository bookingRepository;

    private final UserRepository userRepository;

    private final TourRepository tourRepository;

    public DashboardResponse getDashboardStats() {
        DashboardResponse dashboardResponse = new DashboardResponse();
        dashboardResponse.setTotalBookings(bookingRepository.count());
        dashboardResponse.setTotalUsers(userRepository.count());
        dashboardResponse.setTotalRevenue(paymentRepository.getTotalRevenue());
        dashboardResponse.setActiveTours(tourRepository.countByStatus("AVAILABLE"));

        List<MonthlyRevenueProjection> projections = paymentRepository.getMonthlyRevenue();
        List<MonthlyRevenueResponse> revenueResponses = projections.stream()
                .map(p -> new MonthlyRevenueResponse(p.getMonth(), p.getYear(), p.getRevenue())).toList();
        dashboardResponse.setRevenueChart(revenueResponses);
        return dashboardResponse;
    }

}
