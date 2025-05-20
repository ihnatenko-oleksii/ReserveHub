package com.reservehub.reservehub.modules.statistics.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class MonthlyRevenueDTO {
    private String month;
    private BigDecimal total;
} 