package com.tourbooking.backend.repository;

import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    @Query("select t from Tour t where t.title like %:title%")
    public List<Tour> searchByName(String title);
    public List<Tour> findByCategories_Id(Long id);

    public int countByStatus(String status);
}
