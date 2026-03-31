package com.tourbooking.backend.repository;

import com.tourbooking.backend.dto.tour.TourResponse;
import com.tourbooking.backend.entity.Tour;
import com.tourbooking.backend.enums.TourStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
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

    @Query("SELECT t FROM Tour t WHERE " +
            "(:title IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " + // Thêm dòng này
            "(:departure IS NULL OR t.departureLocation LIKE %:departure%) AND " +
            "(:minPrice IS NULL OR t.adultPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR t.adultPrice <= :maxPrice) AND " +
            "(:startDate IS NULL OR t.startDate >= :startDate) AND " +
            "t.isDeleted = false")
    List<Tour> filterTours(
            @Param("title") String title, // Thêm tham số này
            @Param("departure") String departure,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("startDate") LocalDateTime startDate
    );
    public int countByStatus(TourStatus tourStatus);
}
