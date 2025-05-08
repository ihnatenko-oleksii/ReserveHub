package com.reservehub.reservehub.modules.service.repository;

import com.reservehub.reservehub.modules.service.entity.Service;
import com.reservehub.reservehub.modules.service.enums.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long>, JpaSpecificationExecutor<Service> {
    List<Service> findByOwnerId(Long ownerId);

    @Query("SELECT s FROM Service s WHERE " +
           "(:category IS NULL OR s.category = :category) AND " +
           "(:minPrice IS NULL OR s.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR s.price <= :maxPrice) AND " +
           "(:minRating IS NULL OR s.rating >= :minRating) AND " +
           "(:minLikes IS NULL OR s.likes >= :minLikes) AND " +
           "(:maxDuration IS NULL OR s.duration <= :maxDuration) AND " +
           "(:ownerId IS NULL OR s.owner.id = :ownerId)")
    List<Service> findWithFilters(
            @Param("category") ServiceCategory category,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("minRating") Double minRating,
            @Param("minLikes") Integer minLikes,
            @Param("maxDuration") Integer maxDuration,
            @Param("ownerId") Long ownerId
    );
} 