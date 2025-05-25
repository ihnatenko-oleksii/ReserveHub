package com.reservehub.reservehub.modules.reservation.dto;

import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDetailsDTO {
    private Long id;
    private LocalDate date;
    private LocalTime time;
    private String notes;
    private ReservationStatus status;

    private Long serviceId;
    private String serviceName;
    private String serviceDescription;

    private String providerName;
}
