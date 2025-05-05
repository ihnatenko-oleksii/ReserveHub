package com.reservehub.reservehub.modules.reservation.entity;

import com.reservehub.reservehub.modules.service.entity.Service;
import com.reservehub.reservehub.modules.user.entity.User;
import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "reservations")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Reservation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private User provider;

    @ManyToOne
    private Service service;

    private LocalDate date;
    private LocalTime time;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
