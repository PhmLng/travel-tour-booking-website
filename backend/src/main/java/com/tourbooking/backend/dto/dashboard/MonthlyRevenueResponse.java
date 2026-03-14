package com.tourbooking.backend.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MonthlyRevenueResponse {
    private Integer month;
    private Integer year;
    private BigDecimal revenue;
}
