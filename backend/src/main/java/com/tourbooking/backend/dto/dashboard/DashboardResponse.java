package com.tourbooking.backend.dto.dashboard;

import com.tourbooking.backend.dto.dashboard.MonthlyRevenueResponse;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class DashboardResponse {
    private BigDecimal totalRevenue;
    private long totalBookings;
    private long activeTours;
    private long totalUsers;
    private List<MonthlyRevenueResponse> revenueChart;
}