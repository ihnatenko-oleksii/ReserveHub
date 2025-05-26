package com.reservehub.reservehub.modules.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReservationExportDTO {
    private Long reservationId;
    private String serviceName;
    private String clientName;
    private String amount;
    private String status;
    private String invoiceStatus;
}
