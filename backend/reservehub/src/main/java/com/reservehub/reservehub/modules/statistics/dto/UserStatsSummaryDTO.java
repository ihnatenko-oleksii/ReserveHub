package com.reservehub.reservehub.modules.statistics.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class UserStatsSummaryDTO {
    private Long totalServices;
    private Long totalReservations;
    private Long completedReservations;
    private BigDecimal totalRevenue;
} 