package com.reservehub.reservehub.modules.statistics.repository;

import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.invoice.entity.InvoiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface StatisticsRepository extends JpaRepository<Object, Long> {
    
    @Query("SELECT COUNT(s) FROM Service s WHERE s.provider = :user")
    Long countServicesByProvider(@Param("user") User user);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.client = :user")
    Long countReservationsByClient(@Param("user") User user);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.client = :user AND r.status = :status")
    Long countReservationsByClientAndStatus(@Param("user") User user, @Param("status") String status);

    @Query("SELECT COALESCE(SUM(i.totalAmount), 0) FROM Invoice i WHERE i.provider = :user AND i.status = :status")
    BigDecimal calculateTotalRevenueByProviderAndStatus(@Param("user") User user, @Param("status") InvoiceStatus status);

    @Query("SELECT new map(FUNCTION('DATE_FORMAT', i.createdAt, '%Y-%m') as month, SUM(i.totalAmount) as total) " +
           "FROM Invoice i WHERE i.provider = :user AND i.status = :status AND i.createdAt >= :startDate " +
           "GROUP BY FUNCTION('DATE_FORMAT', i.createdAt, '%Y-%m') ORDER BY month")
    List<Object[]> findMonthlyRevenueByProviderAndStatus(
        @Param("user") User user,
        @Param("status") InvoiceStatus status,
        @Param("startDate") LocalDate startDate
    );

    @Query("SELECT new map(s.id as serviceId, s.name as serviceName, " +
           "COUNT(r) as reservationCount, SUM(i.totalAmount) as totalRevenue) " +
           "FROM Service s LEFT JOIN Reservation r ON r.service = s " +
           "LEFT JOIN Invoice i ON i.reservation = r " +
           "WHERE s.provider = :user AND i.status = :status " +
           "GROUP BY s.id, s.name ORDER BY reservationCount DESC")
    List<Object[]> findTopServicesByProvider(
        @Param("user") User user,
        @Param("status") InvoiceStatus status
    );
} 