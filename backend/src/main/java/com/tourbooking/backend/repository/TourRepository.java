package com.tourbooking.backend.repository;

import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {

    @Query("select t from Tour t where t.title like %:title% and t.isDeleted=false")
    public List<Tour> searchByName(String title);

    @Query("SELECT t FROM Tour t JOIN t.categories c WHERE c.id=:id AND t.isDeleted=false ")
    public List<Tour> findByCategoriesId(Long id);

    @Query("SELECT t FROM Tour t WHERE t.isDeleted=false ")
    Page<Tour> findByActiveTour(Pageable pageable);

    @Query("SELECT t FROM Tour t WHERE t.isDeleted=true")
    public List<Tour> findByDeleted();

    public int countByStatus(String status);
}
