package com.tourbooking.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tourbooking.backend.dto.dashboard.DashboardResponse;
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

    public DashboardDTO getDashboardStats() {
    DashboardResponse dashboardResponse= new DashboardResponse ();
        
        dto.setTotalRevenue(paymentRepository.getTotalRevenue()); 
        dto.setTotalBookings(bookingRepository.count());
        dto.setTotalUsers(userRepository.count());
        dto.setActiveTours(tourRepository.countByStatus(TourStatus.ACTIVE));
        
        return dashboardResponse;
    }

}
