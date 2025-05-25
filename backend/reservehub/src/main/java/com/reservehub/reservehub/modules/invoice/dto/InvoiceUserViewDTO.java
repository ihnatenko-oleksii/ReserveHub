package com.reservehub.reservehub.modules.invoice.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceUserViewDTO {
    private Long id;
    private BigDecimal amount;
    private String status;
    private String pdfPath;
    private LocalDateTime createdAt;

    private Long reservationId;
    private String serviceName;

    private Long clientId;
    private String clientName;

    private Long providerId;
    private String providerName;
}
