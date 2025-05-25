package com.reservehub.reservehub.modules.reservation.dto;
import com.reservehub.reservehub.modules.reservation.enums.ReservationStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDetailsObligationsDTO {
    private Long id;
    private String serviceName;
    private String clientName;
    private String clientAvatar;
    private LocalDate date;
    private LocalTime time;
    private String notes;
    private BigDecimal price;
    private Integer duration;

    private ReservationStatus status;
}