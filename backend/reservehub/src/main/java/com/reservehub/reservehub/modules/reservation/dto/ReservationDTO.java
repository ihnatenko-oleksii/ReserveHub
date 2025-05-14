package com.reservehub.reservehub.modules.reservation.dto;

import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ReservationDTO {
    private Long id;
    private Long userId;
    private Long providerId;
    private Long serviceId;
    private LocalDate date;
    private LocalTime time;
    private String notes;
    private ReservationStatus status;
} 