package com.tourbooking.backend.dto.dashboard;

import java.math.BigDecimal;

public interface MonthlyRevenueProjection {
    Integer getMonth();
    Integer getYear();
    BigDecimal getRevenue();
}
