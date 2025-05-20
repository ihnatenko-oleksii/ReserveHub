package com.reservehub.reservehub.modules.reservation.repository;

import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByProviderId(Long providerId);

    @Query("SELECT r.id as reservationId, s.name as serviceName, " +
           "CONCAT(c.firstName, ' ', c.lastName) as clientName, " +
           "r.price as price, r.status as status, i.status as invoiceStatus " +
           "FROM Reservation r " +
           "JOIN r.service s " +
           "JOIN r.client c " +
           "LEFT JOIN r.invoice i " +
           "WHERE r.client = :user OR s.provider = :user")
    List<Object[]> findUserReservationsForExport(@Param("user") User user);
} 