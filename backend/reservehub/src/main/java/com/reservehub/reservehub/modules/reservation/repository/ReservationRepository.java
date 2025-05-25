package com.reservehub.reservehub.modules.reservation.repository;

import com.reservehub.reservehub.modules.reservation.dto.ReservationDetailsDTO;
import com.reservehub.reservehub.modules.reservation.dto.ReservationExportDTO;
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

    @Query("SELECT new com.reservehub.reservehub.modules.reservation.dto.ReservationExportDTO(" +
            "r.id, s.name, c.name, " +
            "CAST(i.amount AS string), CAST(r.status AS string), CAST(i.status AS string)) " +
            "FROM Reservation r " +
            "JOIN r.service s " +
            "JOIN r.user c " +
            "LEFT JOIN r.invoice i " +
            "WHERE r.user = :user OR s.owner = :user")
    List<ReservationExportDTO> findReservationsForExport(@Param("user") User user);

    @Query("""
    SELECT new com.reservehub.reservehub.modules.reservation.dto.ReservationDetailsDTO(
        r.id, r.date, r.time, r.notes, r.status,
        s.id, s.name, s.description,
        p.name
    )
    FROM Reservation r
    JOIN r.service s
    JOIN r.provider p
    WHERE r.user.id = :userId
""")
    List<ReservationDetailsDTO> findAllDetailsForUser(@Param("userId") Long userId);
} 