package com.tourbooking.backend.service.impl;

import com.tourbooking.backend.dto.dashboard.DashboardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.tourbooking.backend.repository.BookingRepository;
import com.tourbooking.backend.repository.TourRepository;
import com.tourbooking.backend.repository.UserRepository;
import com.tourbooking.backend.repository.PaymentRepository;


@Service
 public class DashboardServiceImpl {
    @Autowired
     private PaymentRepository paymentRepository;
    @Autowired
     private BookingRepository bookingRepository;
    @Autowired
     private UserRepository userRepository;
    @Autowired
     private TourRepository tourRepository;

//    public DashboardResponse getDashboardStats() {
//        DashboardResponse dashboardResponse = new DashboardResponse();
//        dashboardResponse.setTotalBookings(bookingRepository.count());
//        dashboardResponse.setTotalUsers(userRepository.count());
//        dashboardResponse.setTotalRevenue(paymentRepository.getTotalRevenue());
//        dashboardResponse.setActiveTours(tourRepository.countByStatus("AVAILABLE"));
//        dashboardResponse.setRevenueChart(paymentRepository.getMonthlyRevenue());
//
//        return dashboardResponse;
//    }

}
