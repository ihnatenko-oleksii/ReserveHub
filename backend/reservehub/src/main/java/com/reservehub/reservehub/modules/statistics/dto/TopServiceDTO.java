package com.reservehub.reservehub.modules.statistics.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class TopServiceDTO {
    private Long serviceId;
    private String serviceName;
    private Long reservationCount;
    private BigDecimal totalRevenue;
} 