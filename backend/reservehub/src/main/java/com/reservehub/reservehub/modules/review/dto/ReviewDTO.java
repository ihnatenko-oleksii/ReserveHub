package com.reservehub.reservehub.modules.review.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {
    private Long id;
    private Long userId;
    private Long serviceId;
    private Long reservationId;
    private BigDecimal rating;
    private String comment;
    private LocalDateTime createdAt;
} 